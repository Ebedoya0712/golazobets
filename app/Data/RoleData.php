<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Data\PermissionData;

class RoleData extends Data
{
	public function __construct(
		public int $id,
		public string $name,
		public string $guard_name,
		public ?int $users_count,
		public array|PermissionData $permissions = [],
	) {}
}
