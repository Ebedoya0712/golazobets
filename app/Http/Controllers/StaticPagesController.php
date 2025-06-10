<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Services\HomePageService;
use App\Services\SportService;

class StaticPagesController extends Controller
{
	private HomePageService $homePageService;
	private SportService $sportService;

	public function __construct(
		HomePageService $homePageService,
		SportService $sportService
	) {
		$this->homePageService = $homePageService;
		$this->sportService = $sportService;
	}

	public function homePage(): Response
	{
		$featuredTipsters = $this->homePageService->getFeaturedTipsters();
		$featuredPicks = $this->homePageService->getFeaturedPicks();
		$sports = $this->sportService->getSports();

		return Inertia::render('home/Index', compact('featuredTipsters', 'featuredPicks', 'sports'));
	}

	public function legalConditions(): Response
	{
		return Inertia::render('LegalConditions');
	}

	public function privacyPolicy(): Response
	{
		return Inertia::render('PrivacyPolicy');
	}

	public function cookiesPolicy(): Response
	{
		return Inertia::render('CookiesPolicy');
	}

	public function betResponsibly(): Response
	{
		return Inertia::render('BetResponsibly');
	}
}
