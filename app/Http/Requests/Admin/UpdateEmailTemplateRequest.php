<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmailTemplateRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{

		return [
			'subject' => 'required|string|max:255',
			'body' => 'required|string',
		];
	}

	
	/**
	 * Get the validation messages that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function messages(): array
	{
		return [
			'subject.required' => 'The subject is required.',
			'subject.max' => 'The subject must not be greater than :max characters.',
			'body.required' => 'Te body is required.',
		];
	}
}
