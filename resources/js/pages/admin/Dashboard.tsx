import { Layout } from '@/layouts/admin/Layout'
import { t } from '@/i18n'
import { PageHeader, PageContent } from '@/components'
import { Card, CardBody } from '@nextui-org/react'

const pageTitle = 'Admin panel'

type Props = {
	total_accounts: number
	total_users: number
	total_tipsters: number
	total_picks: number
	total_subscriptions: number
}

const Page = ({
	total_accounts,
	total_users,
	total_tipsters,
	total_picks,
	total_subscriptions,
}: Props) => {
	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent>
				<div className="flex-1 space-y-6">
					<div className="gap-6 lg:grid lg:grid-cols-4">
						<Card>
							<CardBody>
								<div className="flex flex-col justify-end min-h-28">
									<i className="ri-bar-chart-box-line ri-2x leading-none" />
									<p className="text-sm text-gray-500">Total apuestas</p>
									<p className="text-3xl truncate">{total_picks}</p>
								</div>
							</CardBody>
						</Card>

						<Card>
							<CardBody>
								<div className="flex flex-col justify-end min-h-28">
									<i className="ri-exchange-dollar-line ri-2x leading-none" />
									<p className="text-sm text-gray-500">Total suscripciones</p>
									<p className="text-3xl truncate">{total_subscriptions}</p>
								</div>
							</CardBody>
						</Card>
						
						<Card>
							<CardBody>
								<div className="flex flex-col h-full">
									<p className="text-sm text-gray-500">
										Total de cuentas creadas
										<span className="text-gray-400 ml-2">{total_accounts}</span>
									</p>

									<div className="border-t border-divider flex gap-x-5 mt-2 flex-1">
										<div className="flex flex-col justify-end p-2 oveflow-hidden">
											<p className="text-sm">Usuarios</p>
											<p className="text-3xl truncate">{total_users}</p>
										</div>

										<div className="border-l border-divider"></div>

										<div className="flex flex-col justify-end p-2 oveflow-hidden">
											<p className="text-sm">Tipsters</p>
											<p className="text-3xl truncate">{total_tipsters}</p>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>

						
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
