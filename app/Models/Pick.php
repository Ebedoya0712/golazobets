<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pick extends Model
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
		'result',
		'profit'
	];


	protected $casts = [
		'event_date' => 'datetime',
	];

	/**
	 * Get the tipster associated with the picks.
	 */
	public function tipster()
	{
		return $this->belongsTo('App\Models\Tipster');
	}

	/**
	 * Get the sport associated with the picks.
	 */
	public function sport()
	{
		return $this->belongsTo('App\Models\Sport');
	}

	/**
	 * Get the bookie associated with the picks.
	 */
	public function bookie()
	{
		return $this->belongsTo('App\Models\Bookie');
	}
}
