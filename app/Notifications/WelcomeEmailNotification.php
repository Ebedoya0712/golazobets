<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeEmailNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('¡Bienvenido a GOLAZOBETS!')
            ->greeting('¡Hola! Nos encanta tenerte aquí.')
            ->line('Antes que nada, gracias por confiar en nosotros.')
            ->line('GOLAZOBETS no es solo una plataforma de apuestas deportivas. Es una comunidad donde tipsters y apasionados de las apuestas deportivas encuentran su espacio.')
            ->line('Queremos que te sientas como en casa, ya sea que estés buscando apuestas de valor o compartiendo tus pronósticos con el mundo.')
            ->line('Para que todo funcione de la mejor manera, te invitamos a seguir nuestras Normas y Buenas Prácticas.')
            ->action('Ver Normas y Buenas Prácticas', url('/bet-responsibly'))
            ->line('Transparencia, seriedad y profesionalidad son los pilares que nos hacen crecer juntos.')
            ->line('Cualquier duda, estamos aquí para ayudarte. ¡Disfruta la experiencia y que empiecen los aciertos!')
            ->line('¡Gracias por ser parte de GOLAZOBETS!');
    }
}
