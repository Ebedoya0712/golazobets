<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;

class AdminNavbarProvider extends ServiceProvider
{
	public function register(): void
	{
		$this->app->singleton(AdminNavbarProvider::class, function ($app) {
			return new AdminNavbarProvider(null);
		});
	}

	public function boot(): void {}

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

		// Dashboard group
		$menu[] = [
			'key' => 'main',
			'title' => null,
			'menu' => $items
		];

		// --- Sección de usuarios eliminada ---

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

		return $menu;
	}
}
