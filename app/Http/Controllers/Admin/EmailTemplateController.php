<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmailTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Data\EmailTemplateData;
use App\Http\Requests\Admin\UpdateEmailTemplateRequest;

class EmailTemplateController extends Controller
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

		$templates = EmailTemplate::orderBy($request->order ?? 'id', $request->dir === 'ascending' ? 'asc' : 'desc')
			->paginate($per_page);

		$templates->getCollection()->transform(function ($template) {
			$template->shortcodes = json_decode($template->shortcodes, true);
			return $template;
		});

		$templates = EmailTemplateData::collect($templates);

		return Inertia::render('admin/emails/Index', compact('templates'));
	}

	/**
	 * EDIT
	 * 
	 * 
	 * 
	 */
	public function edit(EmailTemplate $template)
	{
		$template->shortcodes = json_decode($template->shortcodes, true) ?? [];
		$template = EmailTemplateData::from($template);

		return Inertia::render('admin/emails/Edit', compact('template'));
	}

	/**
	 * UPDATE
	 * 
	 * 
	 * 
	 */
	public function update(UpdateEmailTemplateRequest $request, EmailTemplate $template)
	{
		$template->update($request->all());
		return back()->with('success', 'Template updated successfully');
	}
}
