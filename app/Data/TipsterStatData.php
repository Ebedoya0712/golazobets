<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class TipsterStatData extends Data
{
	public function __construct(
		// public int $id,
		// public int $tipster_id,
		public float $total_bet,
		public float $profit,
		public float $yield,
		public float $average_stake,
		public float $win_rate,
	) {}
}
