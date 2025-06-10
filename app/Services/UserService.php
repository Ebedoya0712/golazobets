<?php

namespace App\Services;

use App\Models\User;
use App\Data\RoleData;
use App\Data\UserData;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Requests\Admin\CreateUserRequest;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use App\Notifications\UserCreated;
use App\Notifications\UserUpdated;
use App\Notifications\SendUserDetailsOnCreateUserNotification;
use App\Notifications\SendUserDetailsOnUpdateUserNotification;


class UserService
{

	/**
	 * Available methods:
	 * 
	 * userList() - Get paginated list of users with 'User' role
	 * storeUser() - Create new user and assign role
	 * editUser() - Get user details with sessions and roles
	 * updateUser() - Update existing user information
	 * destroyUser() - Delete user and profile image
	 * updateImageProfile() - Update user's profile picture
	 * removeImageProfile() - Remove user's profile picture
	 * adminList() - Get paginated list of users with 'Admin' role
	 * notificationsForSuperAdmins() - Send notifications to Super Admins
	 * notificationsForUsers() - Send notifications to specific user
	 */

	/**
	 * Retrieve a list of users.
	 *
	 * @return array
	 */
	public function userList(): array
	{
		$per_page = config('settings.general.per_page');

		$users = User::role('User')
			->with('sessions')
			->orderBy('created_at', 'desc')
			->paginate($per_page)
			->toArray();

		$total = User::role('User')->count();

		$users['data'] = array_map(fn($user) => UserData::from($user), $users['data']);

		return compact('users', 'total');
	}


	/**
	 * Store a newly created user in storage.
	 *
	 * @param CreateUserRequest $request
	 * @return User
	 */
	public function storeUser(CreateUserRequest $request): User
	{

		$password = $request->password;
		$user = User::create(array_merge(
			$request->validated(),
			['password' => bcrypt($password)]
		));

		// Assign a role for the user
		$role = Role::findById($request->role);
		$user->assignRole($role);

		// Send email with user details if send_details is true
		if ($request->has('send_details') && $request->send_details) {
			$this->notificationsForUsers('create', $user, $password);
		}

		$this->notificationsForSuperAdmins('create', $user);

		return $user;
	}


	/**
	 * Get the user, sessions, permission and roles.
	 * This method is used to display the user details page.
	 *
	 * @param User $user
	 * @return array
	 */
	public function editUser(User $user): array
	{
		$auth = Auth::user();
		$permission = $auth->getPermissionsViaRoles()->pluck('name')->first();

		$user['role'] = $user->roles->pluck('name')->first();

		$sessions = $user->sessions;

		$roles = RoleData::collect(Role::all());

		return compact('user', 'sessions', 'permission', 'roles');
	}


	/**
	 * Update the specified user in storage.
	 *
	 * @param UpdateUserRequest $request
	 * @param User $user
	 * @return User
	 */
	public function updateUser(UpdateUserRequest $request, User $user): User
	{
		$data = $request->validated();

		// Encrypt password if it's provided
		if (!empty($data['password'])) {
			$data['password'] = bcrypt($data['password']);
		}

		$user->update($data);

		// Assign a role for the user
		if (!empty($data['role'])) {
			$role = Role::findById($data['role']);
			$user->syncRoles([$role]);
		}

		$this->notificationsForSuperAdmins('update', $user);
		$this->notificationsForUsers('update', $user);

		return $user;
	}


	/**
	 * Delete the specified user from storage.
	 *
	 * @param User $user
	 * @return bool
	 */
	public function destroyUser(User $user): bool
	{
		$this->removeImageProfile($user);
		$deletedUser = $user->delete();

		return $deletedUser;
	}


	/**
	 * Update the user's profile picture and save it to the users/avatars directory.
	 *
	 * @param User $user
	 * @param Request $request
	 * @return void
	 */
	public function updateImageProfile(User $user, Request $request): void
	{
		if ($request->hasFile('profile_picture')) {
			$currentImagePath = '/public/img/users/avatars/' . $user->profile_picture;

			if (Storage::disk('public')->exists($currentImagePath)) {
				Storage::disk('public')->delete($currentImagePath);
			}

			$file = $request->file('profile_picture');
			$filename = time() . '.webp';
			$image = Image::read($file);
			$image->resize(256, 256)->toWebp(100);

			// Ensure the destination directory exists
			$directory = 'img/users/avatars';

			if (!Storage::disk('public')->exists($directory)) {
				Storage::disk('public')->makeDirectory($directory, 0755, true);
			}

			// Save the image
			$image
				->toWebp(90)
				->save(Storage::disk('public')->path($directory . '/' . $filename));

			if ($filename) {
				$user->update(['profile_picture' => $filename]);
			}

			$this->notificationsForSuperAdmins('update', $user);
		}
	}



	/**
	 * Remove the user's profile picture if it exists
	 * 
	 * @param User $user
	 * @return void
	 */
	public function removeImageProfile(User $user): void
	{
		$imagePath = '/public/img/users/avatars/' . $user->profile_picture;

		if (Storage::exists($imagePath)) {
			Storage::delete($imagePath);
		}

		$user->update(['profile_picture' => null]);

		$this->notificationsForSuperAdmins('update', $user);
	}



	/**
	 * Retrieve a list of users with the 'Admin' role.
	 *
	 * @return array
	 */
	public function adminList(): array
	{
		$per_page = config('settings.general.per_page');

		$users = User::role('Admin')->paginate($per_page);
		$total = User::count();

		return compact('users', 'total');
	}


	/**
	 * Send a notification to the users with the 'Super Admin' role for the following cases:
	 * 
	 *  - create: when a new role is created
	 *  - update: when a role is updated
	 *  - delete: when a role is deleted
	 * 
	 * @param string $case One of the above cases
	 * @param Role $role The role that was created, updated or deleted
	 * @return void
	 */
	protected function notificationsForSuperAdmins($case, User $user): void
	{
		$superadmin = Role::findByName('Super Admin');

		switch ($case) {
			case 'create':
				$superadmin->users->each->notify(new UserCreated($user));
				break;
			case 'update':
				$superadmin->users->each->notify(new UserUpdated($user));
				break;
		}
	}


	protected function notificationsForUsers($case, User $user, $password = null): void
	{
		switch ($case) {
			case 'create':
				$user->notify(new SendUserDetailsOnCreateUserNotification($user, $password));
				break;
			case 'update':
				$user->notify(new SendUserDetailsOnUpdateUserNotification($user));
				break;
		}
	}
}
