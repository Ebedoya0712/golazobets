import { TableContent } from '@/components'
import config from '@/config'
import { t } from '@/i18n'
import { Link, router, usePage } from '@inertiajs/react'
import { Button, Chip, User } from '@nextui-org/react'
import dayjs from 'dayjs'

import type { FlashMessage, PageProps } from '@/types'
import { toast } from 'react-toastify'

type Props = {}

export const SubscriptionsTable = ({}: Props) => {
	const { props } = usePage<PageProps>()
	const { subscriptions } = props
	const { data, links, current_page } = subscriptions

	return (
		<TableContent
			{...{
				data,
				links,
				current_page,
				reloadOnly: ['subscriptions'],
				columns,
				emptyContent: t('Aún no tienes suscripciones.'),
				cell: (item: any, key: any) => {
					switch (key) {
						case 'tipster':
							return (
								<User
									avatarProps={{
										src: item.tipster.user.profile_picture
											? `/storage/img/users/avatars/${item.tipster.user.profile_picture}`
											: config.userBlank,
									}}
									name={item.tipster.user.username}
									classNames={{ name: 'font-semibold' }}
									as={Link}
									href={route('tipster.profile', {
										username: item.tipster.user.username,
									})}
								/>
							)

						case 'type':
							return 'free' === item.stripe_price ? (
								<Chip color="default" size="sm" variant="flat">
									{t('Free')}
								</Chip>
							) : (
								<Chip color="success" size="sm" variant="solid">
									{t('Premium')}
								</Chip>
							)

						case 'start_date':
							return dayjs(item.created_date).format('DD/MM/YYYY')

						case 'actions':
							return (
								<div className="flex justify-end">
									{'free' === item.stripe_price ? (
										// ---------------------------------------------------------------------------
										// Subscriptions FREE
										// ---------------------------------------------------------------------------
										<Button
											color="danger"
											size="sm"
											variant="light"
											startContent={
												<i className="ri-close-circle-line ri-xl" />
											}
											onPress={() => {
												router.visit(
													route('unsubscribe', { tipster: item.tipster }),
													{
														method: 'delete',
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
											{t('Desubscribirme')}
										</Button>
									) : (
										// ---------------------------------------------------------------------------
										// Subscriptions PREMIUM
										// ---------------------------------------------------------------------------
										<Button
											color="danger"
											size="sm"
											variant="light"
											startContent={
												<i className="ri-close-circle-line ri-xl" />
											}
											onPress={() => {
												router.delete(
													route('unsubscribe', { tipster: item.tipster }),
													{
														preserveScroll: true,
														onSuccess: (resp) => {
															// setIsSubscribing(0)
															router.reload({
																only: [subscriptions],
															})
															const flash = resp.props.flash as FlashMessage
															if (flash.success) toast.success(t(flash.success))
															if (flash.error) toast.error(t(flash.error))
														},
													}
												)
											}}
										>
											{t('Desubscribirme')}
										</Button>
									)}
								</div>
							)

						default:
							return null
					}
				},
			}}
		/>
	)
}

const columns = [
	{ key: 'tipster', label: 'Tipster', classname: 'w-full' },
	{ key: 'type', label: 'Tipo', width: 150 },
	{ key: 'start_date', label: 'Fecha', width: 150 },
	{ key: 'actions', label: '' },
] as {
	id: string
	key: string
	label: string
	// allowsSorting?: boolean
	width?: number
	classname: string
}[]
