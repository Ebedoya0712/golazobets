<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
	 */
	public function rules(): array
	{
		$rules = [
			// Professional information
			'job_title' => 'nullable|string|max:255',
			'company' => 'nullable|string|max:255',
			'bio' => 'nullable|string|max:1000',
			'phone' => 'nullable|string|max:20',
			'birth_date' => 'nullable|date',
			'address' => 'nullable|string|max:255',
			'city' => 'nullable|string|max:255',
			'country' => 'nullable|string|max:255',
			'zip' => 'nullable|string|max:10',

			// Preferences and settings
			'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
		];

		if ($this->has('basic_information')) {
			// Basic information
			$rules['name'] = 'required|string|max:255';
			$rules['lastname'] = 'required|string|max:255';
			$rules['username'] = 'required|string|max:255|unique:users,username,' . $this->id;
			$rules['email'] = 'required|email|lowercase|unique:users,email,' . $this->id;
		}

		return $rules;
	}

	public function messages(): array
	{
		return [
			// Basic information
			'name.required' => 'Name is required',
			'name.string' => 'Name must be a string',
			'name.max' => 'Name must not exceed 255 characters',
			'lastname.required' => 'Lastname is required',
			'lastname.string' => 'Lastname must be a string',
			'lastname.max' => 'Lastname must not exceed 255 characters',
			'username.required' => 'Username is required',
			'username.string' => 'Username must be a string',
			'username.max' => 'Username must not exceed 255 characters',
			'username.unique' => 'Username already exists',
			'email.required' => 'Email is required',
			'email.email' => 'Email must be a valid email address',
			'email.lowercase' => 'Email must be lowercase',
			'email.unique' => 'Email already exists',
			'role.required' => 'Role is required',
			'role.integer' => 'Role must be an integer',
			'role.exists' => 'Role does not exist',

			// Personal information
			'phone.string' => 'Phone must be a string',
			'phone.max' => 'Phone must not exceed 20 characters',
			'birth_date.date' => 'Birth date must be a valid date',
			'address.string' => 'Address must be a string',
			'address.max' => 'Address must not exceed 255 characters',
			'city.string' => 'City must be a string',
			'city.max' => 'City must not exceed 255 characters',
			'country.string' => 'Country must be a string',
			'country.max' => 'Country must not exceed 255 characters',
			'zip.string' => 'Zip must be a string',
			'zip.max' => 'Zip must not exceed 10 characters',

			'bio.string' => 'Bio must be a string',
			'bio.max' => 'Bio must not exceed 1000 characters',
			'profile_picture.image' => 'Profile picture must be an image',
			'profile_picture.mimes' => 'Profile picture must be a file of type: jpeg, png, jpg, gif, svg',
			'profile_picture.max' => 'Profile picture must not exceed 2048 kilobytes',
			'status.in' => 'Status must be enabled or disabled',
		];
	}
}
