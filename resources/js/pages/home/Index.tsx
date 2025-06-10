import { GuestLayout } from '@/layouts'
import { t } from '@/i18n'
import { router } from '@inertiajs/react'
import { PageProps } from '@/types'
import { useColorMode } from '@/hooks'
import {
	Hero,
	FeaturedTipsters,
	TipsterSearch,
	FeaturedPicks,
	CallToAction,
} from './components'

const pageTitle = 'Welcome'

const Page = ({ auth }: PageProps) => {
	useColorMode()

	return (
		<div
			className={`[&>section]:flex [&>section]:justify-center 
		[&>section>div]:flex-1 [&>section>div]:max-w-4xl [&>section>div]:px-6 
		xl:[&>section>div]:px-0 xl:[&>section>div]:max-w-5xl`}
		>
			<Hero />
			<FeaturedTipsters />
			<TipsterSearch />
			<FeaturedPicks />
			<CallToAction />
		</div>
	)
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
