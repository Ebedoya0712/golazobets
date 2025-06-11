<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Log;

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
     * Handle an incoming password reset link request using SMTP/Gmail.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        try {
            // Enviar correo usando SMTP
            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status == Password::RESET_LINK_SENT) {
                Log::info('Correo de recuperación enviado', [
                    'email' => $request->email,
                    'status' => $status
                ]);
                return back()->with('status', __($status));
            }

            Log::error('Error al enviar correo de recuperación', [
                'email' => $request->email,
                'status' => $status
            ]);

            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);

        } catch (\Exception $e) {
            Log::error('Excepción al enviar correo SMTP', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            throw ValidationException::withMessages([
                'email' => ['Error al enviar el correo. Por favor intente más tarde.'],
            ]);
        }
    }
}