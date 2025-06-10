<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Database\Factories\AccountFactory;

class AuthenticationTest extends TestCase
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
	 * Test that the login screen can be rendered.
	 *
	 * This test sends a GET request to the login route and asserts
	 * that the response status is 200, indicating that the login
	 * page is successfully accessible.
	 */
	public function test_login_screen_can_be_rendered(): void
	{
		$response = $this->get('/login');

		$response->assertStatus(200);
	}

	/**
	 * Test that a user can authenticate using their email.
	 *
	 * This test sends a POST request to the login route with the user's email
	 * and password, and asserts that the user is successfully authenticated.
	 */
	public function test_user_can_authenticate_using_email(): void
	{
		$this->post('/login', [
			'login' => $this->user->email,
			'password' => 'password',
		]);

		$this->assertAuthenticatedAs($this->user);
	}

	/**
	 * Test that a user can authenticate using their username.
	 *
	 * This test sends a POST request to the login route with the user's username
	 * and password, and asserts that the user is successfully authenticated.
	 */
	public function test_user_can_authenticate_using_username(): void
	{
		$this->post('/login', [
			'login' => $this->user->username,
			'password' => 'password',
		]);

		$this->assertAuthenticatedAs($this->user);
	}

	/**
	 * Test that a user cannot authenticate using an invalid password.
	 *
	 * This test sends a POST request to the login route with the user's email
	 * and an invalid password, and asserts that the user is not authenticated.
	 */
	public function test_users_can_not_authenticate_with_invalid_password(): void
	{
		$this->post('/login', [
			'login' => $this->user->email,
			'password' => 'wrong-password',
		]);

		$this->assertGuest();
	}

	/**
	 * Test that a user cannot authenticate using an invalid email.
	 *
	 * This test sends a POST request to the login route with the user's email
	 * and an invalid email, and asserts that the user is not authenticated.
	 */
	public function test_users_can_not_authenticate_with_invalid_email(): void
	{
		$this->post('/login', [
			'login' => 'wrong-email@example.com',
			'password' => 'password',
		]);

		$this->assertGuest();
	}

	/**
	 * Test that a user cannot authenticate using an invalid username.
	 *
	 * This test sends a POST request to the login route with the user's email
	 * and an invalid username, and asserts that the user is not authenticated.
	 */
	public function test_users_can_not_authenticate_with_invalid_username(): void
	{
		$this->post('/login', [
			'login' => 'wrong-username',
			'password' => 'password',
		]);

		$this->assertGuest();
	}

	/**
	 * Test that after a successful login, the user is redirected to the dashboard.
	 *
	 * This test sends a POST request to the login route with the user's email
	 * and password, and asserts that the response redirects to the dashboard.
	 */
	public function test_after_login_the_user_is_redirected_to_the_dashboard(): void
	{
		$response = $this->post('/login', [
			'login' => $this->user->email,
			'password' => 'password',
		]);

		$response->assertRedirect('/dashboard');
	}

	/**
	 * Test that a user can logout.
	 *
	 * This test sends a POST request to the logout route, and asserts that
	 * the user is no longer authenticated and that the response redirects
	 * to the homepage.
	 */
	public function test_users_can_logout(): void
	{
		$response = $this->actingAs($this->user)->post('/logout');

		$this->assertFalse(Auth::check());
		$response->assertRedirect('/');
	}
}
