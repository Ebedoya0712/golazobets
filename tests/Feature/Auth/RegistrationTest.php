<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Illuminate\Auth\Notifications\VerifyEmail;
use App\Notifications\NewUserRegisteredNotification;
use Database\Factories\AccountFactory;

class RegistrationTest extends TestCase
{
	use RefreshDatabase;
	protected $superadmin;

	/**
	 * Set up the test environment
	 *
	 * Create a user with roles and permissions
	 */
	protected function setUp(): void
	{
		parent::setUp();

		// Create roles and permissions
		Role::create(['name' => 'User']);

		// Create a user with roles and permissions
		$this->superadmin = User::factory()->create();
		Role::create(['name' => 'Super Admin']);
		AccountFactory::new()->create(['user_id' => $this->superadmin->id]);

		$this->superadmin->assignRole('Super Admin');
	}

	/**
	 * Test that the registration screen can be rendered.
	 *
	 * This test sends a GET request to the registration route and asserts
	 * that the response status is 200, indicating that the registration
	 * page is successfully accessible.
	 */
	public function test_registration_screen_can_be_rendered(): void
	{
		$response = $this->get(route('register'));

		$response->assertStatus(200);
	}

	/**
	 * Test that new users can register.
	 *
	 * This test sends a POST request to the registration route with a valid
	 * username, email, password and password confirmation. After the request is
	 * sent, it asserts that the new user is authenticated with the correct
	 * email address and that the response redirects to the dashboard.
	 */
	public function test_new_users_can_register(): void
	{
		$response = $this->post(route('register'), [
			'username' => 'testuser',
			'email' => 'test@example.com',
			'password' => 'password',
			'password_confirmation' => 'password',
		]);

		$user = User::where('email', 'test@example.com')->first();
		$user->markEmailAsVerified();

		$this->assertAuthenticatedAs($user);
		$response->assertRedirect(route('dashboard'));
	}

	/**
	 * Test that new users receive a verification email upon registration.
	 *
	 * This test fakes notifications and sends a POST request to the registration route
	 * with valid user details. It asserts that the user is authenticated and verifies
	 * that a VerifyEmail notification is sent to the newly registered user.
	 */
	public function test_new_users_must_receive_a_verification_email(): void
	{
		Notification::fake();

		$this->post(route('register'), [
			'username' => 'testuser',
			'email' => 'test@example.com',
			'password' => 'password',
			'password_confirmation' => 'password',
		]);

		$this->assertAuthenticated();

		$user = User::where('email', 'test@example.com')->first();
		Notification::assertSentTo($user, VerifyEmail::class);
	}


	/**
	 * Test that the user with the 'Super Admin' role receives a NewUserRegisteredNotification
	 * when a new user registers.
	 *
	 * This test sends a POST request to the registration route with valid user details,
	 * and asserts that a NewUserRegisteredNotification is sent to the 'Super Admin' user.
	 *
	 * @return void
	 */
	public function test_super_admin_must_receive_a_notification_email_when_registering_a_new_user(): void
	{
		config(['broadcasting.default' => 'null']);
		config(['new_user_superadmin_notification' => true]);

		Notification::fake();

		$this->post(route('register'), [
			'username' => 'testuser',
			'email' => 'test@example.com',
			'password' => 'password',
			'password_confirmation' => 'password',
		]);

		$this->assertAuthenticated();

		Notification::assertSentTo($this->superadmin, NewUserRegisteredNotification::class);
	}
}
