<?php

namespace App\Data;

use Spatie\LaravelData\Data;


class AccountData extends Data
{
	public function __construct(
		public int $id,
		public int $user_id,
		public ?string $colorMode,
		public ?string $language,
		public ?string $bio,
		public ?string $description_service,
		public ?string $description_market,
		public ?string $description_picks,
		public ?string $publishing_time,
		public ?string $stake_preference,
		public ?string $telegram_channel,
		public ?string $telegram_user,
		public ?string $x_user,
		public ?string $facebook_user,
		public ?string $instagram_user,
		public ?string $rss,
		public ?bool $communications_consent,
	) {}
}
