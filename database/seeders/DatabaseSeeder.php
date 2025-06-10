<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\AdminSeeder;
use Database\Seeders\NotificationTemplateSeeder;
use Database\Seeders\EmailTemplateSeeder;
use Database\Seeders\SportSeeder;
use Database\Seeders\BookieSeeder;
use Database\Seeders\demo\UserSeeder;
use Database\Seeders\demo\TipsterSeeder;
use Database\Seeders\PickSeeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{

		$this->call([
			RoleSeeder::class,
			PermissionSeeder::class,
			AdminSeeder::class,
			UserSeeder::class,
			SportSeeder::class,
			BookieSeeder::class,
			TipsterSeeder::class,
			NotificationTemplateSeeder::class,
			EmailTemplateSeeder::class,
			PickSeeder::class
		]);
	}
}
