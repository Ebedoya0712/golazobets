<?php
return [
	// Allow "remember me"
	// 'allow_remember_me' => env('SETTINGS_AUTH_ALLOW_REMEMBER_ME', true),

	// Allow "forgot password"
	// 'allow_forgot_password' => env('SETTINGS_AUTH_ALLOW_FORGOT_PASSWORD', true),

	// Allow "registration"
	// 'allow_registration' => env('SETTINGS_AUTH_ALLOW_REGISTRATION', true),

	// Allow "login"
	// 'allow_login' => env('SETTINGS_AUTH_ALLOW_LOGIN', true),

	// Allow "social login"
	// 'allow_social_login' => env('SETTINGS_AUTH_ALLOW_SOCIAL_LOGIN', true),

	// Allow "social registration"
	// 'allow_social_registration' => env('SETTINGS_AUTH_ALLOW_SOCIAL_REGISTRATION', true),
	'guard_permissions' => array_keys(config('auth.guards')),
	'protected_roles' => [
		'Super Admin',
		'Admin',
		'User'
	],
	'protected_permissions' => [
		'Can see users',
		'Can create new user',
		'Can edit user',
		'Can see admins',
		'Can create new admin',
		'Can edit admin',
		'Can impersonate',
		'Can see roles and permissions',
		'Can create new role',
		'Can edit role',
		'Can create new permission',
		'Can edit permission',
		'Can edit notification templates',
		'Can edit email templates',
	],
];
