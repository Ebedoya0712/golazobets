<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

use Intervention\Image\Laravel\Facades\Image;

use App\Data\PickData;
use App\Data\BookieData;

use App\Models\Pick;
use App\Models\Bookie;
use App\Models\TipsterStat;
use App\Models\Stat;

class PickService
{

	/**
	 * List of available methods:
	 * 
	 * getAllPicks()
	 * getAllPicksByTipster(Request $request)
	 * getBookies()
	 * storePick(Request $request)
	 * getFreePicks()
	 * updatePick(Pick $pick, Request $request)
	 * updateTipsterStats($tipster)
	 */


	/**
	 * Retrieves all picks with pagination
	 * 
	 * @return array Returns an array containing paginated picks data
	 * Each pick is transformed using PickData DTO
	 */
	public function getAllPicks($request)
	{

		$per_page = config('settings.general.per_page');
		$query = Pick::whereHas('tipster')->with(['tipster.user', 'sport', 'bookie']);

		if ($request->has('pick_id') and $request->pick_id) {
			$query->where('id', $request->pick_id);
		}

		if ($request->has('tipster_name') and $request->tipster_name) {
			$query->whereHas('tipster.user', function ($q) use ($request) {
				$q->where('username', 'like', "%{$request->tipster_name}%");
			});
		}

		$picks = $query->orderBy('created_at', 'desc')
			->paginate($per_page)
			->toArray();

		$picks['data'] = array_map(fn($pick) => PickData::from($pick), $picks['data']);

		return $picks;
	}


	/**
	 * Retrieves all picks for a specific tipster with pagination
	 * 
	 * @param Request $request The HTTP request object containing the authenticated user
	 * @return array Returns an array containing paginated picks data for the tipster
	 * Each pick is transformed using PickData DTO
	 */
	public function getAllPicksByTipster(Request $request)
	{
		$tipster_id = $request->user()->tipster->id;
		$per_page = config('settings.general.per_page');

		$picks = Pick::where('tipster_id', $tipster_id)
			->orderBy('created_at', 'desc')
			->paginate($per_page)
			->toArray();

		$picks['data'] = array_map(fn($pick) => PickData::from($pick), $picks['data']);

		return $picks;
	}


	/**
	 * Retrieves all bookies from the database
	 * 
	 * @return array Returns an array of bookies transformed using BookieData DTO
	 */
	public function getBookies(): array
	{

		$bookies = Bookie::get()->map(function ($bookie) {
			return BookieData::from($bookie);
		});

		return $bookies->toArray();
	}



	/**
	 * Stores a new pick in the database
	 * 
	 * @param Request $request The HTTP request object containing pick data and optional screenshot
	 * @return PickData Returns the newly created pick transformed using PickData DTO
	 * 
	 * This method:
	 * 1. Gets the authenticated tipster's ID
	 * 2. Processes the screenshot if one is uploaded
	 * 3. Creates a new pick record
	 * 4. Returns the pick data transformed through PickData DTO
	 */
	public function storePick(Request $request)
	{
		$tipster_id = $request->user()->tipster->id;
		$request_data = $request->all();
		$request_data['tipster_id'] = $tipster_id;

		if ($request->hasFile('screenshot')) {
			$file = $request->file('screenshot');
			$filename = time() . '.webp';
			$image = Image::read($file);

			// Define path relative to public disk
			$relativePath = "img/picks/{$tipster_id}";

			// Ensure directory exists in public disk
			if (!Storage::disk('public')->exists($relativePath)) {
				Storage::disk('public')->makeDirectory($relativePath);
			}

			// Process and save image
			$image->resize(800, 450, function ($constraint) {
				$constraint->aspectRatio();
				$constraint->upsize();
			})
				->toWebp(90)
				->save(Storage::disk('public')->path("{$relativePath}/{$filename}"));

			$request_data['screenshot_path'] = "picks/$tipster_id/$filename";
		}

		$newPick = Pick::create($request_data);

		if ($newPick) $newPick = PickData::from($newPick);

		return $newPick;
	}



	/**
	 * Retrieves free picks with pagination
	 * 
	 * @return array Returns an array containing paginated free picks data
	 * Each pick is transformed using PickData DTO and filtered by pending status
	 * and free tipster type
	 */
	public function getFreePicks()
	{
		$per_page = 24;

		$picks = Pick::where('status', 'pending')
			->whereHas('tipster', function ($query) {
				$query->where('type', 'free');
			})
			->with(['tipster.user', 'bookie', 'sport'])
			->orderBy('event_date', 'desc')
			->paginate($per_page)
			->toArray();

		$picks['data'] = array_map(fn($pick) => PickData::from($pick), $picks['data']);

		return $picks;
	}



