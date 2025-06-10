<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\TipsterService;
use App\Services\SportService;
use App\Data\TipsterData;
use App\Http\Requests\Admin\UpdateTipsterRequest;

use App\Models\Tipster;


class TipsterController extends Controller
{

	private TipsterService $tipsterService;
	private SportService $sportService;

	public function __construct(
		TipsterService $tipsterService,
		SportService $sportService
	) {
		$this->tipsterService = $tipsterService;
		$this->sportService = $sportService;
	}


	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		return Inertia::render(
			'admin/tipsters/Index',
			$this->tipsterService->getAllTipsters($request)
		);
	}


	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Tipster $tipster)
	{

		$sports = $this->sportService->getSports();
		$tipster = TipsterData::from(array_merge($tipster->toArray(), ['user' => $tipster->user]));
		return Inertia::render('admin/tipsters/Edit', compact('tipster', 'sports'));
	}


	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateTipsterRequest $request, Tipster $tipster)
	{
		$tipster->update($request->all());
		return back()->with('success', 'Tipster actualizado.');
	}


	public function updateSubcriptionId(Request $request, Tipster $tipster)
	{
		$request->validate([
			'stripe_subscription_price_id' => 'required|string'
		]);

		$tipster->update([
			'stripe_subscription_price_id' => $request->stripe_subscription_price_id
		]);

		return back()->with('success', 'El ID de pago se ha actualizado correctamente.');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Tipster $tipster)
	{
		$tipster->delete();
		return redirect()->route('admin.tipsters.index')->with('success', 'Tipster deleted successfully.');
	}
}
