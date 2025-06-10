<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use App\Services\UserService;


class ProfileController extends Controller
{

	private UserService $userService;

	public function __construct(UserService $userService)
	{
		$this->userService = $userService;
	}

	/**
	 * UPDATE
	 * 
	 * 
	 * 
	 */
	public function update(ProfileUpdateRequest $request): RedirectResponse
	{
		$request->user()->fill($request->validated());

		if ($request->user()->isDirty('email')) {
			$request->user()->email_verified_at = null;
		}

		$request->user()->save();
		return back()->with('success', 'Your profile was updated successfully.');
	}

	/**
	 * UPDATE IMAGE PROFILE
	 * 
	 * 
	 * 
	 */
	public function update_image(Request $request): void
	{
		$user = $request->user();

		$this->userService->updateImageProfile($user, $request);
	}

	/**
	 * REMOVE IMAGE PROFILE
	 * 
	 * 
	 * 
	 */
	public function remove_image(Request $request): RedirectResponse
	{
		$user = $request->user();

		$imagePath = '/public/img/users/avatars/' . $user->profile_picture;

		if (Storage::exists($imagePath)) {
			Storage::delete($imagePath);
		}

		$user->update(['profile_picture' => null]);
		return back()->with('success', 'Image removed successfully.');
	}

	/**
	 * DELETE ACCOUNT
	 * 
	 * 
	 * 
	 */
	public function destroy(Request $request): void
	{
		return;

		// $request->validate([
		// 	'password' => ['required', 'current_password'],
		// ]);

		// $user = $request->user();

		// Auth::logout();

		// $user->delete();

		// $request->session()->invalidate();
		// $request->session()->regenerateToken();

		// return Redirect::to('/');
	}
}
