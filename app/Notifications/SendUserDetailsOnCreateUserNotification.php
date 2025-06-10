<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use App\Models\NotificationTemplate;
use App\Models\EmailTemplate;
use App\Traits\NotificationTrait;

class SendUserDetailsOnCreateUserNotification extends Notification implements ShouldQueue
{
	use Queueable, NotificationTrait;

	/**
	 * Create a new notification instance.
	 */
	public function __construct(
		private readonly User $user,
		private readonly string $password
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
		return ['mail', 'broadcast'];
	}

	/**
	 * Get the mail representation of the notification.
	 */
	public function toMail(object $notifiable): MailMessage
	{
		$template = EmailTemplate::where('type', $this->getNameSpaceAndFileName())->first();

		if (str_contains($template->body, '[user.password]')) {
			$template->body = str_replace('[user.password]', $this->password, $template->body);
		}

		return (new MailMessage)
			->subject($this->replaceShortcodes($template->subject, 'user.', $this->user) ?? 'Your Account has been updated')
			->markdown('mail::message', [
				'content' => $this->replaceShortcodes($template->body, 'user.', $this->user) ?? '',
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
		return [
			//
		];
	}
}
