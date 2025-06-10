<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Account;

/**
 * Use:
 * 
 * sail artisan db:seed --class="Database\Seeders\Demo\UserSeeder"
 * 
 * to run the seeder
 */

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// $user  = User::factory()->create()->assignRole('User');

		// $user->account()->create([
		// 	'colorMode' => 'light',
		// 	'language' => 'es'
		// ]);

		for ($i = 1; $i <= 10; $i++) {
			$user = User::factory()->create()->assignRole('User');

			$user->account()->create([
				'colorMode' => 'light',
				'language' => 'es'
			]);
		}
	}
}
