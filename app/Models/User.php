<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Lab404\Impersonate\Models\Impersonate;
use App\Notifications\ResetPasswordNotification;
use App\Notifications\EmailVerificationNotification;
use App\Data\AccountData;
use Illuminate\Support\Facades\URL;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Cashier\Billable;

class User extends Authenticatable implements MustVerifyEmail, HasMedia
{
	use HasFactory;
	use Notifiable;
	use HasRoles;
	use Impersonate;
	use InteractsWithMedia;
	use Billable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		// Basic information
		'name',
		'lastname',
		'username',
		'email',
		'password',
		'country',

		// Preferences
		'profile_picture',
		'status',
	];


	protected $hidden = [
		'password',
		'remember_token',
	];


	/**
	 * The attributes that should be cast to native types.
	 *
	 * @return array
	 */
	protected function casts(): array
	{
		return [
			'email_verified_at' => 'datetime',
			'password' => 'hashed',
		];
	}

	/**
	 * Get the sessions associated with the user.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function sessions()
	{
		return $this->hasMany(Session::class);
	}

	/**
	 * Determine if the user can impersonate other users.
	 *
	 * @return bool True if the user has impersonation rights, false otherwise.
	 */
	public function canImpersonate(): bool
	{
		if (config('settings.general.admin_can_impersonate')) {
			return $this->hasRole(['Admin', 'Super Admin']);
		} else {
			return $this->hasRole('Super Admin');
		}
	}

	/**
	 * Get the account associated with the user.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function account()
	{
		return $this->hasOne(Account::class);
	}


	/**
	 * Get the user's roles.
	 *
	 * @return array An array of the user's roles.
	 */
	public function getRoles(): array
	{
		return $this->roles->map(fn($role) => ['id' => $role->id, 'name' => $role->name])->toArray();
	}


	/**
	 * Get the user's account data.
	 *
	 * @return \App\Data\AccountData The user's account data.
	 */
	public function getAccount(): AccountData
	{
		return AccountData::from($this->account->toArray());
	}


	/**
	 * Send a password reset notification to the user.
	 *
	 * @param  string  $token
	 */
	public function sendPasswordResetNotification($token): void
	{
		$base_url = rtrim(config('app.url'), '/');
		$url = "$base_url/reset-password/$token";

		$this->notify(new ResetPasswordNotification($url));
	}



	/**
	 * Generate a signed URL for the user to verify their email address.
	 *
	 * The generated URL is a temporary signed route that is only valid for the
	 * specified duration defined in the authentication configuration. The URL
	 * contains the user's ID and a hash of their email address.
	 *
	 * @return string The signed URL used to verify the user's email address.
	 */
	private function generateVerificationUrl(): string
	{
		return URL::temporarySignedRoute(
			'verification.verify',
			now()->addMinutes(config('auth.verification.expire', 60)),
			['id' => $this->getKey(), 'hash' => sha1($this->getEmailForVerification())]
		);
	}


	/**
	 * Send the email verification notification.
	 *
	 * This method generates a signed URL containing the user's ID and
	 * a hash of their email address. The URL is then used to verify the
	 * user's email address and is only valid for the specified duration
	 * defined in the authentication configuration.
	 */
	public function sendEmailVerificationNotification()
	{
		$url = $this->generateVerificationUrl();
		$this->notify(new EmailVerificationNotification($url));
	}


	/**
	 * Register media collections for the user.
	 *
	 * This method defines two media collections: 'images' and 'files'.
	 * These collections can be used to organize and store media files
	 * associated with the user.
	 */

	public function registerMediaCollections(): void
	{
		$this->addMediaCollection('images');
		$this->addMediaCollection('files');
	}


	/**
	 * Register media conversions for the user.
	 *
	 * This method adds a 'preview' media conversion that fits the media
	 * within a 300x300 dimension while maintaining the aspect ratio.
	 * The conversion is set to be non-queued.
	 *
	 * @param \Spatie\MediaLibrary\MediaCollections\Models\Media|null $media
	 */

	public function registerMediaConversions(?Media $media = null): void
	{
		$this
			->addMediaConversion('webp')
			->format('webp')
			->performOnCollections('images')
			->nonQueued();

		$this
			->addMediaConversion('preview')
			->format('webp')
			->performOnCollections('images')
			->fit(Fit::Contain, 300, 300)
			->nonQueued();
	}



	/**
	 * Get the tipster that owns the User
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function tipster(): HasOne
	{
		return $this->hasOne(Tipster::class);
	}


	/**
	 * Get all of the subscriptions for the User
	 */
	public function subscriptions(): HasMany
	{
		return $this->hasMany(Subscription::class)
			->where('ends_at', NULL)
			->whereNot('stripe_status', 'canceled');
	}
}
