<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Database\Factories\AccountFactory;

class PasswordConfirmationTest extends TestCase
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
	 * Test that the confirm password screen can be rendered.
	 *
	 * This test sends a GET request to the confirm password route as an authenticated user
	 * and asserts that the response status is 200, indicating that the confirm password
	 * page is successfully accessible.
	 */
	public function test_confirm_password_screen_can_be_rendered(): void
	{
		$response = $this->actingAs($this->user)->get('/confirm-password');
		$response->assertStatus(200);
	}

	/**
	 * Test that a user can confirm their password.
	 *
	 * This test sends a POST request to the confirm password route as an authenticated user
	 * with a valid password and asserts that the response is a redirect and that there are
	 * no errors in the session.
	 */
	public function test_password_can_be_confirmed(): void
	{
		$response = $this->actingAs($this->user)->post('/confirm-password', [
			'password' => 'password',
		]);

		$response->assertRedirect();
		$response->assertSessionHasNoErrors();
	}

	/**
	 * Test that the password confirmation fails with an invalid password.
	 *
	 * This test sends a POST request to the confirm password route as an authenticated user
	 * with an invalid password and asserts that the response is a redirect and that there are
	 * errors in the session.
	 */
	public function test_password_is_not_confirmed_with_invalid_password(): void
	{
		$response = $this->actingAs($this->user)->post('/confirm-password', [
			'password' => 'wrong-password',
		]);

		$response->assertSessionHasErrors();
	}
}
