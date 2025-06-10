<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Models\NotificationTemplate;

class NotificationTemplateData extends Data
{
	public function __construct(
		public int $id,
		public string $title,
		public string $content,
		public string $type,
		public array $shortcodes,
	) {}
}
