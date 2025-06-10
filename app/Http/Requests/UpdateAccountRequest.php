<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		// if ($this->user()->hasAnyRole(['Tipster', 'User', 'Admin'])) {
		// 	return true;
		// }
		return $this->user()->hasRole('Tipster');
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{

		$max_length = config('settings.general.max_characters_for_wysiwyg');

		$request = [];

		if ($this->form_type === 'tipster_information') {
			$request = array_merge($request, [
				'sport_id' => 'integer|exists:sports,id',
				'bio' => "string|max:$max_length",
				'description_service' => "string|max:$max_length",
				'description_market' => "string|max:$max_length",
				'description_picks' => "string|max:$max_length",
				'publishing_time' => "string|max:$max_length",
				'stake_preference' => "string|max:$max_length",
			]);
		}

		if ($this->form_type === 'social_media') {
			$rule = 'nullable|string|max:100|regex:/^[a-zA-Z0-9_]+$/';

			$request = array_merge($request, [
				'telegram_user' => $rule,
				'x_user' => $rule,
				'facebook_user' => $rule,
				'instagram_user' => $rule,
			]);
		}

		return $request;
	}


	protected function prepareForValidation()
	{
		$allowed_tags = '<p><br><strong><em><ul><li><ol><h1><h2><h3><h4><h5><h6>';

		$this->merge([
			'sport_id' => $this->sport_id,
			'bio' => strip_tags(trim($this->bio ?? ''), $allowed_tags),
			'description_service' => strip_tags(trim($this->description_service ?? ''), $allowed_tags),
			'description_market' => strip_tags(trim($this->description_market ?? ''), $allowed_tags),
			'description_picks' => strip_tags(trim($this->description_picks ?? ''), $allowed_tags),
			'publishing_time' => strip_tags(trim($this->publishing_time ?? ''), $allowed_tags),
			'stake_preference' => strip_tags(trim($this->stake_preference ?? ''), $allowed_tags),

			'telegram_user' => trim($this->telegram_user ?? ''),
			'x_user' => trim($this->x_user ?? ''),
			'facebook_user' => trim($this->facebook_user ?? ''),
			'instagram_user' => trim($this->instagram_user ?? ''),
		]);
	}


	public function messages(): array
	{
		return [
			'sport_id.required' => 'El deporte es requerido',
			'bio.max' => 'La biografía no puede tener más de :max caracteres',
			'description_service.max' => 'La descripción del servicio no puede tener más de :max caracteres',
			'description_market.max' => 'La descripción del mercado no puede tener más de :max caracteres',
			'description_picks.max' => 'La descripción de las selecciones no puede tener más de :max caracteres',
			'publishing_time.max' => 'El tiempo de publicación no puede tener más de :max caracteres',
			'stake_preference.max' => 'La preferencia de apuesta no puede tener más de :max caracteres',

			// Social media
			'telegram_user.regex' => 'El nombre de usuario de Telegram solo puede contener letras, números y guiones bajos.',
			'x_user.regex' => 'El nombre de usuario de X solo puede contener letras, números y guiones bajos.',
			'facebook_user.regex' => 'El nombre de usuario de Facebook solo puede contener letras, números y guiones bajos.',
			'instagram_user.regex' => 'El nombre de usuario de Instagram solo puede contener letras, números y guiones bajos.',
		];
	}
}
