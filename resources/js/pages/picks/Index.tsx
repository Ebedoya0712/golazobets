import { PageContent, UserPageHeader } from '@/components'
import { t } from '@/i18n'
import { Layout } from '@/layouts/user/Layout'
import { Link } from '@inertiajs/react'
import { Button } from '@nextui-org/react'
import { PicksTable } from './components'

const pageTitle = 'Picks'

const Page = () => {
	return (
		<>
			<UserPageHeader title={t(pageTitle)}>
				<div className="flex justify-end items-center">
					<Button
						color="primary"
						startContent={<i className="ri-add-line" />}
						as={Link}
						href={route('account.picks.create')}
					>
						{t('Nuevo pick')}
					</Button>
				</div>
			</UserPageHeader>

			<PageContent>
				<div className="w-full max-w-7xl mx-auto overflow-x-scroll xl:overflow-clip">
					<PicksTable />
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
