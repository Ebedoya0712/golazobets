import { t } from '@/i18n'
import { FlashMessage } from '@/types'
import { router } from '@inertiajs/react'
import { Button, Chip } from '@nextui-org/react'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

interface Props {
	item: any
	key: string
}

export const Cell = ({ item, key }: Props) => {
	switch (key) {
		case 'id':
			return item.id
		case 'user':
			return <span className="capitalize">{item.user.username}</span>
		case 'tipster':
			return (
				<a
					href={route('tipster.profile', {
						username: item.tipster.user.username,
					})}
					target="_blank"
					className="truncate inline-flex items-center gap-x-1"
				>
					<span className="underline capitalize">
						{item.tipster.user.username}
					</span>
					<i className="ri-link-m text-foreground-100" />
				</a>
			)
		case 'to':
			return <i className="ri-arrow-right-line" />
		case 'type':
			if ('free' === item.stripe_price) {
				return (
					<Chip color="secondary" size="sm">
						Free
					</Chip>
				)
			} else {
				return (
					<Chip color="success" size="sm">
						Premium
					</Chip>
				)
			}
		case 'date':
			return dayjs(item.start_date).format('DD/MM/YYYY')

		case 'actions':
			return (
				<div className="flex justify-end">
					{'free' === item.stripe_price ? (
						<Button
							color="danger"
							size="sm"
							variant="light"
							startContent={<i className="ri-close-circle-line ri-xl" />}
							onPress={() => {
								router.delete(
									route('admin.unsubscribe', { subscription: item }),
									{
										// method: 'delete',
										preserveScroll: true,
										only: ['subscriptions'],
										onSuccess: (resp) => {
											const flash = resp.props.flash as FlashMessage
											if (flash.error) {
												toast.error(t(flash.error))
											} else {
												toast.success(
													'La suscripción se ha cancelado correctamente'
												)
											}
										},
										onError: (err) => {
											toast.error('Error al desuscribirse')
											console.log('error', err)
										},
									}
								)
							}}
						>
							Cancelar
						</Button>
					) : (
						<a
							href="https://dashboard.stripe.com/test/subscriptions?status=active"
							target="_blank"
						>
							<Button
								size="sm"
								variant="ghost"
								className="border-indigo-500 text-indigo-500"
							>
								Ir a Stripe
							</Button>
						</a>
					)}
				</div>
			)

		default:
			return null
	}
}
