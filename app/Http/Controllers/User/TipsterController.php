<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Data\UserData;
use Inertia\Response as InertiaResponse;
use Illuminate\Support\Facades\Auth;

use App\Services\TipsterService;
use App\Services\StatService;
use App\Services\SubscriptionService;

class TipsterController extends Controller
{

	private TipsterService $tipsterService;
	private StatService $statService;
	private SubscriptionService $subscriptionService;

	public function __construct(
		TipsterService $tipsterService,
		StatService $statService,
		SubscriptionService $subscriptionService
	) {
		$this->tipsterService = $tipsterService;
		$this->statService = $statService;
		$this->subscriptionService = $subscriptionService;
	}


	/**
	 * Display the tipster dashboard.
	 */
	// public function show(Request $request)
	public function show(Request $request): InertiaResponse
	{
		$user = Auth::user();
		$data = $this->tipsterProfileData($request);
		$stats = $this->statService->getStatsByUsername($user->username);

		return Inertia::render('account/TipsterProfile', $data + [
			'activeTab' => 'stats',
			'stats' => $stats
		]);
	}

	/**
	 * Display the tipster's picks page.
	 * 
	 * @param Request $request The HTTP request instance
	 * @return \Inertia\Response Returns an Inertia response with the tipster's picks view
	 */
	public function stats(Request $request): InertiaResponse
	{
		$data = $this->tipsterProfileData($request);
		$stats = $this->statService->getStatsByUsername($data['userTipster']->username);

		return Inertia::render('account/TipsterProfile', $data + [
			'activeTab' => 'stats',
			'stats' => $stats
		]);
	}

	/**
	 * Display the tipster's statistics page.
	 * 
	 * @param Request $request The HTTP request instance
	 * @return \Inertia\Response Returns an Inertia response with the tipster's statistics view
	 */
	public function picks(Request $request): InertiaResponse
	{
		$data = $this->tipsterProfileData($request);

		return Inertia::render('account/TipsterProfile', $data + ['activeTab' => 'picks']);
	}

	/**
	 * Display the tipster's services page.
	 * 
	 * @param Request $request The HTTP request instance
	 * @return \Inertia\Response Returns an Inertia response with the tipster's services view
	 */
	public function services(Request $request): InertiaResponse
	{
		$data = $this->tipsterProfileData($request);

		return Inertia::render('account/TipsterProfile', $data + ['activeTab' => 'service']);
	}


	/**
	 * Get the tipster profile data for the current user
	 * 
	 * @param Request $request The HTTP request instance
	 * @return array Returns an array containing tipster profile data
	 */
	protected function tipsterProfileData(Request $request): array
	{
		$user = Auth::user();

		$tipster = $this->tipsterService->getTipster($user);
		$hasSubscription = null;
		$picks = $this->tipsterService->getPicksByTipster($user->tipster);

		$subscriptions = $this->subscriptionService->totalSubscriptionsForTipster($user->tipster);
		$userTipster = UserData::from($user);

		return compact(
			'userTipster',
			'tipster',
			'hasSubscription',
			'subscriptions',
			'picks'
		);
	}
}
