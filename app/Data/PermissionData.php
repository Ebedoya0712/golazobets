<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Data\RoleData;

class PermissionData extends Data
{
	public function __construct(
		public int $id,
		public string $name,
		public string $guard_name,
		public ?array $pivot,
		public array $roles = []
	) {}
}
