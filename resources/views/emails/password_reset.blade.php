<!DOCTYPE html>
<html>
<head>
    <title>Restablecer Contraseña</title>
</head>
<body>
    <h2>Hola,</h2>
    <p>Has solicitado restablecer tu contraseña en {{ config('app.name') }}.</p>
    
    <p>
        <a href="{{ $resetUrl }}" style="background: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Restablecer Contraseña
        </a>
    </p>
    
    <p>Si no solicitaste este cambio, ignora este correo.</p>
    
    <p>Gracias,<br>
    El equipo de {{ config('app.name') }}</p>
</body>
</html>