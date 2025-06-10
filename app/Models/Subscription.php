<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Cashier\Subscription as CashierSubscription;

class Subscription extends CashierSubscription
{
	protected $fillable = [
		'user_id',
		'type',
		'stripe_id',
		'stripe_price',
		'stripe_status',
		'ends_at'
	];
}
