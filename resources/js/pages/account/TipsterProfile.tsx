import { PageContent, UserPageHeader } from '@/components'
import { t } from '@/i18n'
import { Layout } from '@/layouts/user/Layout'
import {
	Header,
	Navbar,
	PicksContent,
	ServiceContent,
	StatsContent,
	Warning,
} from '@/pages/tipsters/components/TipsterProfile'

import type { User } from '@/types'

const pageTitle = 'Perfil público'

type Props = {
	user: User
	activeTab: string
}

const Page = ({ activeTab }: Props) => {
	return (
		<>
			<UserPageHeader title={t(pageTitle)} />

			<PageContent classNames={{ wrapper: 'px-0' }}>
				<div className="w-full flex flex-col flex-1">
					<Header />
					<Warning />
					<Navbar
						menu={[
							{
								label: 'Stats',
								link: route('account.tipsterProfile.stats'),
								active: 'tipster.profile.stats',
							},
							{
								label: 'Picks',
								link: route('account.tipsterProfile.picks'),
								active: 'tipster.profile.picks',
							},
							{
								label: 'Servicio',
								link: route('account.tipsterProfile.service'),
								active: 'tipster.profile.service',
							},
						]}
					/>

					<div className="px-5 md:flex md:justify-center 2xl:px-0">
						<div className="max-w-5xl gap-10 pt-5 md:flex-1">
							<div className="flex-1 pt-8">
								{activeTab === 'stats' && <StatsContent />}
								{activeTab === 'picks' && <PicksContent />}
								{activeTab === 'service' && <ServiceContent />}
							</div>

							{/* <Sidebar /> */}
						</div>
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
