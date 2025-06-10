<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NotificationTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Data\NotificationTemplateData;
use App\Http\Requests\Admin\UpdateNotificationTemplateRequest;
use Illuminate\Http\RedirectResponse;

class NotificationTemplateController extends Controller
{
	/**
	 * LIST
	 * 
	 * 
	 * 
	 */
	public function index(Request $request): Response
	{
		$per_page = config('settings.general.per_page');

		$templates = NotificationTemplate::orderBy($request->order ?? 'id', $request->dir === 'ascending' ? 'asc' : 'desc')
			->paginate($per_page);

		$templates->getCollection()->transform(function ($template) {
			$template->shortcodes = json_decode($template->shortcodes, true);
			return $template;
		});

		$templates = NotificationTemplateData::collect($templates);

		return Inertia::render('admin/notifications/Index', compact('templates'));
	}

	/**
	 * UPDATE
	 * 
	 * 
	 * 
	 */
	public function update(UpdateNotificationTemplateRequest $request, NotificationTemplate $template): RedirectResponse
	{
		$template->update($request->all());
		return back()->with('success', 'Template updated successfully');
	}
}
