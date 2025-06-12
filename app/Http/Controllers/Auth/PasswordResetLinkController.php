<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use Inertia\Inertia;
use App\Mail\PasswordResetMail;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
	/**
	 * Display the password reset link request view.
	 */
	public function create(): Response
    {
        $layout = config('settings.general.auth_layout');
        $status = session('status');

        return Inertia::render('auth/ForgotPassword', compact('layout', 'status'));
    }

    /**
     * Manejar la solicitud para enviar el enlace de restablecimiento de contraseña.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        } else {
            return back()->withErrors(['email' => __($status)]);
        }
    }

}