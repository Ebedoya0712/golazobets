<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\MediaManagerController;
use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\User\PickController;
use App\Http\Controllers\User\TipsterController;
use App\Http\Controllers\User\SubscriptionController;


Route::middleware(['auth', 'verified'])->group(function () {
	/**
	 * Profile & account
	 * 
	 * 
	 */
	Route::match(['put', 'patch'], 'profile', [ProfileController::class, 'update'])
		->name('profile.update');

	Route::post('profile/image-profile', [ProfileController::class, 'update_image'])
		->name('profile.update_image');

	Route::delete('profile/image-profile', [ProfileController::class, 'remove_image'])
		->name('profile.remove_image');

	// Account
	Route::get('account/profile', [AccountController::class, 'edit'])
		->name('account.edit');

	Route::match(['put', 'patch'], 'account', [AccountController::class, 'update'])
		->name('account.update');

	Route::get('account/subscriptions', [AccountController::class, 'subscriptions'])
		->name('account.subscriptions');

	Route::get('account/tipster-profile', [TipsterController::class, 'show'])
		->name('account.tipsterProfile');

	Route::get('account/tipster-profile/stats', [TipsterController::class, 'stats'])
		->name('account.tipsterProfile.stats');

	Route::get('account/tipster-profile/picks', [TipsterController::class, 'picks'])
		->name('account.tipsterProfile.picks');

	Route::get('account/tipster-profile/service', [TipsterController::class, 'services'])
		->name('account.tipsterProfile.service');

	Route::post('account/cover-image', [AccountController::class, 'coverImage'])
		->name('account.updateCoverImage');

	Route::delete('account/cover-image', [AccountController::class, 'removeCoverImage'])
		->name('account.removeCoverImage');

	Route::resource('account/picks', PickController::class)
		->except(['destroy'])
		->names('account.picks');

	// Image uploader
	Route::get('media', [MediaManagerController::class, 'index'])->name('media.list');
	Route::post('media', [MediaManagerController::class, 'store'])->name('media.upload');
	Route::patch('media/{id}', [MediaManagerController::class, 'update'])->name('media.update');
	Route::delete('media/{id}', [MediaManagerController::class, 'destroy'])->name('media.delete');


	/**
	 * Notifications
	 * 
	 * 
	 */
	Route::get('notifications', [NotificationController::class, 'index'])
		->name('notification.index');

	Route::post('notification-templates/{notification}/mark-as-read', [NotificationController::class, 'markAsRead'])
		->name('notification.markAsRead');

	Route::post('notification-templates/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])
		->name('notification.markAllAsRead');


	/**
	 * Image gallery
	 * 
	 * 
	 */
	Route::get('gallery', [GalleryController::class, 'index'])->name('gallery.index');

	/**
	 * Keep alive
	 * 
	 * 
	 */
	Route::get('keep-alive', function () {
		return response()->json(['status' => 'alive']);
	})->name('keepAlive');


	/**
	 * Subscriptions
	 * 
	 * 
	 */
	Route::delete('unsubscribe/{tipster}', [SubscriptionController::class, 'destroy'])->name('unsubscribe');
	Route::get('checkout/{tipster}', [SubscriptionController::class, 'checkout'])->name('checkout');
});
