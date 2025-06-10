<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Account;
use App\Models\Tipster;

/**
 * Use:
 * 
 * sail artisan db:seed --class="Database\Seeders\Demo\TipsterSeeder"
 * 
 * to run the seeder
 */

class TipsterSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{

		for ($i = 1; $i <= 200; $i++) {

			$user = User::factory()->create([
				'username' => "tipster$i",
			])->assignRole('Tipster');

			$user->account()->create([
				'language' => 'es',
				'colorMode' => 'light',
				'bio' => substr(fake()->paragraphs(2, true), 0, 400),
				'description_service' => substr(fake()->paragraphs(2, true), 0, 400),
				'description_market' => substr(fake()->paragraphs(2, true), 0, 400),
				'description_picks' => substr(fake()->paragraphs(2, true), 0, 400),
				'publishing_time' => substr(fake()->paragraphs(1, true), 0, 400),
				'stake_preference' => substr(fake()->paragraphs(1, true), 0, 400),
				'rrss' => fake()->url(),
			]);

			$user->tipster()->create([
				'type' => ($i % 2 === 0) ? 'premium' : 'free',
				'sport_id' => rand(1, 24),
				'cover_image' => null,
			]);

			// Check if storage directory exists for tipster picks
			$storage_path = storage_path("app/public/img/picks/{$user->tipster->id}");
			if (!file_exists($storage_path)) mkdir($storage_path, 0755, true);

			// Copy image from data-seeder to storage path
			$source = __DIR__ . '/../data-seeder/1738841897686.jpg';
			if (file_exists($source)) copy($source, $storage_path . '/1738841897686.jpg');
		}
	}
}
