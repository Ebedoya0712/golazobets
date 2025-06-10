<?php

namespace App\Traits;

trait NotificationShortcodeTrait
{
	public function userShortcodes(): array
	{
		return [
			'[user.id]'                    => "The unique identifier for the user",
			'[user.name]'                  => "The first name of the user",
			'[user.lastname]'              => "The last name of the user",
			'[user.username]'              => "The username chosen by the user",
			'[user.email]'                 => "The user's email address",
			'[user.password]'              => "The user's password",
			'[user.phone]'                 => "The phone number of the user",
			'[user.birth_date]'            => "The birth date of the user",
			'[user.address]'               => "The address of the user",
			'[user.city]'                  => "The city where the user resides",
			'[user.country]'               => "The country where the user resides",
			'[user.zip]'                   => "The postal code of the user's location",
			'[user.job_title]'             => "The job title of the user",
			'[user.company]'               => "The company where the user is employed",
			'[user.bio]'                   => "A short biography of the user",
			'[user.profile_picture]'       => "URL of the user's profile picture",
			'[user.status]'                => "The current status of the user"
		];
	}

	public function roleShortcodes(): array
	{
		return [
			'[role.name]' => "The name of the role",
		];
	}

	public function permissionShortcodes(): array
	{
		return [
			'[permission.name]' => "The name of the permission",
		];
	}
}
