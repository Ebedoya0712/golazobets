<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SimpleTestMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $userName   // dato que quieras mostrar
    ) {}

    public function build()
    {
        return $this->subject('Correo de prueba desde Golazobets')
                    ->view('emails.simple-test');
    }
}
