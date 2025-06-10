<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Laravel\Facades\Image;

class MediaManagerController extends Controller
{

	/**
	 * Get a list of media items from the 'images' collection.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * 
	 * 
	 * 
	 */
	public function index(): JsonResponse
	{
		$user = Auth::user();
		$images = $user->getMedia('images');
		$imagesTotal = $images->count();
		$images = array_reverse($images->toArray());

		return response()->json(compact('images', 'imagesTotal'));
	}



	/**
	 * Store media files in the 'images' collection.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @return void
	 * 
	 * 
	 * 
	 */
	public function store(Request $request): void
	{
		$user = $request->user();
		$files = $request->file('files');

		$storagePath = storage_path('app/public');

		if (!file_exists("$storagePath/temp")) {
			mkdir("$storagePath/temp", 0755, true);
		}

		foreach ($files as $file) {
			$image = Image::read($file);
			$filename = time();
			$tempPath = "$storagePath/temp/$filename.webp";
			$image->toWebp(90)->save($tempPath);

			$user->addMedia($tempPath)
				->withCustomProperties([
					'altText' => '',
					'caption' => '',
					'description' => '',
				])
				->toMediaCollection('images');
		}
	}


	/**
	 * Update the specified media item in the 'images' collection.
	 *
	 * @param \Illuminate\Http\Request $request The request object containing update details.
	 * @param mixed $id The identifier of the media item to be updated.
	 * @return \Illuminate\Http\JsonResponse A JSON response indicating success or failure.
	 */

	public function update(Request $request, $id): JsonResponse
	{
		$user = $request->user();
		$media = $user->getMedia('images')->find($id);

		if ($media) {
			if (!empty($request->name)) $media->name = $request->name;
			$media->custom_properties = $request->custom_properties;
			$media->save();
			return response()->json(['message' => 'Image updated successfully']);
		}

		return response()->json(['message' => 'Image not found'], 404);
	}


	/**
	 * Delete a media item from the 'images' collection.
	 *
	 * @param string $uuid The UUID of the media item to be deleted.
	 * @return \Illuminate\Http\JsonResponse
	 * 
	 * 
	 * 
	 */
	public function destroy($id): JsonResponse
	{
		$user = Auth::user();
		$media = $user->getMedia('images')->find($id);

		if ($media) {
			$media->delete();
			return response()->json(['message' => 'Image deleted successfully']);
		}

		return response()->json(['message' => 'Image not found'], 404);
	}
}
