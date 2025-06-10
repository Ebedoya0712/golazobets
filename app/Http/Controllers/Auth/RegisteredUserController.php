<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Database\Factories\AccountFactory;
use Database\Factories\TipsterFactory;
use App\Data\SportData;

use App\Models\Sport;

class RegisteredUserController extends Controller
{
	/**
	 * Display the registration view.
	 */
	public function create(): Response
	{
		$layout = config('settings.general.auth_layout');
		$sports = Sport::select('id', 'name')->get()->map(function ($sport) {
			return [
				'key' => $sport->id,
				'label' => $sport->name,
			];
		})
			->toArray();

		return Inertia::render('auth/Register', compact('layout', 'sports'));
	}

	/**
	 * Handle an incoming registration request.
	 *
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function store(Request $request): RedirectResponse
	{

		$fieldsToValidate = [
			'username' => 'required|string|max:255|unique:' . User::class,
			'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
			'password' => ['required', 'confirmed', Rules\Password::defaults()],
			'user_type' => 'required|string|in:gambler,tipster',
		];

		if ($request->user_type === 'tipster') {
			$fieldsToValidate['sport_id'] = 'required_if:user_type,tipster|integer|exists:sports,id';
		}

		$request->validate($fieldsToValidate);

		$user = User::create([
			'username' => $request->username,
			'email' => $request->email,
			'password' => Hash::make($request->password),
		]);

		$user->assignRole($request->user_type === 'tipster' ? 'Tipster' : 'User');

		// Create account
		AccountFactory::new()->create([
			'user_id' => $user->id,
			'communications_consent' => $request->communications_consent ?? false
		]);

		// Create tipster
		if ($request->user_type === 'tipster') {
			TipsterFactory::new()->create([
				'user_id' => $user->id,
				'sport_id' => $request->sport_id
			]);
		}

		event(new Registered($user));

		Auth::login($user);

		return redirect(route('homePage', absolute: false));
	}
}
