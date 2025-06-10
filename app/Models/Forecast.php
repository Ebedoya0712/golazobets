<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
	protected $fillable = [
		'tipster_id',
		'sport_id',
		'bookie_id',
		'bet_type',
		'sub_type',
		'competition',
		'event',
		'pick',
		'stake',
		'odds',
		'event_date',
		'analysis',
		'screenshot_path',
		'status',
		'result'
	];

	/**
	 * Get the tipster associated with the forecast.
	 */
	public function tipster()
	{
		return $this->belongsTo('App\Models\Tipster');
	}

	/**
	 * Get the sport associated with the forecast.
	 */
	public function sport()
	{
		return $this->belongsTo('App\Models\Sport');
	}

	/**
	 * Get the bookie associated with the forecast.
	 */
	public function bookie()
	{
		return $this->belongsTo('App\Models\Bookie');
	}
}
