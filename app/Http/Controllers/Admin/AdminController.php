<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\User;
use App\Models\Pick;
use Laravel\Cashier\Subscription;

class AdminController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(): Response
	{
		$total_accounts = User::count();
		$total_users = User::whereRelation('roles', 'name', 'User')->count();
		$total_tipsters = User::whereRelation('roles', 'name', 'Tipster')->count();
		$total_picks = Pick::count();
		$total_subscriptions = Subscription::where('ends_at', NULL)->count();

		return Inertia::render('admin/Dashboard', compact('total_accounts', 'total_users', 'total_tipsters', 'total_picks', 'total_subscriptions'));
	}
}
