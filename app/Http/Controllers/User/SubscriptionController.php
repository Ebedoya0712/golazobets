<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Cashier\Exceptions\IncompletePayment;
use App\Services\SubscriptionService;

use App\Models\Tipster;

class SubscriptionController extends Controller
{

	private SubscriptionService $subscriptionService;

	public function __construct(
		SubscriptionService $subscriptionService
	) {
		$this->subscriptionService = $subscriptionService;
	}


	public function checkout(Request $request, Tipster $tipster)
	{
		$user = $request->user();

		if ($user->id === $tipster->user->id) {
			throw new \Error('Error en el proceso de suscripción.');
		}

		if (!$user) return back()->with('error', 'No user found');
		if (!$tipster) return back()->with('error', 'No tipster found');

		if ($user->subscribed($tipster->id)) {
			return back()->with('error', 'Ya cuentas con una suscripción a este tipster.');
		}

		try {
			/**
			 * Subscription to free tipsters -- (PUT)
			 */
			if ('free' === $tipster->type) {
				$this->subscriptionService->createFreeSubscription($request, $tipster);

				return back()->with('success', 'Gracias por suscribirte!');
			}

			/**
			 * Subscription to premium tipsters -- (GET)
			 */
			if (!$tipster->stripe_subscription_price_id) {
				$this->subscriptionService->createFreeSubscription($request, $tipster);

				return redirect()
					->route('tipster.profile', [
						'username' => $tipster->user->username,
						'success' => 'subscription_created'
					]);
			}


			return $user->newSubscription(
				$tipster->id, // type
				$tipster->stripe_subscription_price_id // Stripe price ID
			)
				->checkout([
					'success_url' => route('tipster.profile', [
						'username' => $tipster->user->username
					]) . '?success=subscription_created',
					'cancel_url' => route('tipster.profile', [
						'username' => $tipster->user->username
					]) . '?success=subscription_canceled',
				]);
		} catch (IncompletePayment $exception) {

			return redirect()->route(
				'cashier.payment',
				[$exception->payment->id, 'redirect' => route('tipster.profile', [
					'username' => $tipster->user->username,
					'success' => 'incomplete_payment'
				])]
			);
		} catch (\Exception $e) {
			return back()->with('error', 'Error al crear la suscripción: ' . $e->getMessage());
		}
	}




	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Request $request, Tipster $tipster)
	{
		if ('free' === $tipster->type) {
			return $this->subscriptionService->destroyFreeSubscription($request, $tipster);
		} else {
			return $this->subscriptionService->destroyPremiumSubscription($request, $tipster);
		}

		return back()->with('success', 'La suscripción ha sido cancelada.');
	}
}
