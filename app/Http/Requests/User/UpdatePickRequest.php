<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Picks\Status;

class UpdatePickRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{

		// if ($this->user()->can('Can update picks')) {
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
		return [
			'status' => ['required', 'string', 'in:' . implode(',', array_column(Status::cases(), 'value'))],
		];
	}
}
