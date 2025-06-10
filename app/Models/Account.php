<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
	use HasFactory;

	protected $fillable = [
		'user_id',
		'key',
		'value',
		'bio',
		'description_service',
		'description_market',
		'description_picks',
		'publishing_time',
		'stake_preference',
		'telegram_chanel',
		'telegram_user',
		'rrss'
	];


	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
