<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\NotificationTemplateController;
use App\Http\Controllers\Admin\EmailTemplateController;

use App\Http\Controllers\Admin\PickController;
use App\Http\Controllers\Admin\SubscriptionController;
use App\Http\Controllers\Admin\TipsterController;
use App\Http\Controllers\Admin\PageSectionController;


Route::impersonate();


Route::middleware(['auth', 'verified', 'role:Super Admin|Admin'])
	->get(config('settings.general.admin_path'), [AdminController::class, 'index'])
	->name('admin');


Route::middleware(['auth', 'verified', 'role:Super Admin|Admin'])
	->name('admin.')
	->prefix(config('settings.general.admin_path'))
	->group(function () {

		/**
		 * Tipsters
		 * 
		 * 
		 * 
		 */
		Route::resource('tipsters', TipsterController::class)
			->except(['show', 'create', 'store'])
			->names('tipsters');

		Route::match(['put', 'patch'], 'tipsters/subscription_id/{tipster}', [TipsterController::class, 'updateSubcriptionId'])
			->middleware(['role_or_permission:Super Admin|Can update tipsters'])
			->name('tipster.supscriptionId.update');

		/**
		 * Picks
		 * 
		 * 
		 * 
		 */

		Route::resource('picks', PickController::class)
			->except(['show', 'create', 'store', 'update', 'destroy'])
			->middleware(['role_or_permission:Super Admin|Can manage picks'])
			->names('picks');


		Route::match(['put', 'patch'], 'picks/{pick}', [PickController::class, 'update'])
			->middleware(['role_or_permission:Super Admin|Can update picks'])
			->name('picks.update');

		Route::patch('picks/{pick}', [PickController::class, 'correct'])
			->name('picks.correct');

		Route::delete('picks/{pick}', [PickController::class, 'destroy'])
			->middleware(['role_or_permission:Super Admin|Can remove picks'])
			->name('picks.destroy');


		/**
		 * Subscriptions
		 * 
		 * 
		 * 
		 */
		Route::get('subscriptions', [SubscriptionController::class, 'index'])->name('subscription.index');

		Route::delete('unsubscribe/{subscription}', [SubscriptionController::class, 'destroy'])->name('unsubscribe');

		/**
		 * Users
		 * 
		 * 
		 * 
		 */
		Route::get('users', [UserController::class, 'index'])
			->middleware(['role_or_permission:Super Admin|Can see users'])
			->name('user.index');

		Route::get('users/create', [UserController::class, 'create'])
			->middleware(['role_or_permission:Super Admin|Can create new user'])
			->name('user.create');

		Route::post('users', [UserController::class, 'store'])
			->middleware(['role_or_permission:Super Admin|Can create new user'])
			->name('user.store');

		Route::get('users/{user}', [UserController::class, 'show'])
			->middleware(['role_or_permission:Super Admin|Can see users'])
			->name('user.show');

		Route::get('users/{user}/edit', [UserController::class, 'edit'])
			->middleware(['role_or_permission:Super Admin|Can edit user'])
			->name('user.edit');

		Route::match(['put', 'patch'], 'users/{user}', [UserController::class, 'update'])
			->middleware(['role_or_permission:Super Admin|Can edit user'])
			->name('user.update');

		Route::delete('users/{user}', [UserController::class, 'destroy'])
			->middleware(['role_or_permission:Super Admin|Can edit user'])
			->name('user.destroy');

		Route::middleware(['role_or_permission:Super Admin|Can edit user'])->group(function () {
			Route::post('users/image-profile/{user}', [UserController::class, 'update_image_profile'])->name('user.update_image_profile');
			Route::delete('users/image-profile/{user}', [UserController::class, 'remove_image_profile'])->name('user.remove_image_profile');
		});


		/**
		 * Administrators
		 * 
		 * 
		 * 
		 */
		Route::get('administrators', [UserAdminController::class, 'index'])
			->middleware(['role_or_permission:Super Admin|Can see admins'])
			->name('admin.index');

		// Route::get('administrator/create', [UserAdminController::class, 'create'])->name('admin.create');
		// Route::post('administrator', [UserAdminController::class, 'store'])->name('admin.store');
		// Route::get('administrator/{user}', [UserAdminController::class, 'show'])->name('admin.show');
		// Route::get('administrator/{user}/edit', [UserAdminController::class, 'edit'])->name('admin.edit');
		// Route::match(['put', 'patch'], 'administrator/{user}', [UserAdminController::class, 'update'])->name('admin.update');
		// Route::delete('administrator/{user}', [UserAdminController::class, 'destroy'])->name('admin.destroy');

		/**
		 * Roles
		 * 
		 * 
		 * 
		 */
		Route::get('roles', [RoleController::class, 'index'])
			->middleware(['role_or_permission:Super Admin|Can see roles and permissions'])
			->name('role.list');

		Route::post('roles', [RoleController::class, 'store'])
			->middleware(['role_or_permission:Super Admin|Can create new role'])
			->name('role.store');

		Route::middleware(['check_protected_role', 'role_or_permission:Super Admin|Can edit role'])->group(function () {
			Route::match(['put', 'patch'], 'roles/{role}', [RoleController::class, 'update'])
				->name('role.update');

			Route::delete('roles/{role}', [RoleController::class, 'destroy'])
				->name('role.destroy');
		});

		/**
		 * Permissions
		 * 
		 * 
		 * 
		 */
		Route::get('permissions', [PermissionController::class, 'index'])
			->middleware(['role_or_permission:Super Admin|Can see roles and permissions'])
			->name('permission.list');

		Route::post('permissions', [PermissionController::class, 'store'])
			->middleware(['role_or_permission:Super Admin|Can create new permission'])
			->name('permission.store');

		Route::match(['put', 'patch'], 'permissions/{permission}', [PermissionController::class, 'update'])
			->middleware(['role_or_permission:Super Admin|Can edit permission'])
			->name('permission.update');

		Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])
			->middleware(['role_or_permission:Super Admin|Can edit permission'])
			->name('permission.destroy');

		/**
		 * Notification templates
		 * 
		 * 
		 * 
		 */
		Route::middleware(['role_or_permission:Super Admin|Can edit notification templates'])
			->group(function () {
				Route::get('/notification-templates', [NotificationTemplateController::class, 'index'])->name('notificationTemplates.index');
				Route::match(['put', 'patch'], 'notification-templates/{template}', [NotificationTemplateController::class, 'update'])->name('notificationTemplates.update');
				Route::delete('notification-templates/{template}', [NotificationTemplateController::class, 'destroy'])->name('notificationTemplates.destroy');
			});

		/**
		 * Email templates
		 * 
		 * 
		 * 
		 */
		Route::middleware(['role_or_permission:Super Admin|Can edit email templates'])
			->group(function () {
				Route::get('/email-templates', [EmailTemplateController::class, 'index'])->name('emailTemplates.index');
				Route::get('email-templates/{template}/edit', [EmailTemplateController::class, 'edit'])->name('emailTemplates.edit');
				Route::match(['put', 'patch'], 'email-templates/{template}', [EmailTemplateController::class, 'update'])->name('emailTemplates.update');
			});


		/**
		 * Sessions
		 * 
		 * 
		 * 
		 */
		Route::delete('session/{id}/invalidate', [UserController::class, 'invalidate_session'])
			->middleware(['role_or_permission:Super Admin'])
			->name('session.invalidate');

		/**
		 * Static pages
		 * 
		 * 
		 * 
		 */
		Route::get('static-pages/home-page', [PageSectionController::class, 'homePage'])->name('static.homePage.index');
	});
