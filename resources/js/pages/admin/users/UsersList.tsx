import { Layout } from '@/layouts/admin/Layout'
import { t } from '@/i18n'
import { PageHeader, PageContent } from '@/components'
import { UsersList } from './components/UsersList'
import { Button } from '@nextui-org/react'
import { Link } from '@inertiajs/react'

const pageTitle = 'Users'

export const Page = () => {
	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent>
				<UsersList />
			</PageContent>

			<div className="h-20" />
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
