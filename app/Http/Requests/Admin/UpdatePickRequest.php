<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

use App\Enums\Picks\BetType;
use App\Enums\Picks\SubType;

class UpdatePickRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		if ($this->user()->hasRole('Super Admin') || $this->user()->can('Can update picks')) {
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

		$validate_fields = [
			'sport_id' => ['required', 'integer', 'exists:sports,id'],
			'bookie_id' => ['required', 'integer', 'exists:bookies,id'],
			'bet_type' => ['required', 'string', 'in:' . implode(',', array_column(BetType::cases(), 'value'))],
			'sub_type' => ['required', 'string', 'in:' . implode(',', array_column(SubType::cases(), 'value'))],
			'competition' => ['required', 'string'],
			'event' => ['required', 'string'],
			'pick' => ['required', 'string'],
			'stake' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
			'odds' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
			'event_date' => ['required', 'date'],
			// 'screenshot_path' => ['required_without:screenshot', 'string'],
			// 'screenshot' => ['required_without:screenshot_path', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048']
		];

		if ($this->screenshot_path) {
			$validate_fields['screenshot_path'] = ['required', 'string'];
		} else {
			$validate_fields['screenshot'] = ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'];
		}

		return $validate_fields;
	}
}
