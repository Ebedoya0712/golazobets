<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Exception;

class AdminSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// Create a super admin user
		$superadmin = User::factory()->create([
			'name' => 'Max',
			'lastname' => 'Masterson',
			'username' => 'maxmasterson',
			'email' => 'superadmin@local.com'
		])->assignRole('Super Admin');

		$superadmin->account()->create([
			'colorMode' => 'light',
			'language' => 'es'
		]);


		$admin = User::factory()->create([
			'name' => 'Emma',
			'lastname' => 'Smith',
			'username' => 'real_emma',
			'email' => 'admin@local.com'
		])->assignRole('Admin');

		$admin->account()->create([
			'colorMode' => 'light',
			'language' => 'es'
		]);



		/**
		 * SUPER ADMIN CLIENT
		 */
		$admin2 = User::factory()->create([
			'name' => 'Xabier',
			'lastname' => 'Admin',
			'username' => 'xabier',
			'email' => 'golazobets1@gmail.com'
		]);

		if (!$admin2) {
			throw new Exception('Failed to create admin user.');
		}

		$permissions = [
			'Can manage tipsters',
			'Can create tipsters',
			'Can update tipsters',
			'Can remove tipsters',
			'Can manage subscriptions',
			'Can update subscriptions',
			'Can remove subscriptions',
			'Can manage picks',
			'Can update picks',
			'Can remove picks',
		];

		foreach ($permissions as $permissionName) {
			$permission = Permission::firstOrCreate(['name' => $permissionName]);

			// Asigna permisos
			$admin2->givePermissionTo($permission);
		}

		// Asigna el rol de admin
		$admin2->assignRole('Admin');

		// Crea la cuenta
		$admin2->account()->create([
			'colorMode' => 'light',
			'language' => 'es'
		]);
	}
}
