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

export const StatsMoment = () => {
	const { stats } = usePage<{ stats: Stat[] }>().props

	const tableData = [
		{ ...initialContent, bet_type: 'pre_match', id: 'pre_match' },
		{ ...initialContent, bet_type: 'live', id: 'live' },
		// { ...initialContent, bet_type: 'long_term', id: 'long_term' },
	]

	stats.forEach((stat: Stat) => {
		const idx = tableData.findIndex((e) => e.bet_type === stat.bet_type)

		tableData[idx] = {
			...tableData[idx],
			total_picks: tableData[idx].total_picks + stat.total_picks,
			profit: (tableData[idx].profit || 0) + stat.profit,
			yield: (tableData[idx].yield || 0) + stat.yield,
			average_stake: (tableData[idx].average_stake || 0) + stat.average_stake,
			average_odds: (tableData[idx].average_odds || 0) + stat.average_odds,
			win_rate: (tableData[idx].win_rate || 0) + stat.win_rate,
		}
	})

	// const filteredData = tableData.filter((item) => item.total_picks > 0)
	const filteredData = tableData

	return (
		<div className="">
			<h3 className="font-bold">Stake</h3>

			<TableContent
				{...{
					data: filteredData,
					reloadOnly: [],
					radius: 'none',
					columns: [
						{ key: 'bet_type', label: 'Tipo' },
						{ key: 'total_picks', label: 'Apuestas' },
						{ key: 'profit', label: 'Beneficio (USD)' },
						{ key: 'yield', label: 'Yield' },
						{ key: 'average_stake', label: 'Stake medio' },
						{ key: 'average_odds', label: 'Cuota media' },
						{ key: 'win_rate', label: 'Win rate' },
					],
					cell: (item: any, key: any) => {
						switch (key) {
							case 'bet_type':
								if (item.bet_type === 'pre_match')
									return <p className="truncate">Pre partido</p>
								if (item.bet_type === 'live')
									return <p className="truncate">Live</p>
								if (item.bet_type === 'long_term')
									return <p className="truncate">Long term</p>
							case 'total_picks':
								return (
									<p className="truncate">
										{numeral(item.total_picks).format('0,0')}
									</p>
								)
							case 'profit':
								return (
									<Chip
										size="sm"
										radius="none"
										color={item.profit >= 0 ? 'success' : 'danger'}
									>
										{item.profit >= 0 ? '+' : ''}
										{numeral(item.profit).format('0,0.00')} uds
									</Chip>
								)
							case 'yield':
								return (
									<Chip
										size="sm"
										radius="none"
										color={item.yield >= 0 ? 'success' : 'danger'}
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
										color={item.win_rate >= 50 ? 'success' : 'danger'}
										className="[&>span]:font-semibold"
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
