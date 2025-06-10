<?php

namespace App\Services;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Data\RoleData;
use App\Data\PermissionData;
use App\Notifications\RoleCreated;
use App\Notifications\RoleUpdated;

class RoleService
{


	/**
	 * Retrieve a list of roles.
	 * 
	 * @param Request $request
	 * 
	 * @return array
	 */
	public function roleList(Request $request): array
	{
		$per_page = config('settings.general.per_page');

		$roles = Role::with('permissions')
			->withCount('users')
			->orderBy($request->order ?? 'created_at', $request->dir === 'ascending' ? 'asc' : 'desc')
			->paginate($per_page)
			->toArray();

		foreach ($roles['data'] as $key => $role) {
			if (isset($role->permissions) && count($role->permissions) > 0) {
				$role['permissions'] = array_map(fn($permission) => PermissionData::from($permission), $role['permissions']);
			}

			$roles['data'][$key] = RoleData::from($role);
		}

		$protected_roles = config('settings.auth.protected_roles');
		$permissions = $this->getPermissionsByGuard();

		return compact(
			'roles',
			'protected_roles',
			'permissions'
		);
	}



	/**
	 * Create a new role and give it the specified permissions
	 *
	 * @param Request $request
	 * @return Role
	 */
	public function storeRole(Request $request): Role
	{
		$request->validate([
			'name' => 'required|unique:roles,name',
		], [
			'name.required' => 'Role name is required.',
			'name.unique' => 'Role name already exists.'
		]);

		$name = preg_replace('/\s+/', ' ', $request->name);
		$name = preg_replace('/[^A-Za-z0-9\s]/', '', $name);

		$role = Role::create(['name' => trim($name)]);
		$role->givePermissionTo($request->permissions);

		$this->notificationsForSuperAdmins('create', $role);

		return $role;
	}



	/**
	 * Update the specified role in storage.
	 *
	 * @param Request $request
	 * @param Role $role
	 * @return Role
	 */
	public function updateRole(Request $request, Role $role): Role
	{
		$request->validate([
			'name' => 'required|unique:roles,name,' . $role->id,
		], [
			'name.required' => 'Role name is required.',
			'name.unique' => 'Role name already exists.'
		]);

		$name = preg_replace('/\s+/', ' ', $request->name);
		$name = preg_replace('/[^A-Za-z0-9\s]/', '', $name);

		$role->update(['name' => trim($name)]);
		$role->syncPermissions($request->permissions);

		$this->notificationsForSuperAdmins('update', $role);

		return $role;
	}



	/**
	 * Remove the specified role from storage.
	 *
	 * @param Role $role
	 * @return bool
	 */
	public function destroyRole(Role $role): bool
	{
		$deletedRole = $role->delete();

		return $deletedRole;
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
	protected function notificationsForSuperAdmins($case, Role $role)
	{
		$superadmin = Role::findByName('Super Admin');

		switch ($case) {
			case 'create':
				$superadmin->users->each->notify(new RoleCreated($role));
				break;
			case 'update':
				$superadmin->users->each->notify(new RoleUpdated($role));
				break;
		}
	}


	/**
	 * getPermissionsByGuard
	 */
	protected function getPermissionsByGuard()
	{
		$guards = config('settings.auth.guard_permissions');
		$permissions = [];

		foreach ($guards as $guard_name) {
			$permissions[$guard_name] = Permission::where('guard_name', $guard_name)->get();
		}

		return $permissions;
	}
}
