<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tipster extends Model
{

	protected $fillable = [
		'type',
		'sport_id',
		'cover_image',
		'stripe_subscription_price_id'
	];


	protected static function boot()
	{
		parent::boot();

		static::deleting(function ($tipster) {
			$tipster->user()->delete();
			$tipster->picks()->delete();
			$tipster->subscriptions()->delete();
			$tipster->stats()->delete();
			$tipster->tipster_stats()->delete();
		});
	}


	/**
	 *  Get the user that owns the Tipster
	 */
	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	/**
	 * Get all of the picks for the Tipster
	 */
	public function picks(): HasMany
	{
		return $this->hasMany(Pick::class);
	}

	/**
	 * Get the sport that owns the Tipster
	 */
	public function sport(): BelongsTo
	{
		return $this->belongsTo(Sport::class);
	}

	/**
	 * Get the stats associated with the Tipster
	 */
	public function stats(): HasMany
	{
		return $this->hasMany(Stat::class);
	}


	/**
	 * Get the tipster statistics associated with the Tipster
	 * 
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function tipster_stats(): HasOne
	{
		return $this->hasOne(TipsterStat::class);
	}
}
