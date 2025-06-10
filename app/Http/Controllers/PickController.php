<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\PickService;
use App\Services\SportService;

use App\Models\Pick;

class PickController extends Controller
{
	private PickService $pickService;
	private SportService $sportService;

	public function __construct(
		PickService $pickService,
		SportService $sportService
	) {
		$this->pickService = $pickService;
		$this->sportService = $sportService;
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$picks = $this->pickService->getFreePicks();
		$sports = $this->sportService->getSports();
		$bookies = $this->pickService->getBookies();

		return Inertia::render('picks/FreePicks', compact('picks', 'sports', 'bookies'));
	}
}
