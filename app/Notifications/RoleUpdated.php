<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Spatie\Permission\Models\Role;
use App\Models\NotificationTemplate;
use App\Models\EmailTemplate;
use App\Traits\NotificationTrait;

class RoleUpdated extends Notification implements ShouldQueue
{
	use Queueable, NotificationTrait;

	/**
	 * Create a new notification instance.
	 */
	public function __construct(
		private readonly Role $role
	) {
		//
	}

	/**
	 * Get the notification's delivery channels.
	 *
	 * @return array<int, string>
	 */
	public function via(object $notifiable): array
	{
		return [
			'mail',
			'database',
			'broadcast'
		];
	}

	/**
	 * Get the mail representation of the notification.
	 */
	public function toMail(object $notifiable): MailMessage
	{
		$template = EmailTemplate::where('type', $this->getNameSpaceAndFileName())->first();

		return (new MailMessage)
			->subject($this->replaceShortcodes($template->subject, 'role.', $this->role) ?? 'Role updated')
			->markdown('mail::message', [
				'content' => $this->replaceShortcodes($template->body, 'role.', $this->role) ?? '',
				'slot' => ''
			]);
	}

	/**
	 * Get the array representation of the notification.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(object $notifiable): array
	{
		$template = NotificationTemplate::where('type', $this->getNameSpaceAndFileName())->firstOrFail();

		return [
			'title' => $this->replaceShortcodes($template->title, 'role.', $this->role) ?? 'Role updated',
			'content' => $this->replaceShortcodes($template->content, 'role.', $this->role) ?? 'The role <strong>' . $this->role->name . '</strong> has been updated.'
		];
	}
}
