<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UpdateAccountRequest;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Services\AccountService;
use App\Services\SubscriptionService;
use App\Services\SportService;

use App\Data\SubscriptionData;

class AccountController extends Controller
{

	private AccountService $accountService;
	private SportService $sportService;
	private SubscriptionService $subscriptionsService;

	public function __construct(
		AccountService $accountService,
		SportService $sportService,
		SubscriptionService $subscriptionsService
	) {
		$this->accountService = $accountService;
		$this->sportService = $sportService;
		$this->subscriptionsService = $subscriptionsService;
	}


	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Request $request): Response
	{
		$user = $request->user();
		$sports = $this->sportService->getSports();
		$wysiwygMaxLength = config('settings.general.max_characters_for_wysiwyg');

		return Inertia::render('account/Edit', [
			'mustVerifyEmail' => $user instanceof MustVerifyEmail,
			'status' => session('status'),
			'sports' => $sports,
			'wysiwygMaxLength' => $wysiwygMaxLength
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateAccountRequest $request): RedirectResponse
	{
		$account = $this->accountService->updateAccount($request);

		if (!$account) return back()->with('error', 'Account not updated.');

		return back()->with('success', 'Account updated successfully.');
	}


	/**
	 * Display the user's subscriptions page.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Inertia\Response
	 */
	public function subscriptions(Request $request): Response
	{
		$user = $request->user();
		$subscriptions = $this->subscriptionsService->getUserSubscriptions($user);

		return Inertia::render('subscriptions/Index', compact('subscriptions'));
	}


	/**
	 * Update user's cover image
	 * 
	 * @param Request $request
	 * @return void
	 */
	public function coverImage(Request $request): void
	{
		$this->accountService->updateCoverImage($request);
	}

	/**
	 * Remove user's cover image
	 * 
	 * @param Request $request
	 * @return RedirectResponse
	 */
	public function removeCoverImage(Request $request): RedirectResponse
	{
		$this->accountService->removeCoverImage($request);
		return back()->with('success', 'Image removed successfully.');
	}
}
