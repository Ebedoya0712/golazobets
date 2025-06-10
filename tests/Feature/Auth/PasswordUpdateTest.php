<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Database\Factories\AccountFactory;

class PasswordUpdateTest extends TestCase
{
	use RefreshDatabase;

	protected $user;

	/**
	 * Set up the test environment
	 *
	 * Create a user with roles and permissions
	 */
	protected function setUp(): void
	{
		parent::setUp();

		// Create a user
		$this->user = User::factory()->unverified()->create();
		Role::create(['name' => 'User']);
		$this->user->assignRole('User');
		AccountFactory::new()->create(['user_id' => $this->user->id]);
	}

	/**
	 * Test that a user's password can be updated.
	 *
	 * This test creates a user, logs them in, and then sends a PUT request to the
	 * password update route with the user's current password, new password, and
	 * confirmed new password. It asserts that there are no errors in the session,
	 * that the user is redirected to the profile page, and that the user's password
	 * has been successfully updated.
	 */
	public function test_password_can_be_updated(): void
	{
		$response = $this
			->actingAs($this->user)
			->from('/profile')
			->put('/password', [
				'current_password' => 'password',
				'password' => 'new-password',
				'password_confirmation' => 'new-password',
			]);

		$response
			->assertSessionHasNoErrors()
			->assertRedirect('/profile');

		$this->assertTrue(Hash::check('new-password', $this->user->refresh()->password));
	}

	/**
	 * Test that the correct password must be provided to update the user's password.
	 *
	 * This test logs in a user and sends a PUT request to the password update route
	 * with an incorrect current password and a new password. It asserts that the response
	 * contains an error for the 'current_password' field and redirects back to the profile page.
	 */
	public function test_correct_password_must_be_provided_to_update_password(): void
	{

		$response = $this
			->actingAs($this->user)
			->from('/profile')
			->put('/password', [
				'current_password' => 'wrong-password',
				'password' => 'new-password',
				'password_confirmation' => 'new-password',
			]);

		$response
			->assertSessionHasErrors('current_password')
			->assertRedirect('/profile');
	}
}
