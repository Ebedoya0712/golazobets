<?php

namespace App\Services;

use App\Models\Tipster;
use App\Models\Pick;

use App\Data\TipsterData;
use App\Data\PickData;

class HomePageService
{

	public function getFeaturedTipsters()
	{
		return TipsterData::collect(Tipster::with(['user', 'user.account', 'sport', 'tipster_stats'])->latest()->take(8)->get());
	}

	public function getFeaturedPicks()
	{
		return PickData::collect(Pick::with(['tipster.user'])->latest()->take(5)->get());
	}
}
