<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;

class ForgotPasswordController extends Controller
{
    public function showLinkRequestForm(Request $request)
    {
        // Opcional: Redirigir a dashboard si ya está autenticado
        if (auth()->check()) {
            return redirect()->route('dashboard');
        }

        return inertia('auth/ForgotPassword', [
    'status' => session('status'),
    'email_sent' => session('email_sent')
]);
    }

    public function sendResetLinkEmail(Request $request)
    {
        // Si el usuario está autenticado, usa su email
        if (auth()->check()) {
            $request->merge(['email' => auth()->user()->email]);
        }

        $request->validate(['email' => 'required|email']);

        $response = Password::sendResetLink(
            $request->only('email')
        );

        if ($response === Password::RESET_LINK_SENT) {
            Log::info("Email de recuperación enviado a: {$request->email}");
            return back()->with([
                'status' => __($response),
                'email_sent' => $request->email,
                'is_authenticated' => auth()->check()
            ]);
        }

        return back()->withErrors(['email' => __($response)]);
    }
}