<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stat extends Model
{
	/** @use HasFactory<\Database\Factories\StatFactory> */
	use HasFactory;

	protected $fillable = [
		'tipster_id',
		'total_bet',
		'profit',
		'yield',
		'average_stake',
		'win_rate',
		'year',
		'month',
		'total_picks',
		'average_odds'
	];

	/**
	 * Get the tipster that owns the stat
	 */
	public function tipster(): BelongsTo
	{
		return $this->belongsTo(Tipster::class);
	}
}
