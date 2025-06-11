<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $resetUrl;

    public function __construct($user)
    {
        $this->user = $user;
        $this->resetUrl = URL::temporarySignedRoute(
            'password.reset',
            now()->addMinutes(60),
            ['email' => $user->email]
        );
    }

    public function build()
    {
        return $this->subject('Restablecimiento de Contraseña - '.config('app.name'))
                    ->view('emails.password_reset');
    }
}