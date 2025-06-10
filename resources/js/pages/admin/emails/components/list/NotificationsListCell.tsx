import { Button } from '@nextui-org/react'
import { t } from '@/i18n'
import { Link } from '@inertiajs/react'

import type { EmailTemplate } from '@/types/notification-templates.d'

interface Props {
	item: EmailTemplate
	key: string
}

export const NotificationsListCell = ({ item, key }: Props) => {
	switch (key) {
		case 'id':
			return item.id
		case 'name':
			return <span className="font-semibold">{item.name}</span>
		case 'actions':
			return (
				<div className="flex justify-end">
					<Button
						color="primary"
						size="sm"
						as={Link}
						variant="flat"
						href={route('admin.emailTemplates.edit', { template: item })}
					>
						{t('Edit')}
					</Button>
				</div>
			)

		default:
			return null
	}
}
