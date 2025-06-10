import { PageContent } from '@/components'
import { t } from '@/i18n'
import { GuestLayout } from '@/layouts'
import {
	Header,
	Navbar,
	PicksContent,
	ServiceContent,
	StatsContent,
	Warning,
} from './components/TipsterProfile'

import type { PageProps, User } from '@/types'
import type { Tipster } from '@/types/tipsters'

interface Props extends PageProps {
	userTipster: User
	tipster: Tipster
	activeTab: string
}

const Page = ({ userTipster, activeTab = 'stats' }: Props) => {
	return (
		<>
			<PageContent
				classNames={{ wrapper: 'p-0 [&>div]:justify-center md:p-0' }}
			>
				<div className="w-full">
					<Header />

					<Warning />

					<Navbar
						menu={[
							{
								label: 'Stats',
								link: route('tipster.profile.stats', {
									username: userTipster.username,
								}),
								active: 'tipster.profile.stats',
							},
							{
								label: 'Picks',
								link: route('tipster.profile.picks', {
									username: userTipster.username,
								}),
								active: 'tipster.profile.picks',
							},
							{
								label: 'Servicio',
								link: route('tipster.profile.service', {
									username: userTipster.username,
								}),
								active: 'tipster.profile.service',
							},
						]}
					/>

					<div className="px-5 md:flex md:justify-center 2xl:px-0">
						<div className="max-w-5xl gap-10 pt-5 md:flex-1">
							{activeTab === 'stats' && <StatsContent />}
							{activeTab === 'picks' && <PicksContent />}
							{activeTab === 'service' && <ServiceContent />}

							{/* <Sidebar /> */}
						</div>
					</div>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout
		{...{
			children: page,
			pageTitle: t(page.props.userTipster.username).toString(),
		}}
	/>
)

export default Page
