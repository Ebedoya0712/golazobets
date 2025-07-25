<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
	/**
	 * Display the email verification prompt.
	 */
	public function __invoke(Request $request): RedirectResponse|Response
	{
		$layout = config('settings.general.auth_layout');
		$status = session('status');

		return $request->user()->hasVerifiedEmail()
			? redirect()->intended(route('account.edit', absolute: false))
			: Inertia::render('auth/VerifyEmail', compact('status', 'layout'));
	}
}
