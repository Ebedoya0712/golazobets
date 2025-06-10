import { PageContent, PageHeader } from '@/components'
import { t } from '@/i18n'
import { Layout } from '@/layouts/admin/Layout'
import { SubscriptionsTable } from './components'

const pageTitle = 'Suscripciones'

const Page = () => {
	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent>
				<div className="flex-1">
					<SubscriptionsTable />

					<div className="bg-sky-100 text-sky-500 px-5 py-3 rounded-lg mt-8">
						<p className="text-sm">
							Recuerda que las suscripciones premium se administran en el{' '}
							<a
								href="https://dashboard.stripe.com/"
								target="_blank"
								className="underline"
							>
								panel de Stripe
							</a>
							.
						</p>
					</div>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