	/**
	 * Updates an existing pick in the database
	 * 
	 * @param Pick $pick The pick model instance to update
	 * @param Request $request The HTTP request object containing updated pick data
	 * @return PickData Returns the updated pick transformed using PickData DTO
	 * 
	 * This method:
	 * 1. Gets the tipster ID associated with the pick
	 * 2. Processes a new screenshot if one is uploaded
	 * 3. Removes the old screenshot file if it exists
	 * 4. Updates the pick record with new data
	 * 5. Returns the updated pick data transformed through PickData DTO
	 */
	public function updatePick(Pick $pick, Request $request)
	{
		$tipster_id = $pick->tipster->id;
		$request_data = $request->all();

		if ($request->hasFile('screenshot') and !$request->has('screenshot_path')) {

			if ($pick->screenshot_path) {
				// Remove the picks/ prefix from the stored path as it's already in the structure
				$currentScreenshot = "storage/img/$pick->screenshot_path";
				if (file_exists($currentScreenshot)) unlink($currentScreenshot);
			}

			$file = $request->file('screenshot');
			$filename = time() . '.webp';
			$image = Image::read($file);

			// Create directory if it doesn't exist
			$directory = "storage/img/picks/$tipster_id";
			if (!file_exists($directory)) {
				mkdir($directory, 0755, true);
			}

			$path = "$directory/$filename";

			$image->resize(800, 450)->toWebp(100)->save($path);

			$request_data['screenshot_path'] = "picks/$tipster_id/$filename";
		}

		$pick->update($request_data);
		$newPick = PickData::from($pick);

		return $newPick;
	}


	/**
	 * Updates statistics for a tipster based on their picks
	 * 
	 * @param mixed $tipster The tipster model instance to update stats for
	 * @return void
	 * 
	 * This method:
	 * 1. Calculates overall stats (total bets, profit, yield, etc.)
	 * 2. Updates or creates TipsterStat record with overall stats
	 * 3. Groups picks by month and calculates monthly stats
	 * 4. Updates or creates Stat records for each month
	 * 5. Handles bet type statistics within monthly groupings
	 */
	public function updateTipsterStats($tipster): void
	{
		$picks = $tipster->picks()->whereNot('status', 'pending')->get();

		$totalBet = $picks->where('status', '!=', 'lost')->sum('stake');
		$wins = $picks->where('status', 'won')->count();
		$totalPicks = $picks->count();

		$profit = $picks->sum(function ($p) {
			if ($p->status === 'won') {
				return ($p->odds * $p->stake) - $p->stake;
			} elseif ($p->status === 'lost') {
				return -$p->stake;
			} else {
				// void o cancelled
				return 0;
			}
		});

		$yield = $totalBet > 0 ? ($profit / $totalBet) * 100 : 0;
		$winRate = $totalPicks > 0 ? ($wins / $totalPicks) * 100 : 0;
		$averageStake = $totalPicks > 0 ? ($totalBet / $totalPicks) : 0;

		/**
		 * Tipster stats is the total for all tipster picks.
		 */
		TipsterStat::updateOrCreate(
			['tipster_id' => $tipster->id],
			[
				'total_bet' => $totalBet,
				'profit' => $profit,
				'yield' => $yield,
				'average_stake' => $averageStake,
				'win_rate' => $winRate,
			]
		);

		$picksByMonth = $tipster->picks->groupBy(function ($pick) {
			return Carbon::parse($pick->created_at)->format('Y-m');
		});

		foreach ($picksByMonth as $yearMonth => $picks) {
			$totalBet = $picks->sum('stake');
			$wins = $picks->where('status', 'won')->count();
			$totalPicks = $picks->count();

			$profit = $picks->sum(function ($p) {
				if ($p->status === 'won') {
					return ($p->odds * $p->stake) - $p->stake;
				} elseif ($p->status === 'lost') {
					return -$p->stake;
				} else {
					// void o cancelled
					return 0;
				}
			});

			$yield = $totalBet > 0 ? ($profit / $totalBet) * 100 : 0;
			$winRate = $totalPicks > 0 ? ($wins / $totalPicks) * 100 : 0;
			$averageStake = $totalPicks > 0 ? ($totalBet / $totalPicks) : 0;
			$averageOdds = $totalPicks > 0 ? $picks->avg('odds') : 0;

			// Group picks by bet_type
			$betTypes = $picks->groupBy('bet_type');
			$betTypeStats = [];

			foreach ($betTypes as $type => $typePicks) {
				$betTypeStats[$type] = [
					'total' => $typePicks->count(),
					'wins' => $typePicks->where('status', 'won')->count(),
					'profit' => $typePicks->sum(function ($p) {
						if ($p->status === 'won') {
							return ($p->odds * $p->stake) - $p->stake;
						} elseif ($p->status === 'lost') {
							return -$p->stake;
						} else {
							// void o cancelled
							return 0;
						}
					})
				];
			}

			list($year, $month) = explode('-', $yearMonth);

			/**
			 * Stat is the total picks stat for each month.
			 */
			Stat::updateOrCreate(
				[
					'tipster_id' => $tipster->id,
					'year' => $year,
					'month' => $month
				],
				[
					'total_picks' => $totalPicks,
					'total_bet' => $totalBet,
					'profit' => $profit,
					'yield' => $yield,
					'average_stake' => $averageStake,
					'average_odds' => $averageOdds,
					'win_rate' => $winRate,
				]
			);
		}
	}
}
