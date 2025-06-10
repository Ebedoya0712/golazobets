<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;

class AdminNavbarProvider extends ServiceProvider
{
	/**
	 * Register services.
	 */
	public function register(): void
	{
		$this->app->singleton(AdminNavbarProvider::class, function ($app) {
			return new AdminNavbarProvider(null);
		});
	}

	/**
	 * Bootstrap services.
	 */
	public function boot(): void {}


	/**
	 * Get the menu data.
	 */
	public function getMenu($user, $role): array
	{
		$menu = [];
		$userId = $user->id ?? 0;
		$cacheKey = "menu_{$userId}_{$role}";
		$permissions = $user->permissions ?? [];

		$items = [
			[
				'label' => 'Dashboard',
				'route' => 'admin',
				'icon' => 'ri-home-5-fill'
			]
		];

		$picks = [
			'label' => 'Picks',
			'route' => 'admin.picks.index',
			'icon' => 'ri-bar-chart-box-line',
		];

		$subscriptions = [
			'label' => 'Suscripciones',
			'route' => 'admin.subscription.index',
			'icon' => 'ri-exchange-dollar-line',
		];

		$tipsters = [
			'label' => 'Tipsters',
			'route' => 'admin.tipsters.index',
			'icon' => 'ri-account-circle-2-line',
		];


		// Picks
		if ($role === 'Super Admin' || in_array('Can manage picks', $permissions)) array_push($items, $picks);
		// Subscriptions
		if ($role === 'Super Admin' || in_array('Can manage subscriptions', $permissions)) array_push($items, $subscriptions);
		// Tipsters
		if ($role === 'Super Admin' || in_array('Can manage tipsters', $permissions)) array_push($items, $tipsters);


		// Dashboard
		$menu[] = [
			'key' => 'main',
			'title' => null,
			'menu' => $items
		];



		// Users and Administrators
		if ('Super Admin' === $role || in_array('Can see users', $permissions)) {
			$item = [
				'key' => 'users',
				'title' => null,
				'menu' => [
					[
						'label' => 'Users',
						'route' => 'admin.user.index',
						'icon' => 'ri-group-3-fill',
					],
				]
			];

			if (
				isset($role) && 'Super Admin' == $role ||
				in_array('Can see admins', $permissions)
			) {
				$item['menu'][] = [
					'label' => 'Administrators',
					'route' => 'admin.admin.index',
					'icon' => 'ri-user-2-fill',
				];
			}

			$menu[] = $item;
		}


		if (isset($role) && $role === 'Super Admin') {
			// Roles and permissions
			$item = [
				'key' => 'roles_permissions',
				'title' => 'Roles & permissions',
				'menu' => [
					[
						'label' => 'Roles',
						'route' => 'admin.role.list',
						'icon' => 'ri-user-settings-line'
					],
					[
						'label' => 'Permissions',
						'route' => 'admin.permission.list',
						'icon' => 'ri-user-2-fill',
					]
				],
			];

			$menu[] = $item;

			// Templates
			$item = [
				'key' => 'templates',
				'title' => 'Templates',
				'menu' => [
					[
						'label' => 'Notifications',
						'route' => 'admin.notificationTemplates.index',
						'icon' => 'ri-notification-badge-fill'
					],
					[
						'label' => 'Emails',
						'route' => 'admin.emailTemplates.index',
						'icon' => 'ri-mail-open-fill'
					]
				],
			];

			$menu[] = $item;
		}

		// $menu[] = [
		// 	'key' => 'static_page',
		// 	'title' => "Páginas estáticas",
		// 	'menu' => [
		// 		[
		// 			'label' => 'Inicio',
		// 			'route' => 'admin.static.homePage.index',
		// 			'icon' => 'ri-home-5-fill'
		// 		],
		// 	]
		// ];


		return $menu;

		// return Cache::remember($cacheKey, now()->addMinutes(60), function () use ($menu) {
		// 	return $menu;
		// });
	}
}
