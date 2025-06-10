<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Attributes\Validation\StringType;

use App\Data\UserData;
use App\Data\SportData;

class TipsterData extends Data
{
	public function __construct(
		public int $id,
		public int $user_id,
		public string $type,
		public ?int $sport_id,
		public ?string $cover_image = null,
		public ?string $stripe_subscription_price_id = null,
		public ?int $picks_count = null,
		public ?UserData $user = null,
		public ?SportData $sport,
		public ?TipsterStatData $tipster_stats
	) {}
}
