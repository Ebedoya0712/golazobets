@component('mail::message')
# Restablecer contraseña

Hola, hemos recibido una solicitud para restablecer la contraseña de la cuenta: **{{ $email }}**.

Si no solicitaste este correo, ignóralo.

@component('mail::button', ['url' => url('/reset-password')])
Restablecer contraseña
@endcomponent

Gracias,<br>
{{ config('app.name') }}
@endcomponent
