<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTipsterRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		if ($this->user()->hasRole('Super Admin') || $this->user()->can('Can update tipsters')) {
			return true;
		}

		return false;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'sport_id' => ['required', 'integer', 'exists:sports,id'],
			'type' => ['required', 'in:free,premium'],
		];
	}
}
