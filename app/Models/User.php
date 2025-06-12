<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

class User extends Authenticatable implements MustVerifyEmail, HasMedia, CanResetPassword
{
    use HasFactory, Notifiable, HasRoles, Impersonate, InteractsWithMedia, Billable, CanResetPasswordTrait;

    protected $fillable = [
        'name',
        'lastname',
        'username',
        'email',
        'password',
        'country',
        'profile_picture',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }

    public function canImpersonate(): bool
    {
        if (config('settings.general.admin_can_impersonate')) {
            return $this->hasRole(['Admin', 'Super Admin']);
        } else {
            return $this->hasRole('Super Admin');
        }
    }

    public function account(): HasOne
    {
        return $this->hasOne(Account::class);
    }

    public function getRoles(): array
    {
        return $this->roles->map(fn($role) => ['id' => $role->id, 'name' => $role->name])->toArray();
    }

    public function getAccount(): AccountData
    {
        return AccountData::from($this->account->toArray());
    }

    public function sendPasswordResetNotification($token): void
    {
        $base_url = rtrim(config('app.url'), '/');
        $url = "$base_url/reset-password/$token";

        $this->notify(new ResetPasswordNotification($url));
    }

    private function generateVerificationUrl(): string
    {
        return URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(config('auth.verification.expire', 60)),
            ['id' => $this->getKey(), 'hash' => sha1($this->getEmailForVerification())]
        );
    }

    public function sendEmailVerificationNotification()
    {
        $url = $this->generateVerificationUrl();
        $this->notify(new EmailVerificationNotification($url));
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
        $this->addMediaCollection('files');
    }

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

    public function tipster(): HasOne
    {
        return $this->hasOne(Tipster::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class)
            ->whereNull('ends_at')
            ->where('stripe_status', '!=', 'canceled');
    }
}
