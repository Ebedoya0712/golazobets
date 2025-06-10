<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Admin\UpdatePickRequest;
use App\Http\Requests\Admin\UpdatePickStatusRequest;

use App\Jobs\UpdateTipsterStatsJob;

use App\Services\PickService;
use App\Services\SportService;

use App\Data\PickData;
use App\Data\TipsterData;

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
	 * 
	 * 
	 * 
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$picks = $this->pickService->getAllPicks($request);
		return Inertia::render('admin/picks/Index', compact('picks'));
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Show the form for editing the specified resource.
	 */
	public function edit(Pick $pick)
	{
		$sports = $this->sportService->getSports();
		$bookies = $this->pickService->getBookies();
		$tipster = TipsterData::from($pick->tipster()->with('user')->first());
		$pick = PickData::from($pick);

		return Inertia::render('admin/picks/Edit', compact('pick', 'sports', 'bookies', 'tipster'));
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Update the specified resource in storage.
	 */
	public function update(UpdatePickRequest $request, Pick $pick)
	{
		$tipster = $pick->tipster;
		$this->pickService->updatePick($pick, $request);

		UpdateTipsterStatsJob::dispatch($tipster);

		return back()->with('success', 'Pick actualizado.');
	}


	/**
	 * 
	 */
	public function correct(UpdatePickStatusRequest $request, Pick $pick)
	{
		$tipster = $pick->tipster;
		$tipster_id = $tipster->id;

		if ($tipster_id === $pick->tipster_id) {
			$pick->update(['status' => $request->status]);
			
			UpdateTipsterStatsJob::dispatch($tipster);

			return back()->with('success', 'Pick actualizado.');
		}

		return back()->with('error', 'No tienes permiso para actualizar este pick.');
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Remove the specified resource from storage.
	 */
	public function destroy(Pick $pick)
	{
		$pick->delete();
		return to_route('admin.picks.index')->with('success', 'Pick eliminado.');
	}
}
