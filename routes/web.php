<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TipsterController;
use App\Http\Controllers\PickController;
use App\Http\Controllers\StaticPagesController;


Route::get('/', [StaticPagesController::class, 'homePage'])->name('homePage');

Route::get('legal', [StaticPagesController::class, 'legalConditions'])->name('legalConditions');
Route::get('privacy', [StaticPagesController::class, 'privacyPolicy'])->name('privacyPolicy');
Route::get('cookies', [StaticPagesController::class, 'cookiesPolicy'])->name('cookiesPolicy');
Route::get('bet-responsibly', [StaticPagesController::class, 'betResponsibly'])->name('betResponsibly');


Route::get('tipsters', [TipsterController::class, 'index'])
	->name('tipsters');

Route::get('tipsters', [TipsterController::class, 'index'])
	->name('tipsters');

Route::redirect('tipster', '/tipsters');

Route::get('tipsters/free', [TipsterController::class, 'tipstersFree'])
	->name('tipsters.free');

Route::get('tipsters/premium', [TipsterController::class, 'tipstersPremium'])
	->name('tipsters.premium');

Route::get('tipster/{username}', [TipsterController::class, 'show'])
	->name('tipster.profile');

Route::get('tipster/{username}/stats', [TipsterController::class, 'stats'])
	->name('tipster.profile.stats');

Route::get('tipster/{username}/picks', [TipsterController::class, 'picks'])
	->name('tipster.profile.picks');

Route::get('tipster/{username}/service', [TipsterController::class, 'services'])
	->name('tipster.profile.service');

Route::get('free-picks', [PickController::class, 'index'])->name('free.picks');


// Stripe Webhooks
Route::post(
	'stripe/webhook',
	'\Laravel\Cashier\Http\Controllers\WebhookController@handleWebhook'
)
	->name('cashier.webhook');


require __DIR__ . '/auth.php';
require __DIR__ . '/user.php';
require __DIR__ . '/admin.php';



// Route::get('storage-link', function () {
// 	if (file_exists(public_path('storage'))) {
// 		unlink(public_path('storage'));
// 	}
// 	Artisan::call('storage:link');
// 	return 'Storage link has been created.';
// });