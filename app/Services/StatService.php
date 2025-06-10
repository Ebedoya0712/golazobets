<?php

namespace App\Services;

use App\Data\StatData;

use App\Models\User;

class StatService
{

	public function getStatsByUsername(string $username)
	{
		$user = User::where('username', $username)->first();
		$stats = $user
			->tipster
			->stats
			->toArray();
		$stats = array_map(fn($stat) => StatData::from($stat), $stats);

		return $stats;
	}
}
