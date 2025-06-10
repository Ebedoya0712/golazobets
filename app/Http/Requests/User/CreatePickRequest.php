<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Picks\BetType;
use App\Enums\Picks\SubType;

class CreatePickRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		// Only if the user is a tipster
		return $this->user()->hasRole('Tipster');
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
			'bookie_id' => ['required', 'integer', 'exists:bookies,id'],
			'bet_type' => ['required', 'string', 'in:' . implode(',', array_column(BetType::cases(), 'value'))],
			'sub_type' => ['required', 'string', 'in:' . implode(',', array_column(SubType::cases(), 'value'))],
			'competition' => ['required', 'string'],
			'event' => ['required', 'string'],
			'pick' => ['required', 'string'],
			'stake' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
			'odds' => ['required', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
			'event_date' => ['required', 'date', 'after_or_equal:today'],
			'screenshot' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
		];
	}
}
