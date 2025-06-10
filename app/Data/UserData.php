<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Data\AccountData;
use App\Data\TipsterData;
use App\Models\User;

class UserData extends Data
{
	public function __construct(
		public int $id,
		public ?string $name,
		public ?string $lastname,
		public string $username,
		public string $email,
		public ?string $country,
		public ?string $profile_picture,
		public string $status,
		// public string $remember_token,
		public ?array $roles = [],
		public ?array $permissions = [],
		public ?AccountData $account,
		public ?TipsterData $tipster,
	) {}


	/**
	 * Crear una instancia de UserData desde un modelo User
	 *
	 * @param User $user El modelo de usuario
	 * @return static
	 */
	public static function fromUser(User $user): self
	{
		return new self(
			id: $user->id,
			name: $user->name,
			lastname: $user->lastname,
			username: $user->username,
			email: $user->email,
			country: $user->country,
			profile_picture: $user->profile_picture,
			status: $user->status,
			roles: $user->roles->pluck('name')->toArray(),
			permissions: $user->getAllPermissions()->pluck('name')->toArray(),
			account: $user->account ? AccountData::from($user->account->toArray()) : null,
			tipster: $user->tipster ? TipsterData::from($user->tipster->toArray()) : null,
		);
	}
}
