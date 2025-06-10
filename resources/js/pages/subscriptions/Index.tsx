import { PageContent, UserPageHeader } from '@/components'
import { t } from '@/i18n'
import { Layout } from '@/layouts/user/Layout'
import { SubscriptionsTable } from './components'

const pageTitle = 'Suscripciones'

const Page = () => {
	return (
		<>
			<UserPageHeader title={t(pageTitle)} />

			<PageContent>
				<div className="w-full max-w-7xl mx-auto overflow-x-scroll xl:overflow-clip">
					<SubscriptionsTable />
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
