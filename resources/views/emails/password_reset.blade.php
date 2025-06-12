@component('mail::message')
# Restablecer contraseña

Haz clic en el botón de abajo para restablecer tu contraseña:

@component('mail::button', ['url' => $url])
Restablecer contraseña
@endcomponent

Si no solicitaste este correo, no hagas nada.

Gracias,<br>
{{ config('app.name') }}
@endcomponent
