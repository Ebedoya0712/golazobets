<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Spatie\Permission\Models\Permission;
use App\Models\NotificationTemplate;
use App\Models\EmailTemplate;
use App\Traits\NotificationTrait;

class PermissionCreated extends Notification implements ShouldQueue
{
	use Queueable, NotificationTrait;

	/**
	 * Create a new notification instance.
	 */
	public function __construct(
		private readonly Permission $permission
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
			->subject($this->replaceShortcodes($template->subject, 'permission.', $this->permission) ?? 'Permission created')
			->markdown('mail::message', [
				'content' => $this->replaceShortcodes($template->body, 'permission.', $this->permission) ?? '',
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
		$template = NotificationTemplate::where('type', $this->getNameSpaceAndFileName())->first();

		return [
			'title' => $this->replaceShortcodes($template->title ?? '', 'permission.', $this->permission) ?? 'Permission created',
			'content' => $this->replaceShortcodes($template->content ?? '', 'permission.', $this->permission) ?? 'A new permission has been created.'
		];
	}
}
