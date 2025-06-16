@component('mail::message')
# Verifica tu correo electrónico

Gracias por registrarte. Por favor, haz clic en el botón para verificar tu correo:

@component('mail::button', ['url' => $url])
Verificar correo
@endcomponent

Si no creaste esta cuenta, no es necesario hacer nada.

Saludos,<br>
{{ config('app.name') }}
@endcomponent
