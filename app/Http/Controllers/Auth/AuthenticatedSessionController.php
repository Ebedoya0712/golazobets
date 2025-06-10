<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
	/**
	 * Display the login view.
	 */
	public function create(): Response
	{
		$layout = config('settings.general.auth_layout');
		$canResetPassword = Route::has('password.request');
		$status = session('status');

		return Inertia::render('auth/Login', compact(
			'layout',
			'canResetPassword',
			'status'
		));
	}

	/**
	 * Handle an incoming authentication request.
	 */
	public function store(LoginRequest $request): RedirectResponse
	{

		$redirect_url = $request->query('redirect');

		$request->authenticate();

		$request->session()->regenerate();

		if ($redirect_url) return redirect()->intended($redirect_url);

		$user = Auth::user();

		if ($user->hasRole('User')) {
			return redirect()->intended(route('account.subscriptions', absolute: false));
		}

		if ($user->hasRole('Tipster')) {
			return redirect()->intended(route('account.picks.index', absolute: false));
		}

		if ($user->hasRole(['Admin', 'Super Admin'])) {
			return redirect()->intended(route('admin', absolute: false));
		}

		return redirect()->intended(route('homePage', absolute: false));
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		Auth::guard('web')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return redirect('/');
	}
}
