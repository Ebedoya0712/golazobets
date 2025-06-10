import { Layout } from '@/layouts/admin/Layout'
import { t } from '@/i18n'
import { PageHeader, PageContent } from '@/components'
import { PicksTable } from './components'

const pageTitle = 'Picks'

const Page = () => {
	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent>
				<div className="flex-1">
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
