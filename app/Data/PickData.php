<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Regex;
use App\Enums\Picks\BetType;
use App\Enums\Picks\SubType;
use App\Enums\Picks\Status;
use App\Data\TipsterData;
use App\Data\SportData;
use App\Data\BookieData;
use Carbon\Carbon;

class PickData extends Data
{
	public function __construct(
		public ?int $id,

		#[Required, IntegerType]
		public int $tipster_id,

		#[Required, IntegerType]
		public int $sport_id,

		#[Nullable, IntegerType]
		public ?int $bookie_id = null,

		#[Required, Enum(BetType::class)]
		public ?string $bet_type,

		#[Required, Enum(SubType::class)]
		public ?string $sub_type,

		#[Required, StringType]
		public ?string $competition = "",

		#[Required, StringType]
		public ?string $event = "",

		#[Required, StringType]
		public ?string $pick = "",

		#[Required, Numeric, Regex('/^\d+(\.\d{1,2})?$/')]
		public ?float $stake,

		#[Required, Numeric, Regex('/^\d+(\.\d{1,2})?$/')]
		public ?float $odds,

		#[Required, Date]
		public ?string $event_date,

		#[Nullable, StringType]
		public ?string $analysis = null,

		#[Nullable, StringType]
		public ?string $screenshot_path = null,

		#[Required, Enum(Status::class)]
		public ?string $status,

		#[Nullable, Numeric, Regex('/^\d+(\.\d{1,2})?$/')]
		public ?float $result = null,

		public ?string $profit = "",

		public ?bool $blocked = false,

		public ?TipsterData $tipster,

		public ?SportData $sport,

		public ?BookieData $bookie
	) {}

	/**
	 * Modificar el event_date para devolver una instancia de Carbon.
	 */
	public function getEventDate(): Carbon
	{
		return Carbon::parse($this->event_date);
	}

	/**
	 * Asignar una fecha a event_date usando Carbon.
	 */
	public function setEventDate(Carbon|string $date): void
	{
		$this->event_date = $date instanceof Carbon
			? $date->toIso8601String()
			: Carbon::parse($date)->toIso8601String();
	}
}
