<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GalleryController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$per_page = config('settings.general.per_page');

		$user = Auth::user();
		$images = $user->media()->where('collection_name', 'images')->orderBy('created_at', 'desc')->paginate($per_page);
		$imagesTotal = $user->getMedia('images')->count();
		$images = array_reverse($images->toArray());

		return Inertia::render('gallery/ImageGallery', compact('images', 'imagesTotal'));
	}
}
