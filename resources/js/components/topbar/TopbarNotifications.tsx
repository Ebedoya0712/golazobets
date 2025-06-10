import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Button,
} from '@nextui-org/react'
import ReactSafelySetInnerHTML from 'react-safely-set-inner-html'
import { t } from '@/i18n'
import { router } from '@inertiajs/react'
import { alowedTags } from '@/helpers/safelySetInnerHtmlAllowedTags'

import type { PageProps } from '@/types'
import type { Notification } from '@/types/notifications'

const addMarkAllAsReadButton = (notifications: Notification[]) => {
	notifications.push({ id: 'mark-all-as-read' })
	return notifications
}

export const TopbarNotifications = () => {
	const {
		auth: { user, notifications },
	} = usePage<PageProps>().props

	const [notificationsList, setNotificationsList] = useState(
		notifications.filter((e) => e.read_at === null)
	)

	// Laravel  Echo
	useEffect(() => {
		if (user) {
			window.Echo.private(`App.Models.User.${user.id}`)
				.notification((notification: any) => {
					const _notifications = notifications
					_notifications.unshift(notification)

					setNotificationsList(addMarkAllAsReadButton(_notifications))
				})
				.error((error: any) => {
					console.error('Error al conectarse al canal:', error)
				})
		}

		return () => {
			if (user) window.Echo.leaveChannel(`App.Models.User.${user.id}`)
		}
	}, [user])

	useEffect(() => {
		if (notifications && notifications.length) {
			setNotificationsList(addMarkAllAsReadButton([...notifications]))
		}
	}, [])

	if (!notificationsList.length) return <TriggerButton />

	return (
		<>
			<Dropdown radius="none" placement="bottom-end">
				<DropdownTrigger className="cursor-pointer select-none">
					<div>
						<TriggerButton {...{ notifications: notificationsList }} />
					</div>
				</DropdownTrigger>

				<DropdownMenu
					aria-label="Profile dropdown"
					variant="light"
					classNames={{ base: 'w-96' }}
				>
					{notificationsList.map((notification: NotificationItem) =>
						notification.id === 'mark-all-as-read' ? (
							<DropdownItem
								key={notification.id}
								as={Button}
								color="primary"
								className="mt-3"
								onPress={() => {
									router.post(route('notification.markAllAsRead'))
									setNotificationsList([])
								}}
							>
								{t('Mark all as read')}
							</DropdownItem>
						) : (
							<DropdownItem
								key={notification.id}
								textValue={String(notification.title)}
								description={
									<ReactSafelySetInnerHTML allowedTags={alowedTags}>
										{`<div class="[&>*]:truncate [&>*:not(:first-child)]:hidden">${notification.content}</div>`}
									</ReactSafelySetInnerHTML>
								}
								onPress={() => router.visit(route('notification.index'))}
							>
								<div className="text-xs font-medium">
									<ReactSafelySetInnerHTML>
										{notification.title ?? ''}
									</ReactSafelySetInnerHTML>
								</div>
							</DropdownItem>
						)
					)}
				</DropdownMenu>
			</Dropdown>
		</>
	)
}

const TriggerButton = ({ notifications = [] }: { notifications?: any[] }) => {
	if (!notifications.length)
		return (
			<div className="relative">
				<i className="ri-notification-2-line" />
			</div>
		)

	return (
		<Button
			radius="full"
			isIconOnly
			variant="light"
			disableAnimation
			disableRipple
			className="pointer-events-none"
		>
			<i className="ri-notification-2-line" />

			{notifications &&
				Array.isArray(notifications) &&
				notifications.length > 0 && (
					<span className="bg-danger w-2.5 h-2.5 absolute top-2 right-2 rounded-full animate-pulse z-20" />
				)}
		</Button>
	)
}

type NotificationItem = {
	id: string
	title?: string
	content?: string
	type?: string
}
