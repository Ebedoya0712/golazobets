<?php

namespace App\Services;

use App\Data\TipsterData;
use App\Data\PickData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Tipster;
use App\Models\User;

class TipsterService
{

	/**
	 * Available methods:
	 * 
	 * getAllTipsters(Request $request): array
	 * getTipsters(Request $request, String $type): array
	 * filters($request): array
	 * getTipstersWithFilters($request, $type): array
	 * getTipster(User $user): array
	 */

	protected $per_page = 36;

	/**
	 * -------------------------------------------------------------------------------
	 * Retrieves all tipsters with pagination and sorting
	 * -------------------------------------------------------------------------------
	 */
	public function getAllTipsters(Request $request): array
	{
		$per_page = config('settings.general.per_page');

		$query = Tipster::with(['user', 'user.account', 'sport', 'tipster_stats'])
			->withCount('picks');

		if ($request->has('tipster_name')) {
			$query->whereHas('user', function ($q) use ($request) {
				$q->where('username', 'like', "%{$request->tipster_name}%");
			});
		}

		$tipsters = $query
			->orderBy($request->order ?? 'created_at', $request->dir === 'ascending' ? 'asc' : 'desc')
			->paginate($per_page)
			->toArray();

		$total = Tipster::count();

		$tipsters['data'] = array_map(fn($tipster) => TipsterData::from($tipster), $tipsters['data']);

		return [
			'tipsters' => $tipsters,
			'total' => $total
		];
	}


	/**
	 * -------------------------------------------------------------------------------
	 * Retrieves tipsters filtered by type with pagination and sorting
	 * -------------------------------------------------------------------------------
	 */
	public function getTipsters(Request $request, String $type): array
	{
		if (!$type) return [];

		$tipsters = Tipster::where('type', $type)
			->whereHas('tipster_stats')
			->orderBy($request->order ?? 'created_at', $request->dir === 'ascending' ? 'asc' : 'desc')
			->with(['user', 'user.account', 'sport', 'tipster_stats'])
			->withCount('picks')
			->paginate($this->per_page)
			->toArray();

		$tipsters['data'] = array_map(fn($tipster) => TipsterData::from($tipster), $tipsters['data']);

		return $tipsters;
	}



	/**
	 * -------------------------------------------------------------------------------
	 * Process and validate filter parameters from the request
	 * -------------------------------------------------------------------------------
	 */
	public function filters($request)
	{
		$filters = $request->filters;

		if ($filters) {
			if ($filters['sport_id'] === '0') $filters['sport_id'] = null;
			return $filters;
		}

		return [
			'username' => '',
			'order_by' =>  null,
			'sport_id' => null,
			'profit' => 0,
			'picks' => 0,
			'yield' => 0,
		];
	}



	/**
	 * -------------------------------------------------------------------------------
	 * Retrieves tipsters filtered by type and additional filter criteria
	 * -------------------------------------------------------------------------------
	 */
	public function getTipstersWithFilters($request, $type)
	{
		$filters = $request->filters;

		$query = Tipster::whereHas('tipster_stats')
			->where('type', $type)
			->with(['user', 'user.account', 'sport', 'tipster_stats']);

		// Filter by sport ID
		if (isset($filters['sport_id']) && $filters['sport_id'] !== '0') {
			$query->where('sport_id', $filters['sport_id']);
		}

		// Filter by name
		if (isset($filters['username'])) {
			$query->whereHas('user', function ($query) use ($filters) {
				$query->where('username', 'like', '%' . $filters['username'] . '%');
			});
		}

		if (isset($filters['order_by'])) {
			// Check if we need to order by the number of picks
			// This orders tipsters by their total number of picks in descending order
			if ($filters['order_by'] === 'picks') {
				$query->orderBy('picks_count', 'desc');
			} else {
				// Handle ordering by other fields (profit, yield)
				$query->whereHas('tipster_stats', function ($query) use ($filters) {
					$field = $filters['order_by'];
					$validFields = ['profit', 'yield'];

					if (in_array($field, $validFields)) {
						$query->where($field, '>=', $filters[$field] ?? 0);
					}
				})
					->join('tipster_stats', 'tipsters.id', '=', 'tipster_stats.tipster_id')
					->orderBy('tipster_stats.' . $filters['order_by'], 'desc');
			}
		}

		if (isset($filters['profit'])) {
			$query->whereHas('tipster_stats', function ($query) use ($filters) {
				$query->where('profit', '>=', $filters['profit']);
			});
		}

		if (isset($filters['picks'])) {
			$query->whereHas('picks', function ($query) use ($filters) {
				$query->havingRaw('COUNT(*) >= ?', [$filters['picks']]);
			}, '>=', $filters['picks']);
		}

		if (isset($filters['yield'])) {
			$query->whereHas('tipster_stats', function ($query) use ($filters) {
				$query->where('yield', '>=', $filters['yield']);
			});
		}

		$tipsters = $query
			->withCount('picks')
			->paginate($this->per_page, ['*'], 'page', 1)
			->toArray();


		$tipsters['data'] = array_map(fn($tipster) => TipsterData::from($tipster), $tipsters['data']);

		return $tipsters;
	}


	/**
	 * -------------------------------------------------------------------------------
	 * Get tipster data from user
	 * -------------------------------------------------------------------------------
	 */
	public function getTipster(User $user): array
	{
		$tipster = TipsterData::from(
			$user
				->tipster()
				->with(['tipster_stats', 'sport', 'user'])
				->withCount('picks')
				->first()
		)
			->toArray();

		return $tipster;
	}


    /**
		 * -------------------------------------------------------------------------------
     * Retrieves paginated picks for a given tipster with visibility control based on user access
		 * -------------------------------------------------------------------------------
     */
    public function getPicksByTipster($tipster, ?Request $request = null): array
	{
		$per_page = 20;


		$showFullContent = function () use ($tipster, $request) {
			$user = $request ? $request->user() :  Auth::user()->id;

			if (!$user) return false;
			if ('free' === $tipster->type) return true;
			if ($request && !$user) return false;
			if ($request && $user && 'free' === $tipster->type) return true;
			if ($request && $user && $user->subscribed($tipster->id)) return true;
			return false;
		};

		if ($showFullContent()) {
			$picks = $tipster->picks()
				->with(['sport', 'bookie', 'tipster.user'])
				->orderBy('created_at', 'desc')
				->paginate($per_page)
				->toArray();
		} else {
			$picks = $tipster->picks()
				->with(['sport', 'bookie', 'tipster.user'])
				->orderBy('created_at', 'desc')
				->paginate($per_page)
				->toArray();

			foreach ($picks['data'] as &$pick) {
				if ('pending' === $pick['status']) {
					$pick['blocked'] = true;
					$pick = array_merge($pick, array_fill_keys(['stake', 'odds', 'profit', 'pick', 'result', 'screenshot_path', 'analysis'], null));
				}
			}
		}

		$picks['data'] = array_map(fn($pick) => PickData::from($pick), $picks['data']);

		return $picks;
	}
}
