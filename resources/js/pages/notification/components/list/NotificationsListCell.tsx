import { type Dispatch } from 'react'
import { Button } from '@nextui-org/react'
import { router } from '@inertiajs/react'
import dayjs from 'dayjs'
import { t } from '@/i18n'
import { toast } from 'react-toastify'
import ReactSafelySetInnerHTML from 'react-safely-set-inner-html'
import { alowedTags } from '@/helpers/safelySetInnerHtmlAllowedTags'

import type { Notification } from '@/types/notifications'
import type { FlashMessage } from '@/types'

interface Props {
	item: Notification
	key: string
	dispatch: Dispatch<any>
}

export const NotificationsListCell = ({ item, key, dispatch }: Props) => {
	switch (key) {
		case 'notification':
			return (
				<div className="flex gap-10">
					<div className="flex-1">
						{item.data?.title && (
							<h4 className="text-base font-semibold">{item.data.title}</h4>
						)}

						{item.data?.content && (
							<ReactSafelySetInnerHTML allowedTags={alowedTags}>
								{`<div class="text-[.8rem] text-foreground-800 leading-tight font-medium mt-1 space-y-1">${item.data.content}</div>`}
							</ReactSafelySetInnerHTML>
						)}

						<div className="text-foreground-500 text-xs flex gap-10 mt-2">
							<span>#{item.id}</span>
							<span>
								<i className="ri-calendar-line ri-sm"></i>{' '}
								{dayjs(item.created_at).format('YYYY-MM-DD')}
							</span>
						</div>
					</div>
					<div className="">
						<Button
							size="sm"
							color="primary"
							variant="flat"
							onPress={() => {
								router.post(route('notification.markAsRead', { id: item.id }), {
									// @ts-ignore
									onSuccess: (resp) => {
										const flash = resp.props.flash as FlashMessage
										if (flash.success) toast.success(t(flash.success))
										if (flash.error) toast.error(t(flash.error))
									},
								})
							}}
						>
							{t('Mark as read')}
						</Button>
					</div>
				</div>
			)

		default:
			return null
	}
}
