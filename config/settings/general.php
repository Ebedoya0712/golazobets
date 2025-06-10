<?php

/**
 * All environment variables must being with VITE_
 */
return [
	'admin_path' => env('VITE_ADMIN_PATH', 'admin'),
	'admin_layout' => env('VITE_ADMIN_LAYOUT', 'corporate'), // corporate, executive
	'user_layout' => env('VITE_USER_LAYOUT', 'corporate'), // corporate, executive, mobile
	'auth_layout' => env('VITE_AUTH_LAYOUT', 'layout1'), // 'layout1', 'layout2', or 'layout3'
	'color_mode' => env('VITE_COLOR_MODE', 'light'), // light or dark

	// Determine if the super admin should be notified when a new user registers.
	'new_user_superadmin_notification' => env('VITE_NEW_USER_SUPERADMIN_NOTIFICATION', true),
	// Determine how many notifications to show in the dropdown menu.
	'new_notifications_count' => env('VITE_NEW_NOTIFICATIONS_COUNT', 5),
	// Determine how many items to show per page in the admin panel.
	'per_page' => 15,

	// Configure Open Graph settings for the site.
	'og_description' => env('VITE_OG_DESCRIPTION', 'Laravel Dashboard'),
	'og_image' => env('VITE_OG_IMAGE', 'og-image.jpg'),
	'x_user' => env('VITE_X_USER', '@twitter_X_user'),
	'msapplication_color' => env('VITE_MSAPPLICATION_COLOR', '#000000'),


	// Determine if the admin should be able to impersonate other users.
	// @link https://github.com/lab404/laravel-impersonate
	'admin_can_impersonate' => env('VITE_ADMIN_CAN_IMPERSONATE', false),
	'max_characters_for_wysiwyg' => 400
];
