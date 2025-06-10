import { Layout } from '@/layouts/admin/Layout'
import { t } from '@/i18n'
import { PageHeader, PageContent } from '@/components'
import { TipstersTable } from './components'

const pageTitle = 'Tipsters'

const Page = () => {
	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent>
				<div className="flex-1">
					<TipstersTable />
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
