<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Providers\AdminNavbarProvider;
use App\Providers\DashboardNavbarProvider;
use App\Data\UserData;
use App\Data\NotificationData;

class HandleInertiaRequests extends Middleware
{
	/**
	 * The root template that is loaded on the first page visit.
	 *
	 * @var string
	 */
	protected $rootView = 'app';

	/**
	 * Determine the current asset version.
	 */
	public function version(Request $request): string|null
	{
		return parent::version($request);
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @return array<string, mixed>
	 */
	public function share(Request $request): array
	{

		$user = $request->user();
		$role = $user->roles[0] ?? null;

		if ($user) {
			$user = UserData::fromUser($user);
		}

		$new_notifications_count = config('settings.general.new_notifications_count');
		$notifications = $user ? NotificationData::collect(
			$request->user()->unreadNotifications()
				->take($new_notifications_count)
				->get()->toArray()
		) : null;

		$isAdmin = $request->is(config('settings.general.admin_path') . '*');

		return [
			...parent::share($request),
			'auth' => [
				'user' => $user ? $user : null,
				'permissions' => $user->permissions ?? [],
				'role' => $user->roles[0] ?? null,
				'notifications' => $notifications
			],
			'dashboardNavbar' => $role ? app(DashboardNavbarProvider::class)->getMenu($user, $role->name) : [],
			'adminNavbar' => $isAdmin ?
				app(AdminNavbarProvider::class)->getMenu($user, $role->name) :
				null,
			'adminLayout' => config('settings.general.admin_layout'),
			'userLayout' => config('settings.general.user_layout'),
			'authLayout' => config('settings.general.auth_layout'),
			'colorMode' => config('settings.general.color_mode'),
			'adminCanImpersonate' => config('settings.general.admin_can_impersonate'),
			'isAdmin' => $isAdmin,
			'ziggy' => fn() => [
				...(new Ziggy)->toArray(),
				'location' => $request->url(),
			],
			'flash' => [
				'success' => fn() => $request->session()->get('success'),
				'error' => fn() => $request->session()->get('error'),
				'info' => fn() => $request->session()->get('info'),
			]
		];
	}
}
