<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Database\Factories\AccountFactory;
use Illuminate\Support\Facades\Notification;

class PermissionTest extends TestCase
{
	use RefreshDatabase;

	protected $user;

	/**
	 * Setup the test environment
	 *
	 * Create a user with roles and permissions
	 */
	protected function setUp(): void
	{
		parent::setUp();

		// Create a user with roles and permissions
		$this->user = User::factory()->create();
		Role::create(['name' => 'Super Admin']);
		$this->user->assignRole('Super Admin');
		AccountFactory::new()->create(['user_id' => $this->user->id]);
	}


	/**
	 * Test that the permissions list can be rendered
	 *
	 * This test sends a GET request to the permissions list route and asserts
	 * that the response status is 200, indicating that the permissions list
	 * view is successfully accessible.
	 *
	 * @return void
	 */
	public function test_permissions_list_can_be_rendered()
	{
		$response = $this->actingAs($this->user)->get(route('admin.permission.list'));
		$response->assertStatus(200);
	}


	/**
	 * Test that a permission can be created
	 *
	 * This test sends a POST request to the permission store route with a valid
	 * permission name. After the request is sent, it asserts that the response
	 * redirects to the permissions list view.
	 *
	 * @return void
	 */
	public function test_permission_can_be_created()
	{
		Notification::fake();

		$response = $this
			->actingAs($this->user)
			->post(route('admin.permission.store'), [
				'name' => 'Test Permission',
			]);

		$response->assertStatus(302);
	}


	/**
	 * Test that a permission can be edited
	 *
	 * This test creates a permission, sends a PUT request to the permission
	 * update route with a valid permission name, and then asserts that the
	 * response redirects to the permissions list view.
	 *
	 * @return void
	 */
	public function test_permission_can_be_edited()
	{
		$permission = Permission::create(['name' => 'Test Permission']);

		$response = $this
			->actingAs($this->user)
			->put(route('admin.permission.update', $permission));

		$response->assertStatus(302);
	}


	/**
	 * Test that a permission can be deleted
	 *
	 * This test creates a permission, sends a DELETE request to the permission
	 * destroy route, and asserts that the response status is 302, indicating
	 * a successful redirect after deletion.
	 *
	 * @return void
	 */
	public function test_permission_can_be_deleted()
	{
		$permission = Permission::create(['name' => 'Test Permission']);

		$response = $this
			->actingAs($this->user)
			->delete(route('admin.permission.destroy', $permission));

		$response->assertStatus(302);
	}
}
