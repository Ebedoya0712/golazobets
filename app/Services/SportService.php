<?php

namespace App\Services;

use App\Models\Sport;
use App\Data\SportData;

class SportService
{

	public function getSports(): array
	{
		$sports = Sport::get()->map(function ($sport) {
			return SportData::from($sport);
		});

		return $sports->toArray();
	}
}
