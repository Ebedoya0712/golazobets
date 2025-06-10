<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Data\TipsterData;
use App\Data\UserData;

class SubscriptionData extends Data
{
	public function __construct(
		public int $id,
		public int $user_id,
		public string $type,
		public string $stripe_id,
		public string $stripe_status,
		public ?string $stripe_price,
		public ?int $quantity,
		public ?\DateTime $trial_ends_at,
		public ?string $ends_at,
		public ?string $created_at,
		public ?TipsterData $tipster,
		public ?UserData $user,
	) {}
}
