<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EmailTemplate;
use App\Traits\NotificationShortcodeTrait;

class EmailTemplateSeeder extends Seeder
{

	use NotificationShortcodeTrait;

	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{

		$userShortcodes = array_merge([
			'[app.name]' => "Application name"
		], $this->userShortcodes());

		$roleShortcodes = array_merge([
			'[app.name]' => "Application name"
		], $this->roleShortcodes());

		$permissionShortcodes = array_merge([
			'[app.name]' => "Application name"
		], $this->permissionShortcodes());



		// Role created
		EmailTemplate::create([
			'name' => 'Notify admins when a ROLE is created',
			'subject' => '[app.name] - New role created',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
				<p>I wanted to let you know that a new <strong>Role</strong> has been created.</p>
				<p>• Role Name: <strong>[role.name]</strong></p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => 'mail.role',
			'type' => 'App\Notifications\RoleCreated',
			'shortcodes' => json_encode($roleShortcodes, true)
		]);


		// Role updated
		EmailTemplate::create([
			'name' => 'Notify admins when a ROLE is updated',
			'subject' => '[app.name] - Role updated',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
				<p>I wanted to give you a heads-up that a <strong>Role</strong> has been updated.</p>
				<p>• Role Name: <strong>[role.name]</strong></p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => 'mail.role',
			'type' => 'App\Notifications\RoleUpdated',
			'shortcodes' => json_encode($roleShortcodes, true)
		]);


		// Permission created
		EmailTemplate::create([
			'name' => 'Notify admins when a PERMISSION is created',
			'subject' => '[app.name] - New permission created',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
				<p>I wanted to let you know that a new <strong>Permission</strong> has been created.</p>
				<p>• Permission Name: <strong>[permission.name]</strong></p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => 'mail.permission',
			'type' => 'App\Notifications\PermissionCreated',
			'shortcodes' => json_encode($permissionShortcodes, true)
		]);


		// Permission updated
		EmailTemplate::create([
			'name' => 'Notify admins when a PERMISSION is updated',
			'subject' => '[app.name] - Permission updated',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
				<p>I wanted to give you a heads-up that a <strong>Permission</strong> has been updated.</p>
				<p>• Permission Name: <strong>[permission.name]</strong></p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => 'mail.permission',
			'type' => 'App\Notifications\PermissionUpdated',
			'shortcodes' => json_encode($permissionShortcodes, true)
		]);


		// User created
		EmailTemplate::create([
			'name' => 'Notify admins when a USER is created',
			'subject' => '[app.name] - New user created',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
				<p>I wanted to let you know that a new <strong>User</strong> has been created.</p>
				<p>• Full Name: <strong>[user.name] [user.lastname]</strong></p>
				<p>• Username: <strong>[user.username]</strong></p>
				<p>• Email: <strong>[user.email]</strong></p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => 'mail.user',
			'type' => 'App\Notifications\UserCreated',
			'shortcodes' => json_encode($userShortcodes, true)
		]);


		// User updated
		EmailTemplate::create([
			'name' => 'Notify admins when a USER is updated',
			'subject' => '[app.name] - User updated',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
				<p>I wanted to let you know that a new <strong>User</strong> has been updated.</p>
				<p>• Full Name: <strong>[user.name] [user.lastname]</strong></p>
				<p>• Username: <strong>[user.username]</strong></p>
				<p>• Email: <strong>[user.email]</strong></p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => 'mail.user',
			'type' => 'App\Notifications\UserUpdated',
			'shortcodes' => json_encode($userShortcodes, true)
		]);


		// A new user registers
		EmailTemplate::create([
			'name' => 'Notify admins when a new USER registers',
			'subject' => '[app.name] - New user registered',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
				<p>A new <strong>User</strong> has registered on <strong>[app.name]</strong>. Here are the details:</p>
				<p></p>
				<p>• Username: <strong>[user.username]</strong></p>
				<p>• Email: <strong>[user.email]</strong></p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => 'mail.new-user-registered',
			'type' => 'App\Notifications\NewUserRegisteredNotification',
			'shortcodes' => json_encode($userShortcodes, true)
		]);


		// Send account details to USER when a new USER is created
		EmailTemplate::create([
			'name' => 'Send account details to USER when a new USER is created',
			'subject' => '[app.name] - Your account details',
			'body' => "
				<p>Welcome, [user.name]</p>
				<p></p>
				<p>
					Your account has been created.
					<br/>Here are your login details:
				</p>
				<p></p>
				<p>Username: <strong>[user.username]</strong></p>
				<p>Email: <strong>[user.email]</strong></p>
				<p>Password: <strong>[user.password]</strong></p>
				<p></p>
				<p>Please keep this information secure.</p>
				<p>For your own security, please change your password immediately after logging in.</p>
				<p></p>
				<p>Best regards</p>
			",
			'view' => '',
			'type' => 'App\Notifications\SendUserDetailsOnCreateUserNotification',
			'shortcodes' => json_encode($userShortcodes, true)
		]);


		// Send account details to USER when a USER is updated
		EmailTemplate::create([
			'name' => 'User details on update',
			'subject' => '[app.name] - Your Account has been updated',
			'body' => "
				<p>Hello, [user.name]</p>
				<p></p>
				<p>
					Your account has been updated.
					<br/>Here are the details:
				</p>
				<p></p>
				<p>Username: <strong>[user.username]</strong></p>
				<p>Full name: <strong>[user.name] [user.lastname]</strong></p>
				<p>Email: <strong>[user.email]</strong></p>
				<p></p>
				<p>Birth date: <strong>[user.birth_date]</strong></p>
				<p></p>
				<p>Phone: <strong>[user.phone]</strong></p>
				<p>Address: <strong>[user.address]</strong></p>
				<p></p>
				<p>Company: <strong>[user.company]</strong></p>
				<p>Job title: <strong>[user.address], [user.city], [user.country]</strong></p>
				<p></p>
				<p>Company: <strong>[user.company]</strong></p>
				<p>Job title: <strong>[user.job_title]</strong></p>
				<p></p>
				<p>Please keep this information secure.</p>
			",
			'view' => '',
			'type' => 'App\Notifications\SendUserDetailsOnUpdateUserNotification',
			'shortcodes' => json_encode($userShortcodes, true)
		]);


		// Email address verification
		EmailTemplate::create([
			'name' => 'Verification email for a registered USER',
			'subject' => '[app.name] - Verify your email address',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
        <p>Please use the link below to verify your email address.</p>
				<p></p>
				<p>
					<a target='_blank' rel='noopener noreferrer nofollow' href='[url]'>[url]</a>
				</p>
				<p></p>
        <p>If you did not create an account, no further action is required.</p>
				<p></p>
        <p>Best regards</p>
			",
			'view' => 'mail.verify-email',
			'type' => 'App\Notifications\EmailVerificationNotification',
			'shortcodes' => json_encode([
				'[url]' => "The url for email verification"
			], true)
		]);


		// Reset password notification
		EmailTemplate::create([
			'name' => 'Request for password reset by USER',
			'subject' => 'Reset Your Password',
			'body' => "
				<p><strong>Hello!</strong></p>
				<p></p>
        <p>You are receiving this email because we received a password reset request for your account.</p>
				<p></p>
				<p>
					<a target='_blank' rel='noopener noreferrer nofollow' href='[url]'>[url]</a>
				</p>
				<p></p>
        <p>This password reset link will expire in 60 minutes.</p>
        <p>If you did not request a password reset, no further action is required.</p>
				<p></p>
        <p>Best regards</p>
			",
			'view' => 'mail.reset-password',
			'type' => 'App\Notifications\ResetPasswordNotification',
			'shortcodes' => json_encode([
				'[url]' => "The url for password reset"
			], true)
		]);
	}
}
