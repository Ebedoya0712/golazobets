<?php

namespace App\Services;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Laravel\Cashier\Subscription;

use App\Data\SubscriptionData;
use App\Data\TipsterData;

use App\Models\User;
use App\Models\Tipster;

class SubscriptionService
{

	/**
	 * Service class for managing subscriptions
	 * 
	 * Available methods:
	 * 
	 * getAllActiveSubscriptions()
	 * getUserSubscriptions(User $user) 
	 * totalSubscriptionsForTipster(Tipster $tipster)
	 * createFreeSubscription(Request $request, Tipster $tipster)
	 * destroyFreeSubscription(Request $request, Tipster $tipster) 
	 * destroyPremiumSubscription(Request $request, Tipster $tipster)
	 * formatPaginatedData(array $data) [private]
	 */


	/**
	 * -------------------------------------------------------------------------------
	 * Get all subscriptions with pagination
	 * -------------------------------------------------------------------------------
	 * 
	 * @return array Returns paginated array containing subscription data with user 
	 * and tipster relationships
	 */
	public function getAllActiveSubscriptions()
	{
		$per_page = config('settings.general.per_page');

		$subscriptions = Subscription::where('ends_at', NULL)->with('user')->paginate($per_page)->toArray();
		$subscriptions['data'] = $this->formatPaginatedData($subscriptions['data']);

		return $subscriptions;
	}


	/**
	 * -------------------------------------------------------------------------------
	 * Get paginated subscriptions for a specific user
	 * -------------------------------------------------------------------------------
	 * 
	 * @param User $user The user to get subscriptions for
	 * @return array Returns paginated array containing the user's subscription data
	 */
	public function getUserSubscriptions(User $user)
	{
		$per_page = config('settings.general.per_page');

		$subscriptions = $user->subscriptions()->paginate($per_page)->toArray();
		$subscriptions['data'] = $this->formatPaginatedData($subscriptions['data']);

		return $subscriptions;
	}


	/**
	 * -------------------------------------------------------------------------------
	 * Get total number of subscriptions for a specific tipster
	 * -------------------------------------------------------------------------------
	 * 
	 * @param Tipster $tipster The tipster to count subscriptions for
	 * @return int Returns total number of subscriptions for the tipster
	 */
	public function totalSubscriptionsForTipster(Tipster $tipster)
	{
		$subscriptions = Subscription::where('type', $tipster->id)->count();
		return $subscriptions;
	}


	/**
	 * -------------------------------------------------------------------------------
	 * Create a free subscription for a user to a tipster
	 * -------------------------------------------------------------------------------
	 * 
	 * @param Request $request The incoming HTTP request
	 * @param Tipster $tipster The tipster to subscribe to
	 * @return Subscription Returns the created subscription model
	 */
	public function createFreeSubscription(Request $request, Tipster $tipster)
	{
		$user = $request->user();

		if ($user->id === $tipster->user->id) {
			throw new \Error('Error en el proceso de suscripción.');
		}

		$subscription = Subscription::create([
			'user_id' => $user->id,
			'type' => $tipster->id,
			'stripe_id' => $tipster->id . '_' . Carbon::now()->format('YmdHis'),
			'quantity' => 1,
			'stripe_status' => 'active',
			'stripe_price' => 'free',
		]);

		return $subscription;
	}


	/**
	 * -------------------------------------------------------------------------------
	 * Destroy a free subscription for a user to a tipster
	 * -------------------------------------------------------------------------------
	 * 
	 * @param Request $request The incoming HTTP request
	 * @param Tipster $tipster The tipster to unsubscribe from
	 * @return \Illuminate\Http\RedirectResponse Returns redirect response with status message
	 */
	public function destroyFreeSubscription(Request $request, Tipster $tipster)
	{
		$user = $request->user();
		$subscription = $user->subscription($tipster->id);

		if (!$subscription) {
			return back()->with('error', 'No existe una suscripción activa.');
		}

		$subscription->delete();

		return back()->with('success', 'La suscripción ha sido eliminada correctamente.');
	}



	/**
	 * -------------------------------------------------------------------------------
	 * Destroy a premium subscription for a user to a tipster
	 * -------------------------------------------------------------------------------
	 * 
	 * @param Request $request The incoming HTTP request
	 * @param Tipster $tipster The tipster to unsubscribe from
	 * @return \Illuminate\Http\RedirectResponse Returns redirect response with status message
	 */
	public function destroyPremiumSubscription(Request $request, Tipster $tipster)
	{
		$user = $request->user();
		$subscription = $user->subscription($tipster->id);

		if (!$subscription) {
			return back()->with('error', 'No existe una suscripción activa.');
		}

		$subscription->cancelNow();

		return back()->with('success', 'La suscripción ha sido eliminada correctamente.');
	}


	/**
	 * -------------------------------------------------------------------------------
	 * Get paginated subscriptions for a specific tipster
	 * -------------------------------------------------------------------------------
	 *
	 * Format paginated subscription data by adding tipster information
	 * 
	 * @param array $data Array of subscription records to format
	 * @return array Returns formatted subscription data with tipster information
	 */
	private function formatPaginatedData($data)
	{
		return array_map(function ($subscription) {
			$tipster = Tipster::with('user')->find($subscription['type']);
			if ($tipster) $tipster = TipsterData::from($tipster);

			$subscription['tipster'] = $tipster;

			return SubscriptionData::from($subscription);
		}, $data);
	}
}
