<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class StatData extends Data
{
	public function __construct(
		public int $id,
		public int $tipster_id,
		public int $year,
		public int $month,
		public int $total_picks,
		public float $total_bet,
		public float $profit,
		public float $yield,
		public float $average_stake,
		public float $average_odds,
		public float $win_rate,
		public string $bet_type,
	) {}
}
