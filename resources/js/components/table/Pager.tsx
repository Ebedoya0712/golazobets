import { Pagination } from '@nextui-org/react'
import { router } from '@inertiajs/react'

interface Props {
	links: {
		url: string
		label: string
		active: boolean
	}[]
	currentPage: number
	reloadOnly: string[]
}

export const Pager = ({ links, currentPage, reloadOnly }: Props) => {
	/**
	 *
	 * If links are less than 2, don't show pagination
	 *
	 */
	if (links.length - 2 < 2) return

	return (
		<div className="flex justify-between items-center">
			{links && (
				<div className="flex w-full justify-end">
					<Pagination
						size="sm"
						isCompact
						showControls
						showShadow
						variant="light"
						color="primary"
						page={currentPage}
						total={links.length - 2 || 0}
						classNames={{ wrapper: 'shadow-none' }}
						onChange={(page) =>
							router.reload({
								data: { page },
								only: reloadOnly,
							})
						}
					/>
				</div>
			)}
		</div>
	)
}
