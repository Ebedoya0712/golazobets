<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use App\Traits\NotificationTrait;
use App\Models\EmailTemplate;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{

	use NotificationTrait;

	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		if ($this->app->environment('local')) {
			// $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
			// $this->app->register(TelescopeServiceProvider::class);
		}
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		Schema::defaultStringLength(191);

		// Gate::before(function ($user, $ability) {
		// 	return $user->hasRole('Super Admin') ? true : null;
		// });
	}
}
