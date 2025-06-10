<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class PermissionSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$roleAdmin = Role::findByName('Admin');

		$can_see_users = Permission::create(['name' => 'Can see users']);
		$can_create_new_user = Permission::create(['name' => 'Can create new user']);
		$can_edit_user = Permission::create(['name' => 'Can edit user']);

		$can_see_admins = Permission::create(['name' => 'Can see admins']);
		$can_create_new_admin = Permission::create(['name' => 'Can create new admin']);
		$can_edit_admin = Permission::create(['name' => 'Can edit admin']);

		$can_impersonate = Permission::create(['name' => 'Can impersonate']);

		$can_see_roles_and_permissions = Permission::create(['name' => 'Can see roles and permissions']);
		$can_create_new_role = Permission::create(['name' => 'Can create new role']);
		$can_edit_role = Permission::create(['name' => 'Can edit role']);
		$can_create_new_permission = Permission::create(['name' => 'Can create new permission']);
		$can_edit_permission = Permission::create(['name' => 'Can edit permission']);

		$can_edit_notifications = Permission::create(['name' => 'Can edit notification templates']);
		$can_edit_email_templates = Permission::create(['name' => 'Can edit email templates']); 

		$roleAdmin->givePermissionTo([
			$can_see_users,
			$can_create_new_user,
			$can_edit_user,
			$can_see_roles_and_permissions,
			$can_edit_notifications,
			$can_edit_email_templates
		]);
	}
}
