<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;

class DashboardNavbarProvider extends ServiceProvider
{
	/**
	 * Register services.
	 */
	public function register(): void
	{
		$this->app->singleton(DashboardNavbarProvider::class, function ($app) {
			return new DashboardNavbarProvider(null);
		});
	}

	/**
	 * Bootstrap services.
	 */
	public function boot(): void
	{
		//
	}

	/**
	 * Get the menu data.
	 */
	public function getMenu($user, $role): array
	{
		$menu = [];
		$userId = $user->id ?? 0;
		$cacheKey = "menu_{$userId}_{$role}";
		$permissions = $user->permissions ?? [];

		if ('Tipster' === $role) {
			$menu[] = [
				'key' => 'tipster',
				'title' => null,
				'menu' => [
					[
						'label' => 'Mis pronósticos',
						'route' => 'account.picks.index',
						'icon' => 'ri-bar-chart-box-line'
					],
					[
						'label' => 'Perfil público',
						'route' => 'account.tipsterProfile',
						'icon' => 'ri-user-line'
					],
				]
			];

			$menu[] = [
				'key' => 'myAccount',
				'title' => 'Mi cuenta',
				'menu' => [
					[
						'label' => 'Mi perfil',
						'route' => 'account.edit',
						'icon' => 'ri-account-circle-2-line'
					],
					[
						'label' => 'Mis suscripciones',
						'route' => 'account.subscriptions',
						'icon' => 'ri-list-indefinite'
					],
				]
			];
		}

		if ('User' === $role) {
			$menu[] = [
				'key' => 'myAccount',
				'title' => 'Mi cuenta',
				'menu' => [
					[
						'label' => 'Mi perfil',
						'route' => 'account.edit',
						'icon' => 'ri-account-circle-2-line'
					],
					[
						'label' => 'Mis suscripciones',
						'route' => 'account.subscriptions',
						'icon' => 'ri-list-indefinite'
					],
				]
			];
		}

		$menu[] = [
			'key' => 'global',
			'title' => null,
			'menu' => [
				// [
				// 	'label' => 'Perfil',
				// 	'route' => 'profile.edit',
				// 	'icon' => 'ri-account-circle-2-line'
				// ],
				[
					'label' => 'Cerrar sesión',
					'route' => 'logout',
					'icon' => 'ri-logout-circle-r-line',
					'className' => 'text-red-600'
				]
			]
		];


		// User gallery
		// $menu[] = [
		// 	'key' => 'gallery',
		// 	'title' => 'Media',
		// 	'menu' => [
		// 		[
		// 			'label' => 'Gallery',
		// 			'route' => 'gallery.index',
		// 			'icon' => 'ri-gallery-line'
		// 		]
		// 	]
		// ];


		return $menu;

		// return Cache::remember($cacheKey, now()->addMinutes(60), function () use ($menu) {
		// 	return $menu;
		// });
	}
}
