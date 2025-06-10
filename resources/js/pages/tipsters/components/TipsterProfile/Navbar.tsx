import { t } from '@/i18n'
import { Link, router, usePage } from '@inertiajs/react'
import { Button, cn } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import type { FlashMessage, PageProps } from '@/types'

type Props = {
	menu: {
		label: string
		link: string
		active: string
	}[]
}

export const Navbar = ({ menu = [] }: Props) => {
	if (!menu.length) return

	const { tipster } = usePage<PageProps>().props
	const currentRoute = useRef(route().current())

	/**
	 * ---------------------------------------------------------------------------
	 * Tipster subscription
	 * ---------------------------------------------------------------------------
	 */
	const params = new URLSearchParams(window.location.search)
	const params_success = params.get('success')

	useEffect(() => {
		if ('subscription_created' === params_success)
			toast.success('Gracias por suscribirte')

		if ('subscription_canceled' === params_success)
			toast.success('La suscripción ha sido cancelada')

		if ('incomplete_payment' === params_success)
			toast.error(
				'No se ha podido procesar el pago de la suscripción. Por favor, inténtalo de nuevo más tarde.'
			)
	}, [params_success])

	return (
		<div
			className={cn(
				'flex justify-center',
				'free' === tipster.type ? 'bg-gray-400' : 'bg-secondary'
			)}
		>
			<div className="w-full max-w-5xl">
				<nav className="flex justify-between items-end">
					<div className="text-xl font-bc font-semibold flex uppercase">
						{menu.map(({ label, link, active }) => (
							<Link
								preserveScroll
								href={link}
								key={label}
								className={`px-4 pt-10 pb-2 ${
									active === currentRoute.current
										? 'free' === tipster.type
											? 'text-secondary'
											: 'text-white'
										: 'free' === tipster.type
										? 'text-white'
										: 'text-black'
								}`}
							>
								{label}
							</Link>
						))}
					</div>

					<div className="pb-3 pr-5 md:pb-4 xl:pr-0">
						<ButtonSubscribe />
					</div>
				</nav>
			</div>
		</div>
	)
}

const ButtonSubscribe = () => {
	const { hasSubscription, tipster, auth } = usePage<PageProps>().props
	const { user } = auth
	const [isSubscribing, setIsSubscribing] = useState(0)

	if (!user) return
	if (user.id === tipster.user.id) return

	switch (tipster.type) {
		case 'premium':
			if (hasSubscription) {
				return (
					<span className="text-sm font-semibold select-none">
						{t('Suscripción activa')}
					</span>
				)
				// return (
				// 	<Button
				// 		fullWidth
				// 		onPress={() => {
				// 			setIsSubscribing(1)

				// 			router.delete(route('unsubscribe', { tipster }), {
				// 				preserveScroll: true,
				// 				onSuccess: (resp) => {
				// 					setIsSubscribing(0)
				// 					router.reload({
				// 						only: [hasSubscription],
				// 					})
				// 					const flash = resp.props.flash as FlashMessage
				// 					if (flash.success) toast.success(t(flash.success))
				// 					if (flash.error) toast.error(t(flash.error))
				// 				},
				// 			})
				// 		}}
				// 		color="primary"
				// 		variant="ghost"
				// 		isDisabled={isSubscribing === 1}
				// 		isLoading={isSubscribing === 1}
				// 	>
				// 		{t('Desubscribirme')}
				// 	</Button>
				// )
			} else {
				/**
				 * ---------------------------------------------------------------------------
				 * Tipster PREMIUM subscription
				 * ---------------------------------------------------------------------------
				 */
				return (
					<a href={route('checkout', { tipster })}>
						<Button fullWidth color="primary" variant="solid">
							{t('Suscribirme')}
						</Button>
					</a>
				)
			}

		default:
			if (hasSubscription) {
				return (
					<span className="text-secondary text-sm font-semibold select-none">
						{t('Suscripción activa')}
					</span>
				)
				// return (
				// 	<Button
				// 		fullWidth
				// 		onPress={() => {
				// 			setIsSubscribing(1)

				// 			router.delete(route('unsubscribe', { tipster }), {
				// 				preserveScroll: true,
				// 				onSuccess: (resp) => {
				// 					setIsSubscribing(0)
				// 					router.reload({
				// 						only: [hasSubscription],
				// 					})
				// 					const flash = resp.props.flash as FlashMessage
				// 					if (flash.success) toast.success(t(flash.success))
				// 					if (flash.error) toast.error(t(flash.error))
				// 				},
				// 			})
				// 		}}
				// 		color="secondary"
				// 		variant="ghost"
				// 		isDisabled={isSubscribing === 1}
				// 		isLoading={isSubscribing === 1}
				// 	>
				// 		{t('Desubscribirme')}
				// 	</Button>
				// )
			} else {
				/**
				 * ---------------------------------------------------------------------------
				 * Tipster FREE subscription
				 * ---------------------------------------------------------------------------
				 */
				return (
					<Button
						fullWidth
						color="secondary"
						variant="solid"
						onPress={() => {
							setIsSubscribing(1)

							router.visit(route('checkout', { tipster }), {
								only: [hasSubscription],
								preserveScroll: true,
								onSuccess: (resp) => {
									setIsSubscribing(0)
									const flash = resp.props.flash as FlashMessage
									if (flash.success) toast.success(t(flash.success))
									if (flash.error) toast.error(t(flash.error))
								},
							})
						}}
						isDisabled={isSubscribing === 1}
						isLoading={isSubscribing === 1}
					>
						{t('Suscribirme')}
					</Button>
				)
			}
	}
}
