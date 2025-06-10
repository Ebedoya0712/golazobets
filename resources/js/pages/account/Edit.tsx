import { Layout } from '@/layouts/user/Layout'
import { t } from '@/i18n'
import { UserPageHeader, PageContent } from '@/components'
import {
	FormTipsterProfileImages,
	FormSocialMedia,
	FormTipsterInformation,
} from './components'
import {
	FormBasicInformation,
	FormPassword,
	MustVerifyEmail,
} from '../profile/components'
import { Tabs, Tab } from '@nextui-org/react'

import type { PageProps } from '@/types'
import { useWindowWidth } from '@/hooks'
import { useRef } from 'react'

const pageTitle = 'My profile'

interface Props extends PageProps {
	mustVerifyEmail: boolean
}

const Page = ({ auth: { user }, mustVerifyEmail, status }: Props) => {
	if (!user) return null
	const { windowWidth } = useWindowWidth()
	const isTipster = useRef(user.roles?.includes('Tipster'))

	return (
		<>
			<UserPageHeader title={t(pageTitle)} />

			<PageContent bottomSpacerClassName="h-0">
				<div className="flex flex-col flex-1">
					<div>
						{mustVerifyEmail && user.email_verified_at === null && (
							<MustVerifyEmail {...{ status }} />
						)}
					</div>

					<Tabs
						aria-label="Profile tabs"
						color="primary"
						variant="light"
						isVertical={windowWidth > 768 ? true : false}
						placement="start"
						classNames={{
							panel: 'w-full max-w-screen-md md:px-6 xl:pl-20',
							tab: 'justify-start font-medium select-none',
							base: 'w-full overflow-x-hidden md:w-72 lg:w-auto',
							tabList: 'w-full overflow-x-auto',
						}}
					>
						{isTipster.current && (
							<Tab key="profile" title={t('Mi perfil')}>
								<div className="space-y-16">
									<FormTipsterProfileImages />
									<FormTipsterInformation />
								</div>
							</Tab>
						)}

						<Tab key="basicInformation" title={t('Basic information')}>
							<FormBasicInformation />
						</Tab>

						{isTipster.current && (
							<Tab key="socialMedia" title={t('Redes sociales')}>
								<FormSocialMedia />
							</Tab>
						)}

						<Tab key="security" title={t('Security')}>
							<FormPassword />
						</Tab>
					</Tabs>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => {
	return <Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
}

export default Page
