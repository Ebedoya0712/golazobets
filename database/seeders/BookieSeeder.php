<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bookie;

class BookieSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$bookies = [
			"Bet365",
			"Betfair",
			"Betway",
			"Codere",
			"Kirolbet",
			"Pinnacle",
			"Pokerstars",
			"Retabet",
			"Sportium",
			"Winamax"
		];

		array_map(function ($bookie) {
			Bookie::create(['name' => $bookie]);
		}, $bookies);
	}
}
