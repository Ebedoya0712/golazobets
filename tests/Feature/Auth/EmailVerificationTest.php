<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Database\Factories\AccountFactory;

class EmailVerificationTest extends TestCase
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
	 * Test that the email verification screen can be rendered.
	 *
	 * This test sends a GET request to the email verification route as an authenticated user
	 * and asserts that the response status is 200, indicating that the page is successfully accessible.
	 */
	public function test_email_verification_screen_can_be_rendered(): void
	{
		$response = $this->actingAs($this->user)->get(route('verification.notice'));

		$response->assertStatus(200);
	}

	/**
	 * Test that a user can verify their email address.
	 *
	 * This test generates a signed URL for the email verification route and sends a GET request to it
	 * as an authenticated user. It asserts that the user's email address is verified and that the
	 * user is redirected to the dashboard page with a verified=1 query parameter.
	 */
	public function test_email_can_be_verified(): void
	{
		Event::fake();

		$verificationUrl = URL::temporarySignedRoute(
			'verification.verify',
			now()->addMinutes(60),
			['id' => $this->user->id, 'hash' => sha1($this->user->email)]
		);

		$response = $this->actingAs($this->user)->get($verificationUrl);

		Event::assertDispatched(Verified::class);
		$this->assertTrue($this->user->fresh()->hasVerifiedEmail());
		$response->assertRedirect(route('dashboard', absolute: false) . '?verified=1');
	}

	/**
	 * Test that the email verification fails with an invalid hash.
	 *
	 * This test sends a GET request to the email verification route with an invalid hash
	 * and asserts that the user's email address is not verified.
	 */
	public function test_email_is_not_verified_with_invalid_hash(): void
	{
		$verificationUrl = URL::temporarySignedRoute(
			'verification.verify',
			now()->addMinutes(60),
			['id' => $this->user->id, 'hash' => sha1('wrong-email')]
		);

		$this->actingAs($this->user)->get($verificationUrl);

		$this->assertFalse($this->user->fresh()->hasVerifiedEmail());
	}
}
