import { type Dispatch } from 'react'
import { Button } from '@nextui-org/react'
import { t } from '@/i18n'

import type { NotificationTemplate } from '@/types/notification-templates.d'

interface Props {
	item: NotificationTemplate
	key: string
	dispatch: Dispatch<any>
	onOpen: () => void
}

export const NotificationsListCell = ({
	item,
	key,
	dispatch,
	onOpen,
}: Props) => {
	switch (key) {
		case 'id':
			return item.id
		case 'title':
			return <span className="font-semibold">{item.title}</span>
		case 'actions':
			return (
				<div className="flex justify-end">
					<Button
						color="primary"
						size="sm"
						variant="flat"
						onPress={() => {
							dispatch({ type: 'setSelectedNotification', payload: item })
							dispatch({ type: 'openDrawer' })
						}}
					>
						{t('Edit')}
					</Button>
				</div>
			)

		default:
			return null
	}
}
