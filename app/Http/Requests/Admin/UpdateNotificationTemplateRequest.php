<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotificationTemplateRequest extends FormRequest
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
			'title' => 'required|string|max:255',
			'content' => 'required',
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
			'title.required' => 'The :attribute field is required.',
			'title.max' => 'The :attribute must not be greater than :max characters.',
			'content.required' => 'The :attribute field is required.',
		];
	}
}
