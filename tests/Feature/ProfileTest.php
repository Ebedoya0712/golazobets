<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Database\Factories\AccountFactory;
use Illuminate\Support\Facades\Notification;

class ProfileTest extends TestCase
{
	use RefreshDatabase;

	protected $user;

	protected function setUp(): void
	{
		parent::setUp();

		// Create a user with roles and permissions
		$this->user = User::factory()->create();
		Role::create(['name' => 'User']);
		$this->user->assignRole('User');
		AccountFactory::new()->create(['user_id' => $this->user->id]);
	}

	/**
	 * Test that the profile page is displayed when a user visits it.
	 *
	 * This test sends a GET request to the profile edit route and asserts that
	 * the response status is 200, indicating that the profile page is
	 * successfully displayed.
	 *
	 * @return void
	 */
	public function test_profile_page_is_displayed(): void
	{
		$response = $this
			->actingAs($this->user)
			->get(route('profile.edit'));

		$response->assertOk();
	}

	/**
	 * Test that the profile information can be updated.
	 *
	 * This test logs in a user and sends a PATCH request to the profile update route
	 * with new user information. It asserts that there are no errors in the session
	 * and that the user's profile information is successfully updated in the database.
	 * Additionally, it verifies that the user's email verification status is reset.
	 *
	 * @return void
	 */
	public function test_profile_information_can_be_updated(): void
	{

		$newUserInformation = (object) [
			'username' => 'testuser',
			'name' => 'Test User',
			'lastname' => 'Test Lastname',
			'email' => 'test@example.com',
			'phone' => '1122334455',
			'birth_date' => '2000-01-01',
			'address' => 'Test Address',
			'city' => 'Test City',
			'country' => 'Test Country',
			'zip' => '12345',
		];

		$response = $this
			->actingAs($this->user)
			->patch(route('profile.update'), [
				'username' => $newUserInformation->username,
				'name' => $newUserInformation->name,
				'lastname' => $newUserInformation->lastname,
				'email' => $newUserInformation->email,
				'phone' => $newUserInformation->phone,
				'birth_date' => $newUserInformation->birth_date,
				'address' => $newUserInformation->address,
				'city' => $newUserInformation->city,
				'country' => $newUserInformation->country,
				'zip' => $newUserInformation->zip,
				'basic_information' => 1
			]);

		$response->assertSessionHasNoErrors();

		$this->user->refresh();

		$this->assertSame($newUserInformation->username, $this->user->username);
		$this->assertSame($newUserInformation->name, $this->user->name);
		$this->assertSame($newUserInformation->lastname, $this->user->lastname);
		$this->assertSame($newUserInformation->email, $this->user->email);
		$this->assertSame($newUserInformation->phone, $this->user->phone);
		$this->assertSame($newUserInformation->birth_date, $this->user->birth_date);
		$this->assertSame($newUserInformation->address, $this->user->address);
		$this->assertSame($newUserInformation->city, $this->user->city);
		$this->assertSame($newUserInformation->country, $this->user->country);
		$this->assertSame($newUserInformation->zip, $this->user->zip);

		$this->assertNull($this->user->email_verified_at);
	}

	/**
	 * Test that a user can delete their account.
	 *
	 * This test logs in a user and sends a DELETE request to the profile deletion route
	 * with the correct password. It asserts that there are no errors in the session,
	 * that the user is redirected to the home page, and that the user is logged out
	 * and their account is deleted from the database.
	 */
	public function test_user_can_delete_their_account(): void
	{
		$response = $this
			->actingAs($this->user)
			->delete('/profile', [
				'password' => 'password',
			]);

		$response
			->assertSessionHasNoErrors()
			->assertRedirect('/');

		$this->assertGuest();
		$this->assertNull($this->user->fresh());
	}

	/**
	 * Test that the correct password must be provided to delete the user's account.
	 *
	 * This test logs in a user and sends a DELETE request to the profile deletion route
	 * with an incorrect current password. It asserts that the response contains an error
	 * for the 'password' field and redirects back to the profile page. Additionally, it
	 * verifies that the user is still logged in and their account is not deleted from the
	 * database.
	 *
	 * @return void
	 */
	public function test_correct_password_must_be_provided_to_delete_account(): void
	{
		$response = $this
			->actingAs($this->user)
			->from('/profile')
			->delete('/profile', [
				'password' => 'wrong-password',
			]);

		$response
			->assertSessionHasErrors('password')
			->assertRedirect('/profile');

		$this->assertNotNull($this->user->fresh());
	}
}
