<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;

use App\Models\Pick;

class PickSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$filePath = __DIR__ . '/data-seeder/fake-picks.csv';

		if (!file_exists($filePath)) {
			$this->command->error("El archivo no existe: " . $filePath);
			return;
		}

		$data = array_map('str_getcsv', file($filePath));

		foreach ($data as $index => $row) {
			if ($index === 0) continue; // Saltar la fila de encabezado

			Pick::create([
				'tipster_id' => $row[0],
				'sport_id' => $row[1],
				'bookie_id' => $row[2],
				'bet_type' => $row[3],
				'sub_type' => in_array($row[4], ['simple', 'combined']) ? $row[4] : 'simple',
				'competition' => $row[5],
				'event' => isset($row[6]) ? $row[6] : 'Evento desconocido',
				'pick' => $row[7],
				'stake' => $row[8],
				'odds' => $row[9],
				'event_date' => $row[10],
				'analysis' => $row[11],
				'screenshot_path' => "picks/$row[0]/1738841897686.jpg",
				'status' => $row[13],
				'result' => $row[14],
				'profit' => $row[15],
				'created_at' => fake()->dateTimeBetween('2023-01-01', '2025-01-31')->format('Y-m-d H:i:s'),
			]);
		}

		$this->command->info("Apuestas importadas exitosamente.");

		// for ($i = 1; $i <= 10; $i++) {
		// 	Pick::create([
		// 		'tipster_id' => 1,
		// 		'sport_id' => 2,
		// 		'bookie_id' => 4,
		// 		'bet_type' => 'pre_match',
		// 		'sub_type' => 'combined',
		// 		'competition' => 'La Liga',
		// 		'event' => 'Real Madrid vs Barcelona..',
		// 		'pick' => 'Over 2.5 goals',
		// 		'stake' => '5.00',
		// 		'odds' => '1.85',
		// 		'event_date' => '2025-01-20 20:00:00',
		// 		'analysis' => 'Real Madrid y Barcelona tienen un historial de partidos con alta cantidad de goles. Ambos equipos tienen sus principales delanteros disponibles, y sus defensas han mostrado vulnerabilidades en los últimos juegos.',
		// 		'screenshot_path' => 'picks/1/1737891669.webp',
		// 		'status' => 'pending',
		// 		'result' => NULL,
		// 		'profit' => NULL,
		// 	]);
		// }

	}
}
