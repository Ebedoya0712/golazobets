<?php

namespace App\Data;

use Spatie\LaravelData\Data;


class NotificationData extends Data
{
	public function __construct(
		public string $id,
		public ?string $read_at,
		public array $data,
		public ?string $title,
		public ?string $content,
		public string $created_at,
	) {
		$this->title = $data['title'] ?? null;
		$this->content = $data['content'] ?? null;
	}
}
