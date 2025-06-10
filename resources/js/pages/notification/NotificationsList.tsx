import { Layout } from '@/layouts/admin/Layout'
import { PageHeader, PageContent } from '@/components'
import { t } from '@/i18n'
import { NotificationsList } from './components'
import 'react-modern-drawer/dist/index.css'
import { NotificationProvider } from './providers/NotificationProvider'
import { router } from '@inertiajs/react'
import { Button } from '@nextui-org/react'

import type { NotificationsTable } from '@/types/notifications'
import { PageProps } from '@/types'

const pageTitle = 'Notifications'

interface Props extends PageProps {
	notifications: NotificationsTable
}

const Page = ({ notifications }: Props) => {
	return (
		<>
			<PageHeader title={t(pageTitle)}>
				<div className="flex justify-end">
					{notifications.data.length > 0 && (
						<Button
							size="sm"
							color="primary"
							className="px-6"
							variant="flat"
							onPress={() => {
								router.post(route('notification.markAllAsRead'))
							}}
						>
							{t('Makr all as read')}
						</Button>
					)}
				</div>
			</PageHeader>

			<PageContent>
				<NotificationsList />
			</PageContent>

			<div className="h-20" />
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<NotificationProvider>
		<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
	</NotificationProvider>
)

export default Page
