<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\SubscriptionService;
use Laravel\Cashier\Subscription;

class SubscriptionController extends Controller
{

	private SubscriptionService $subscriptionService;

	public function __construct(
		SubscriptionService $subscriptionService,
	) {
		$this->subscriptionService = $subscriptionService;
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$subscriptions = $this->subscriptionService->getAllActiveSubscriptions();
		return Inertia::render('admin/subscriptions/Index', compact('subscriptions'));
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Subscription $subscription)
	{
		$subscription->delete();
		return back()->with('success', 'Subscription deleted successfully');
	}
}
