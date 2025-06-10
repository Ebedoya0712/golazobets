import { PageContent, PageHeader } from '@/components'
import { t } from '@/i18n'
import { GuestLayout } from '@/layouts'
import { router } from '@inertiajs/react'
import { Pagination } from '@nextui-org/react'
import { Sidebar, TipsterCard } from './components'

import type { Tipster } from '@/types/tipsters'

type Props = {
	pageData: {
		title: string
		linkToOtherTypeOfTipsters: { label: string; link: string }
	}

	tipsters: {
		data: Tipster[]
		last_page: number
		current_page: number
		next_page_url: number | null
		links: {
			active: boolean
			label: string
			url: string
		}[]
	}
}

const Page = ({ pageData, tipsters }: Props) => {
	return (
		<>
			<PageHeader title={t(pageData.title ?? 'Tipsters')} />

			<PageContent
				className="!p-0 [&>div]:justify-center [&>div]:h-full"
				bottomSpacerClassName="h-0"
			>
				<div className="flex flex-1 h-full">
					<div className="flex-1 h-full px-10 pb-20">
						<div className="grid grid-cols-4 gap-5 mt-8">
							{tipsters.data.map((tipster) => (
								<TipsterCard {...{ tipster }} key={tipster.id} />
							))}
						</div>

						{tipsters.links.length > 3 && (
							<div className="pt-7 flex justify-end">
								<Pagination
									loop
									showControls
									showShadow={false}
									variant="light"
									initialPage={tipsters.current_page}
									total={tipsters.last_page}
									onChange={(page) => {
										router.reload({
											data: { page },
											only: ['tipsters'],
										})
									}}
								/>
							</div>
						)}
					</div>

					<div>
						<Sidebar />
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
			pageTitle: page.props.pageData.title,
		}}
	/>
)

export default Page
