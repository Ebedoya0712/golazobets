import { PickCard, PickCardBlocked } from '@/pages/picks/components'
import { router, usePage } from '@inertiajs/react'
import { Pagination } from '@nextui-org/react'

import type { PageProps } from '@/types'
import type { Pick } from '@/types/picks.d'

interface PicksProps extends PageProps {
	picks: {
		data: Pick[]
		last_page: number
		current_page: number
	}
}

export const PicksContent = () => {
	const { tipster, picks } = usePage<PicksProps>().props

	return (
		<section>
			<div className="grid justify-center gap-6 md:grid-cols-2">
				{picks.data.map((pick) => {
					return pick.blocked ? (
						<PickCardBlocked key={pick.id} data={pick} />
					) : (
						<PickCard key={pick.id} data={pick} />
					)
				})}
			</div>

			{picks.last_page > 1 && (
				<div className="flex justify-end mt-10">
					<Pagination
						variant="light"
						total={picks.last_page}
						page={picks.current_page}
						onChange={(page) => {
							router.reload({
								only: ['picks'],
								data: { page },
								onFinish: () => {
									window.scrollTo({ top: 600, behavior: 'smooth' })
								},
							})
						}}
					/>
				</div>
			)}
		</section>
	)
}
