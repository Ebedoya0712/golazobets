<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    public $resetUrl;

    public function __construct($resetUrl)
    {
        $this->resetUrl = $resetUrl;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Restablecer Contraseña - ' . config('app.name'))
            ->line('Estás recibiendo este correo porque recibimos una solicitud de restablecimiento de contraseña para tu cuenta.')
            ->action('Restablecer Contraseña', $this->resetUrl)
            ->line('Si no solicitaste un restablecimiento de contraseña, ignora este mensaje.');
    }
}