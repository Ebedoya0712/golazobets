<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TipsterStat extends Model
{
	/** @use HasFactory<\Database\Factories\TipsterStatFactory> */
	use HasFactory;

	protected $fillable = [
		'tipster_id',
		'total_bet',
		'profit',
		'yield',
		'average_stake',
		'win_rate',
	];

	/**
	 * Get the tipster that owns the stat
	 */
	public function tipster(): BelongsTo
	{
		return $this->belongsTo(Tipster::class);
	}
}
