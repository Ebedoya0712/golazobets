<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\UserService;

class UserAdminController extends Controller
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
			'admin/users/AdministratorsList',
			$this->userService->adminList()
		);
	}

	/**
	 * SHOW
	 * 
	 * 
	 * 
	 */
	public function show(User $user): Response
	{
		$user['role'] = $user->roles->pluck('name')->first();
		return Inertia::render('admin/users/Edit', compact('user'));
	}
}
