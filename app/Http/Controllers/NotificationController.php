<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Data\NotificationData;
use Illuminate\Http\RedirectResponse;

class NotificationController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(): Response
	{
		$per_page = config('settings.general.per_page');

		$user = Auth::user();
		$notifications = NotificationData::collect($user->unreadNotifications()->paginate($per_page));
		return Inertia::render('notification/NotificationsList', compact('notifications'));
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function markAsRead(Request $request, string $id): RedirectResponse
	{
		$notification = $request->user()->notifications()->findOrFail($id);
		$notification->markAsRead();

		return back()->with('success', 'Notification marked as read successfully.');
	}


	public function markAllAsRead(Request $request): RedirectResponse
	{
		$request->user()->unreadNotifications->markAsRead();

		// foreach ($notifications as $notification) {
		// 	$notification->markAsRead();
		// }

		return back()->with('success', 'All notifications marked as read successfully.');
	}
}
