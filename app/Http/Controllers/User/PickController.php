<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\PickService;
use App\Services\SportService;
use App\Jobs\UpdateTipsterStatsJob;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreatePickRequest;
use App\Http\Requests\User\UpdatePickRequest;
use Illuminate\Support\Facades\Auth;

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
	 * 
	 * 
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$picks = $this->pickService->getAllPicksByTipster($request);
		$sports = $this->sportService->getSports();
		$bookies = $this->pickService->getBookies();

		return Inertia::render('picks/Index', compact('picks', 'sports', 'bookies'));
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		$sports = $this->sportService->getSports();
		$bookies = $this->pickService->getBookies();

		return Inertia::render('picks/Create', compact('sports', 'bookies'));
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Store a newly created resource in storage.
	 */
	public function store(CreatePickRequest $request)
	{

		$pick = $this->pickService->storePick($request);

		if (!$pick) {
			return back()->with('error', 'Se ha producido un error al crear el pick.');
		}

		return to_route('account.picks.index')->with('success', 'Pick creado.');
	}


	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Update the specified pick with new data
	 */
	public function update(UpdatePickRequest $request, Pick $pick)
	{

		$tipster = Auth::user()->tipster;
		$tipster_id = $tipster->id;

		UpdateTipsterStatsJob::dispatch($tipster);

		if ($pick->status !== 'pending') {
			return back()->with('error', 'No puedes actualizar un pick que no está pendiente.');
		}

		if ($tipster_id === $pick->tipster_id) {
			$pick->update(['status' => $request->status]);
			return back()->with('success', 'Pick actualizado.');
		}

		return back()->with('error', 'No tienes permiso para actualizar este pick.');
	}
}
