import { GuestLayout } from '@/layouts'
import { PageHeader, PageContent } from '@/components'
import { Pagination } from '@nextui-org/react'
import { router } from '@inertiajs/react'
import { PickCard } from './components'

import type { Pick } from '@/types/picks.d'

const pageTitle = 'Apuestas gratis'

type Props = {
	picks: {
		data: Pick[]
		last_page: number
		current_page: number
		next_page_url: number | null
	}
}

const Page = ({ picks }: Props) => {
	return (
		<>
			<PageHeader title={pageTitle} />

			<PageContent
				className="!p-0 [&>div]:justify-center [&>div]:h-full"
				bottomSpacerClassName="h-0"
			>
				<div className="flex flex-1 h-full">
					<div className="flex-1 h-full px-10 pb-20">
						<div className="grid grid-cols-4 gap-5 mt-8 3xl:grid-cols-5">
							{picks.data.map((pick) => (
								<PickCard
									key={pick.id}
									{...{
										data: {
											...pick,
											tipster_name: pick.tipster.user.username ?? '',
										},
									}}
								/>
							))}
						</div>

						<div className="flex justify-end mt-6">
							<Pagination
								loop
								showControls
								showShadow={false}
								variant="light"
								total={picks.last_page}
								initialPage={picks.current_page}
								onChange={(page) => {
									router.reload({
										data: { page },
										only: ['picks'],
									})
								}}
							/>
						</div>
					</div>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout {...{ children: page, pageTitle: pageTitle }} />
)

export default Page
