import { TableContent } from '@/components'
import { usePage } from '@inertiajs/react'
import numeral from 'numeral'

import { Stat } from '@/types/stats.d'
import { Chip } from '@nextui-org/react'

const initialContent = {
	total_picks: 0,
	profit: 0,
	yield: 0,
	average_stake: 0,
	average_odds: 0,
	win_rate: 0,
}

export const StatsOdd = () => {
	const { stats } = usePage<{ stats: Stat[] }>().props

	const minOdd = Math.floor(Math.min(...stats.map((s) => s.average_odds)))
	const maxOdd = Math.ceil(Math.max(...stats.map((s) => s.average_odds)))
	const step = 0.5

	const tableData: {
		total_picks: number
		profit: number
		yield: number
		average_stake: number
		average_odds: number
		win_rate: number
		odd?: string
		min: number
		max: number
		id: string
	}[] = []

	for (let i = minOdd; i < maxOdd; i += step) {
		tableData.push({
			...initialContent,
			odd: `${i.toFixed(1)}-${(i + step).toFixed(1)}`,
			min: i,
			max: i + step,
			id: `${i}-${i + step}`,
		})
	}

	stats.forEach((stat: Stat) => {
		const idx = tableData.findIndex(
			(e) => stat.average_odds >= e.min && stat.average_odds < e.max
		)

		if (idx !== -1) {
			const newTotalPicks = tableData[idx].total_picks + stat.total_picks

			const totalBet =
				tableData[idx].total_picks * tableData[idx].average_stake +
				stat.total_picks * stat.average_stake

			tableData[idx] = {
				...tableData[idx],
				total_picks: newTotalPicks,
				profit: tableData[idx].profit + stat.profit,
				yield:
					totalBet > 0
						? ((tableData[idx].profit + stat.profit) / totalBet) * 100
						: 0,
				average_stake:
					newTotalPicks > 0
						? (tableData[idx].average_stake * tableData[idx].total_picks +
								stat.average_stake * stat.total_picks) /
						  newTotalPicks
						: 0,
				average_odds:
					newTotalPicks > 0
						? (tableData[idx].average_odds * tableData[idx].total_picks +
								stat.average_odds * stat.total_picks) /
						  newTotalPicks
						: 0,
				win_rate:
					newTotalPicks > 0
						? (tableData[idx].win_rate * tableData[idx].total_picks +
								stat.win_rate * stat.total_picks) /
						  newTotalPicks
						: 0,
			}
		}
	})

	const filteredData = tableData.filter((item) => item.total_picks > 0)

	return (
		<div className="">
			<h3 className="font-bold">Stake</h3>

			<TableContent
				{...{
					data: filteredData,
					reloadOnly: [],
					radius: 'none',
					columns: [
						{ key: 'odd', label: 'Cuota' },
						{ key: 'total_picks', label: 'Apuestas' },
						{ key: 'profit', label: 'Beneficio (UDS)' },
						{ key: 'yield', label: 'Yield' },
						{ key: 'average_stake', label: 'Stake medio' },
						{ key: 'average_odds', label: 'Cuota media' },
						{ key: 'win_rate', label: 'Win rate' },
					],
					cell: (item: any, key: any) => {
						switch (key) {
							case 'odd':
								return <p className="min-w-20 truncate">{item.odd}</p>
							case 'total_picks':
								return <p className="truncate">{item.total_picks}</p>
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
							case 'average_stake':
								return (
									<p className="truncate">
										{numeral(item.average_stake).format('0.00')}
									</p>
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
