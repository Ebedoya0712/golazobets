<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
	use RefreshDatabase;

	/**
	 * @test
	 * @coversNothing
	 */
	/*
	 * Test that the reset password link screen can be rendered.
	 *
	 * This test sends a GET request to the forgot password route and asserts
	 * that the response status is 200, indicating that the reset password link
	 * page is successfully accessible.
	 */
	public function test_reset_password_link_screen_can_be_rendered(): void
	{
		$response = $this->get('/forgot-password');

		$response->assertStatus(200);
	}

	/**
	 * Test that a reset password link can be requested.
	 *
	 * This test creates a user and sends a POST request to the forgot password route with the user's email.
	 * It then asserts that a ResetPassword notification is sent to the user, indicating that the reset password
	 * link has been successfully requested.
	 */
	public function test_reset_password_link_can_be_requested(): void
	{
		Notification::fake();

		$user = User::factory()->create();

		$this->post('/forgot-password', ['email' => $user->email]);

		Notification::assertSentTo($user, ResetPassword::class);
	}

	/**
	 * Test that the reset password screen can be rendered.
	 *
	 * This test creates a user, requests a password reset, and then asserts that the
	 * reset password screen can be rendered successfully.
	 */
	public function test_reset_password_screen_can_be_rendered(): void
	{
		Notification::fake();

		$user = User::factory()->create();

		$this->post('/forgot-password', ['email' => $user->email]);

		Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
			$response = $this->get('/reset-password/' . $notification->token);

			$response->assertStatus(200);

			return true;
		});
	}

	/**
	 * Test that a password can be reset with a valid token.
	 *
	 * This test creates a user, requests a password reset, and sends a POST
	 * request to the reset password route with the valid token, email, and
	 * new password. It asserts that there are no errors in the session and
	 * that the user is redirected to the login page, indicating that the 
	 * password has been successfully reset.
	 */
	public function test_password_can_be_reset_with_valid_token(): void
	{
		Notification::fake();

		$user = User::factory()->create();

		$this->post('/forgot-password', ['email' => $user->email]);

		Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
			$response = $this->post('/reset-password', [
				'token' => $notification->token,
				'email' => $user->email,
				'password' => 'password',
				'password_confirmation' => 'password',
			]);

			$response
				->assertSessionHasNoErrors()
				->assertRedirect(route('login'));

			return true;
		});
	}
}
