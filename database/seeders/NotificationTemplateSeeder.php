<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NotificationTemplate;
use App\Traits\NotificationShortcodeTrait;

class NotificationTemplateSeeder extends Seeder
{

	use NotificationShortcodeTrait;

	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$template = new NotificationTemplate;

		// User created
		NotificationTemplate::create([
			'title' => 'User created',
			'content' => '<p>A new user has been created.</p>',
			'type' => 'App\Notifications\UserCreated',
			'shortcodes' => json_encode($this->userShortcodes(), true)
		]);

		// User updated
		NotificationTemplate::create([
			'title' => 'User updated',
			'content' => '<p>User updated successfully</p>',
			'type' => 'App\Notifications\UserUpdated',
			'shortcodes' => json_encode($this->userShortcodes(), true)
		]);

		// Role created
		NotificationTemplate::create([
			'title' => 'Role created',
			'content' => '<p>A new role has been created.</p>',
			'type' => 'App\Notifications\RoleCreated',
			'shortcodes' => json_encode($this->roleShortcodes(), true)
		]);

		// Role updated
		NotificationTemplate::create([
			'title' => 'Role updated',
			'content' => '<p>The role <strong>[role.name]</strong> has been updated.</p>',
			'type' => 'App\Notifications\RoleUpdated',
			'shortcodes' => json_encode($this->roleShortcodes(), true)
		]);

		// Permission created
		NotificationTemplate::create([
			'title' => 'Permission created',
			'content' => '<p>A new permission has been created.</p>',
			'type' => 'App\Notifications\PermissionCreated',
			'shortcodes' => json_encode($this->permissionShortcodes(), true)
		]);

		// Permission updated
		NotificationTemplate::create([
			'title' => 'Permission updated',
			'content' => '<p>The permission <strong>[permission.name]</strong> has been updated.</p>',
			'type' => 'App\Notifications\PermissionUpdated',
			'shortcodes' => json_encode($this->permissionShortcodes(), true)
		]);
	}
}
