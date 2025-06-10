import { PageContent, PageHeader } from '@/components'
import { t } from '@/i18n'
import { Layout } from '@/layouts/admin/Layout'
import { Link } from '@inertiajs/react'
import { Button, Tab, Tabs } from '@nextui-org/react'
import {
	DeleteAccount,
	FormBasicInformation,
	FormPassword,
	FormPersonalInformation,
	FormTipster,
	SubscriptionInformation,
} from './components'

import type { PageProps } from '@/types'
import type { Sport } from '@/types/sports.d'

const pageTitle = 'Editar Tipster'

interface Props extends PageProps {
	sports: Sport[]
}

const Page = ({ sports, tipster }: Props) => {
	return (
		<>
			<PageHeader title={t(pageTitle)}>
				<div className="flex justify-end">
					<Button
						size="sm"
						color="default"
						startContent={<i className="ri-arrow-left-line" />}
						as={Link}
						href={route('admin.tipsters.index')}
					>
						{t('Volver a la lista de tipsters')}
					</Button>
				</div>
			</PageHeader>

			<PageContent>
				<div className="flex flex-col flex-1">
					<div>
						<Tabs
							aria-label="Profile tabs"
							color="primary"
							variant="light"
							placement="start"
							classNames={{
								panel: 'w-full max-w-screen-md pl-10 pr-0 xl:pl-20',
								tab: 'justify-start',
								tabContent: 'text-gray-500 font-medium',
							}}
						>
							<Tab key="basicInformation" title={t('Basic information')}>
								<FormBasicInformation />
							</Tab>

							<Tab key="tipster" title={t('Perfil de tipster')}>
								<FormTipster />
							</Tab>

							{'premium' === tipster.type && (
								<Tab key="subscription" title="Suscripciones">
									<SubscriptionInformation />
								</Tab>
							)}

							<Tab key="personalInformation" title={t('Personal information')}>
								<FormPersonalInformation />
							</Tab>

							<Tab key="security" title={t('Security')}>
								<FormPassword />
							</Tab>

							<Tab key="advanced" title={t('Advanced')}>
								<DeleteAccount />
							</Tab>
						</Tabs>
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
