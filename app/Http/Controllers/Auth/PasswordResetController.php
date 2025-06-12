<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    /**
     * Envía el enlace de reseteo usando el sistema de notificaciones
     */
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        try {
            // Usamos el sistema de reseteo de contraseña de Laravel
            $status = Password::sendResetLink(
                $request->only('email')
            );
            
            if ($status === Password::RESET_LINK_SENT) {
                Log::info('Correo de recuperación enviado', ['email' => $request->email]);
                return response()->json([
                    'message' => __($status),
                    'status' => 'success'
                ]);
            }
            
            // Manejo de errores
            throw ValidationException::withMessages([
                'email' => [__($status)]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error en recuperación de contraseña', [
                'email' => $request->email,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'status' => 'error'
            ], 500);
        }
    }

    /**
     * Procesa el reseteo de contraseña
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
        
        // Usamos el broker de contraseñas de Laravel
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();
            }
        );
        
        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => __($status),
                'status' => 'success'
            ]);
        }
        
        return response()->json([
            'message' => __($status),
            'status' => 'error'
        ], 400);
    }
}