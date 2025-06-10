import { TableContent } from '@/components'
import { usePage } from '@inertiajs/react'
import numeral from 'numeral'

import { Stat } from '@/types/stats.d'
import { Chip } from '@nextui-org/react'

export const StatsStake = () => {
	const { stats } = usePage<{ stats: Stat[] }>().props

	const tableData = [...stats].sort((a, b) => {
		if (a.year !== b.year) {
			return b.year - a.year
		}
		return b.month - a.month
	})

	return (
		<div className="">
			<h3 className="font-bold">Stake</h3>

			<TableContent
				{...{
					data: tableData,
					reloadOnly: [],
					radius: 'none',
					columns: [
						{ key: 'average_stake', label: 'Stake' },
						{ key: 'profit', label: 'Beneficio' },
						{ key: 'yield', label: 'Yield' },
						{ key: 'average_odds', label: 'Cuota p.' },
						{ key: 'win_rate', label: 'Aciertos' },
						{ key: 'total_picks', label: 'Picks' },
					],
					cell: (item: any, key: any) => {
						switch (key) {
							case 'average_stake':
								return (
									<p className="min-w-20 truncate">
										{numeral(item.average_stake).format('0.00')}
									</p>
								)
							case 'profit':
								return (
									<Chip
										size="sm"
										radius="none"
										color={item.profit > 0 ? 'success' : 'danger'}
										className="[&>span]:font-semibold"
									>
										{numeral(item.profit).format('+0,0.00')} uds
									</Chip>
								)
							case 'yield':
								return (
									<Chip
										size="sm"
										radius="none"
										color={item.yield > 0 ? 'success' : 'danger'}
										className="[&>span]:font-semibold"
									>
										{numeral(item.yield).format('0.00')} %
									</Chip>
								)
							case 'average_odds':
								return (
									<p className="truncate">
										{numeral(item.average_odds).format('0.00')}
									</p>
								)
							case 'win_rate':
								return (
									<Chip
										size="sm"
										radius="none"
										color={
											item.win_rate > 50
												? 'success'
												: item.win_rate >= 40
												? 'warning'
												: 'danger'
										}
									>
										{numeral(item.win_rate).format('0.00')} %
									</Chip>
								)
							case 'total_picks':
								return <p className="truncate">{item.total_picks}</p>
						}
					},
					removeWrapper: true,
					classNames: {
						base: 'mt-4',
						th: '!rounded-none',
						tr: 'data-[middle]:border-t data-[last]:border-t border-divider',
					},
				}}
			/>
		</div>
	)
}
