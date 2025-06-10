import { usePage } from '@inertiajs/react'
import { Button, Slider } from '@nextui-org/react'
import numeral from 'numeral'
import ReactApexChart from 'react-apexcharts'
import { useSidebar } from '../../hooks/useSidebar'

import type { PageProps } from '@/types'
import { useRef, useState } from 'react'

export const Sidebar = () => {
	const props = usePage<PageProps>().props
	const { hasSubscription, tipster } = props
	const [isSubscribing, setIsSubscribing] = useState(0)
	const [amount, setAmount] = useState(1)
	const [calculatorResult, setCalculatorResult] = useState(0)
	const {
		average_stake,
		profit,
		total_bet,
		win_rate,
		yield: yield_rate,
	} = tipster.tipster_stats

	const { getWinRateChartOptions, balanceChart } = useSidebar()

	const totalBets = useRef(total_bet / average_stake)
	const winRateWon = useRef(totalBets.current * (win_rate / 100))
	const winRateLost = useRef(total_bet - winRateWon.current)
	const chartSeries = [
		numeral(winRateWon.current).value(),
		numeral(winRateLost.current).value(),
	].map((value) => Math.round(value || 0))

	return (
		<aside className="w-72 pt-6">
			<div className="sticky top-20 space-y-5">
				<div className="flex justify-between items-end font-bold">
					<div className="">Balance</div>
					<div className="">+{profit} usd</div>
				</div>

				{/* <ReactApexChart
				options={{ ...balanceChart(profit) }}
				series={[
					{
						data: [10, 15, 12, 25, 32, 40], // Replace with your actual profit data array
					},
				]}
				height={64}
			/> */}

				<div className="px-3">
					<ReactApexChart
						options={{ ...getWinRateChartOptions(win_rate) }}
						series={chartSeries}
						type="donut"
					/>
				</div>

				<div className="space-y-3">
					<div className="font-bold">Calcula tu beneficio</div>
					<p className="text-sm">
						Descubre cuánto habrías ganado si hubieras apostado{' '}
						<b>{amount}&euro;</b> por unidad
					</p>

					<Slider
						aria-label="Calculator"
						className="max-w-md"
						value={amount}
						showSteps
						maxValue={100}
						minValue={1}
						size="sm"
						step={1}
						onChange={(e) => setAmount(Number(e))}
						classNames={{
							labelWrapper: 'justify-start gap-x-2',
							label: 'after:content-[":"]',
							value: 'font-bold',
						}}
					/>

					{calculatorResult > 0 && (
						<div className="text-3xl font-bold">
							{calculatorResult}
							<span className="text-2xl">&euro;</span>
						</div>
					)}

					<Button
						fullWidth
						color="primary"
						onPress={() =>
							setCalculatorResult(
								Number(
									numeral((amount * total_bet * yield_rate) / 100).format(
										'0.00'
									)
								) || 0
							)
						}
					>
						Calcular
					</Button>
				</div>
			</div>
		</aside>
	)
}
