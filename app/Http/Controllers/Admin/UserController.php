<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Session;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Requests\Admin\CreateUserRequest;
use App\Services\UserService;
use Inertia\Response;


class UserController extends Controller
{

	private UserService $userService;

	public function __construct(UserService $userService)
	{
		$this->userService = $userService;
	}

	/**
	 * LIST
	 * 
	 * 
	 * 
	 */
	public function index(): Response
	{
		return Inertia::render(
			'admin/users/UsersList',
			$this->userService->userList()
		);
	}

	/**
	 * CREATE
	 * 
	 * 
	 * 
	 */
	public function create(): Response
	{
		return Inertia::render('admin/users/Create');
	}

	/**
	 * STORE
	 * 
	 * 
	 * 
	 */
	public function store(CreateUserRequest $request): RedirectResponse
	{
		$user = $this->userService->storeUser($request);

		return redirect()->route('admin.user.show', $user);
	}

	/**
	 * SHOW
	 * 
	 * 
	 * 
	 */
	public function show(User $user): RedirectResponse
	{
		return redirect()->route('admin.user.edit', ['user' => $user]);
	}

	/**
	 * EDIT
	 * 
	 * 
	 * 
	 */
	public function edit(User $user): Response
	{
		return Inertia::render(
			'admin/users/Edit',
			$this->userService->editUser($user)
		);
	}

	/**
	 * UPDATE
	 * 
	 * 
	 * 
	 */
	public function update(UpdateUserRequest $request, User $user): RedirectResponse
	{
		$user = $this->userService->updateUser($request, $user);

		if (!$user) return back()->with('error', 'User not updated.');

		return back()->with('success', 'User updated successfully.');
	}

	/**
	 * UPDATE IMAGE PROFILE
	 * 
	 * 
	 * 
	 */
	public function update_image_profile(User $user, Request $request): void
	{
		$this->userService->updateImageProfile($user, $request);
	}

	/**
	 * REMOVE IMAGE PROFILE
	 * 
	 * 
	 * 
	 */
	public function remove_image_profile(User $user): RedirectResponse
	{
		$this->userService->removeImageProfile($user);
		return back()->with('success', 'Image removed successfully.');
	}

	/**
	 * TERMINATE SESSION
	 * 
	 * 
	 * 
	 */
	public function invalidate_session($id): RedirectResponse
	{
		Session::findOrFail($id)->delete();
		return back()->with('success', 'The session was closed.');
	}

	/**
	 * DELETE ACCOUNT
	 * 
	 * 
	 * 
	 */
	public function destroy(User $user): RedirectResponse
	{

		return redirect()
			->route('admin.user.index')
			->with('success', 'The account was deleted.');
	}
}
