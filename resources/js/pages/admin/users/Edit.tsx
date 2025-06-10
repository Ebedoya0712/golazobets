import { Layout } from '@/layouts/admin/Layout'
import { t } from '@/i18n'
import { PageHeader, PageContent } from '@/components'
import { Link } from '@inertiajs/react'
import { Button, Tabs, Tab } from '@nextui-org/react'
import {
	FormBasicInformation,
	FormPersonalInformation,
	FormPassword,
	DeleteAccount,
} from './components'

import type { PageProps, User } from '@/types'

const pageTitle = 'Edit user'

interface Props extends PageProps {
	user: User
}

export const Page = ({ user }: Props) => {
	return (
		<>
			<PageHeader title={t(pageTitle)}>
				<div className="flex justify-end">
					<Button
						size="sm"
						color="default"
						startContent={<i className="ri-arrow-left-line" />}
						as={Link}
						href={route('admin.user.index')}
					>
						{t('Back to users list')}
					</Button>
				</div>
			</PageHeader>

			<PageContent>
				<div className="flex flex-col flex-1">
					<div className="">
						<Tabs
							aria-label="Profile tabs"
							color="primary"
							variant="light"
							placement="start"
							classNames={{
								panel: 'w-full max-w-screen-md pl-10 pr-0 xl:pl-20',
								tab: 'justify-start',
							}}
						>
							<Tab key="basicInformation" title={t('Basic information')}>
								<FormBasicInformation />
							</Tab>

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

			<div className="h-20"></div>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
