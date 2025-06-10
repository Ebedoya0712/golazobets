import { t } from '@/i18n'
import type { Tipster } from '@/types/tipsters.d'
import { useForm, usePage } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'
import { type FormEvent } from 'react'
import { toast } from 'react-toastify'

import type { FlashMessage } from '@/types'

export const SubscriptionInformation = () => {
	const { tipster } = usePage<{ tipster: Tipster }>().props

	const { data, setData, patch, processing, errors, clearErrors, isDirty } =
		useForm({
			stripe_subscription_price_id: tipster.stripe_subscription_price_id || '',
		})

	const submit = (e: FormEvent) => {
		e.preventDefault()

		patch(route('admin.tipster.supscriptionId.update', { tipster }), {
			preserveScroll: true,
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => console.log(errors),
		})
	}

	return (
		<>
			<form onSubmit={submit}>
				<div className="max-w-sm space-y-7">
					<fieldset className="space-y-2">
						<label htmlFor="" className="text-sm">
							ID de precio de Stripe
						</label>

						<Input
							variant="faded"
							value={data.stripe_subscription_price_id}
							isInvalid={errors.stripe_subscription_price_id ? true : false}
							errorMessage={errors.stripe_subscription_price_id}
							onKeyUp={() => clearErrors('stripe_subscription_price_id')}
							isDisabled={processing}
							isClearable
							onValueChange={(e) => setData('stripe_subscription_price_id', e)}
						/>
					</fieldset>

					<div className="flex justify-end">
						<Button
							type="submit"
							color="primary"
							className="w-40"
							isLoading={processing}
							isDisabled={!isDirty || !data.stripe_subscription_price_id}
						>
							{t('Save')}
						</Button>
					</div>
				</div>
			</form>

			<div className="space-y-4 text-gray-500 text-sm mt-10">
				<p className="text-base font-bold">¿Qué es esto?</p>
				<p>
					En la vista de cada suscripción de Stripe podrás encontrar un apartado
					donde con una opción para copiar el ID de precio de la suscripción.
				</p>
				<img
					src="/img/stripe-subscription-product-api-price-id-interface-example.png"
					alt="Imagen de ejemplo de cómo copiar el ID de precio de la suscripción en Stripe"
					className="w-full max-w-md"
				/>
				<p>
					Debes guardar el ID de precio en el Tipster relacionado para que se
					realice la suscripción de pago correctamente a través de Stripe.
				</p>
				<p>
					Si al momento de que se realice una suscripción, el Tipster (sea
					premium o no), no cuenta con el ID de precio, la suscripción se acepta
					como FREE.
				</p>
			</div>
		</>
	)
}
