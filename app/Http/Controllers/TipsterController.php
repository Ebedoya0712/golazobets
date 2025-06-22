<?php

	namespace App\Http\Controllers;

	use Illuminate\Http\Request;
	use Inertia\Inertia;
	use App\Data\UserData;
	use Inertia\Response as InertiaResponse;

	use App\Services\TipsterService;
	use App\Services\StatService;
	use App\Services\SportService;
	use App\Services\SubscriptionService;

	use App\Models\User;


	class TipsterController extends Controller
	{

		private TipsterService $tipsterService;
		private StatService $statService;
		private SportService $sportService;
		private SubscriptionService $subscriptionService;

		public function __construct(
			TipsterService $tipsterService,
			StatService $statService,
			SportService $sportService,
			SubscriptionService $subscriptionService
		) {
			$this->tipsterService = $tipsterService;
			$this->statService = $statService;
			$this->sportService = $sportService;
			$this->subscriptionService = $subscriptionService;
		}


		/**
		 * Display a listing of the resource.
		 */
		public function index()
		{
			return Inertia::render('tipsters/TipstersSelector');
		}

		/**
		 * 
		 * 
		 * 
		 * 
		 * Display a listing of the resource.
		 */
		public function tipstersFree(Request $request): InertiaResponse
		{

			$tipsters = [];

			if ($request->has('filters')) {
				$tipsters = $this->tipsterService->getTipstersWithFilters($request, 'free');
			} else {
				$tipsters = $this->tipsterService->getTipsters($request, 'free');
			}

			/**
			 * Prueba de cache:
			 */
			// $tipsters = cache()->remember('tipsters.free', 300, function () use ($request) {
			// 	return $this->tipsterService->getTipsters($request, 'free');
			// });

			$sports = $this->sportService->getSports();

			$filters = $this->tipsterService->filters($request);

			$pageData = [
				'title' => 'Tipsters Free',
				'linkToOtherTypeOfTipsters' => [
					'label' => "Ver tipsters premium",
					'link' => 'tipsters.premium'
				],
				'filters' => $filters
			];


			return Inertia::render('tipsters/Index', compact(
				'tipsters',
				'pageData',
				'sports',
				'filters'
			));
		}

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 * Display a listing of premium tipsters.
		 * 
		 * @param Request $request The HTTP request instance
		 * @return InertiaResponse Returns an Inertia response with the premium tipsters view
		 */
		public function tipstersPremium(Request $request): InertiaResponse
		{
			$tipsters = [];

			if ($request->has('filters')) {
				$tipsters = $this->tipsterService->getTipstersWithFilters($request, 'premium');
			} else {
				$tipsters = $this->tipsterService->getTipsters($request, 'premium');
			}


			$sports = $this->sportService->getSports();

			$filters = $this->tipsterService->filters($request);

			$pageData = [
				'title' => 'Tipsters Premium',
				'linkToOtherTypeOfTipsters' => [
					'label' => "Ver tipsters free",
					'link' => 'tipsters.free'
				]
			];

			return Inertia::render('tipsters/Index', compact(
				'tipsters',
				'pageData',
				'sports',
				'filters'
			));
		}

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 * Display the tipster's profile page.
		 * 
		 * @param Request $request The HTTP request instance
		 * @param String $username The username of the tipster to display
		 * @return \Inertia\Response Returns an Inertia response with the tipster's profile view
		 */
		public function show(Request $request, String $username): InertiaResponse
		{
			$data = $this->tipsterProfileData($request, $username);
			$stats = $this->statService->getStatsByUsername($username);

			return Inertia::render('tipsters/TipsterProfile', $data + [
				'stats' => $stats
			]);
		}

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 * Display the tipster's statistics page.
		 * 
		 * @param Request $request The HTTP request instance
		 * @param String $username The username of the tipster to display
		 * @return \Inertia\Response Returns an Inertia response with the tipster's statistics view
		 */
		public function stats(Request $request, String $username): InertiaResponse
		{
			$data = $this->tipsterProfileData($request, $username);
			$stats = $this->statService->getStatsByUsername($username);

			return Inertia::render('tipsters/TipsterProfile', $data + [
				'activeTab' => 'stats',
				'stats' => $stats
			]);
		}

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 * Display the tipster's picks page.
		 * 
		 * @param Request $request The HTTP request instance
		 * @param String $username The username of the tipster to display
		 * @return \Inertia\Response Returns an Inertia response with the tipster's picks view
		 */
		public function picks(Request $request, String $username): InertiaResponse
		{
			$data = $this->tipsterProfileData($request, $username);

			return Inertia::render('tipsters/TipsterProfile', $data + ['activeTab' => 'picks']);
		}

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 * Display the tipster's services page.
		 * 
		 * @param Request $request The HTTP request instance
		 * @param String $username The username of the tipster to display
		 * @return \Inertia\Response Returns an Inertia response with the tipster's services view
		 */
		public function services(Request $request, String $username): InertiaResponse
		{
			$data = $this->tipsterProfileData($request, $username);
			$activeTab = 'service';

			return Inertia::render('tipsters/TipsterProfile', [
				'userTipster' => $data['userTipster'],
				'tipster' => $data['tipster'],
				'hasSubscription' => $data['hasSubscription'],
				'subscriptions' => $data['subscriptions'],
				'activeTab' => $activeTab
			]);
		}

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 * Get the tipster profile data
		 * 
		 * @param Request $request The HTTP request instance
		 * @param String $username The username of the tipster
		 * @return array Returns an array containing tipster profile data
		 */
		protected function tipsterProfileData(Request $request, String $username): array
		{
			$userTipster = User::where('username', $username)->first();

			$user = $request->user();
			$tipster = $this->tipsterService->getTipster($userTipster);

			$hasSubscription = null;
			if ($user) {
				$hasSubscription = $user->subscription($tipster['id']);
			}

			$picks = $this->tipsterService->getPicksByTipster($userTipster->tipster, $request);

			$subscriptions = $this->subscriptionService->totalSubscriptionsForTipster($userTipster->tipster);

			$userTipster = UserData::from($userTipster);

			return compact(
				'userTipster',
				'tipster',
				'hasSubscription',
				'subscriptions',
				'picks'
			);
		}
	}
