<?php

namespace App\Services;

use App\Models\Account;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateAccountRequest;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class AccountService
{

	/**
	 * Available methods:
	 * 
	 * updateAccount() - Updates user account information and tipster sport
	 * updateCoverImage() - Updates the cover image for a tipster
	 * removeCoverImage() - Removes the cover image for a tipster
	 */

	/**
	 * Updates user account information and tipster sport if provided
	 * 
	 * @param UpdateAccountRequest $request
	 * @return bool
	 */
	public function updateAccount(UpdateAccountRequest $request)
	{
		$user = $request->user();
		$data = collect($request->validated())->except('sport_id')->toArray();

		if ($request->sport_id) {
			$user->tipster()->update(['sport_id' => $request->sport_id]);
		}

		$account = $user->account()->update($data);

		return $account;
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Updates the cover image for a tipster
	 * 
	 * @param Request $request The incoming request containing the cover image
	 * @return void
	 */
	public function updateCoverImage($request): void
	{
		$tipster = $request->user()->tipster;
		$directory = 'img/tipsters/covers';

		// Ensure the directory exists
		if (!Storage::disk('public')->exists($directory)) {
			Storage::disk('public')->makeDirectory($directory, 0755, true);
		}

		if ($request->hasFile('cover_image')) {
			$avatarPath = $directory . '/' . $tipster->cover_image;
			if (Storage::disk('public')->exists($avatarPath)) {
				Storage::disk('public')->delete($avatarPath);
			}

			$file = $request->file('cover_image');
			$filename = time() . '.webp';
			$image = Image::read($file);
			$image
				->resizeCanvas(1024, 448)
				->resize(1024, 448, function ($constraint) {
					$constraint->aspectRatio();
					$constraint->upsize();
				})
				->toWebp(90)
				->save(Storage::disk('public')->path($directory . '/' . $filename));

			if ($filename) {
				$tipster->update(['cover_image' => $filename]);
			}
		}
	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * 
	 * Removes the cover image for a tipster
	 * 
	 * @param Request $request The incoming request
	 * @return void
	 */
	public function removeCoverImage($request)
	{
		$tipster = $request->user()->tipster;

		$imagePath = '/public/img/tipsters/covers/' . $tipster->cover_image;

		if (Storage::exists($imagePath)) {
			Storage::delete($imagePath);
		}

		$tipster->update(['cover_image' => null]);
	}
}
