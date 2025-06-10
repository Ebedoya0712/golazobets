<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Sport;

class SportSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$sports = [
			['name' => 'Fútbol', 'color' => '#A656CC'],
			['name' => 'Tenis', 'color' => '#67C64F'],
			['name' => 'Tenis de mesa', 'color' => '#35DD8C'],
			['name' => 'Baloncesto', 'color' => '#EBB678'],
			['name' => 'Carreras de caballos', 'color' => '#EA7474'],
			['name' => 'eSports', 'color' => '#AF3B6E'],
			['name' => 'Béisbol', 'color' => '#FF5154'],
			['name' => 'F1', 'color' => '#424651'],
			['name' => 'Hockey', 'color' => '#FF6464'],
			['name' => 'Voleibol', 'color' => '#4F59C6'],
			['name' => 'Balonmano', 'color' => '#DD9B83'],
			['name' => 'Fútbol sala', 'color' => '#598505'],
			['name' => 'Rugby/Fútbol Americano', 'color' => '#91A6FF'],
			['name' => 'Boxeo/UFC', 'color' => '#6E44FF'],
			['name' => 'Squash', 'color' => '#8ed62d'],
			['name' => 'Ciclismo', 'color' => '#DCC30D'],
			['name' => 'Padel', 'color' => '#D4FF00'],
			['name' => 'MotoGP', 'color' => '#4F8BC6'],
			['name' => 'Dardos', 'color' => '#78A3DE'],
			['name' => 'Billar', 'color' => '#3E920E'],
			['name' => 'Bádminton', 'color' => '#39CD86'],
			['name' => 'Carreras de Galgos', 'color' => '#FF88DC'],
			['name' => 'Golf', 'color' => '#C300FF'],
			['name' => 'Cricket', 'color' => '#FFAC1C'],
		];

		// Crear cada deporte en la base de datos
		foreach ($sports as $sport) {
			Sport::create($sport);
		}
	}
}
