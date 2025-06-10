import { ApexOptions } from 'apexcharts'
import numeral from 'numeral'

export const useSidebar = () => {
	const getWinRateChartOptions = (win_rate: number): ApexOptions => ({
		chart: {
			type: 'donut',
			background: 'transparent',
		},
		colors: ['#5CD1A5', '#FE4343'],
		labels: ['Won', 'Lost'],
		dataLabels: { enabled: false },
		tooltip: { enabled: false },
		plotOptions: {
			pie: {
				donut: {
					size: '65%',
					labels: {
						show: true,
						name: {
							show: true,
							fontSize: '14px',
							fontFamily: 'Helvetica, Arial, sans-serif',
							color: '#000000',
							offsetY: -10,
						},
						value: {
							show: true,
							fontSize: '28px',
							fontFamily: 'Helvetica, Arial, sans-serif',
							color: '#373d3f',
							offsetY: 6,
						},
						total: {
							show: true,
							label: 'Win rate',
							formatter: () => `${numeral(win_rate).format('0')}%`,
						},
					},
				},
			},
		},
		stroke: {
			width: 2,
			colors: ['#ffffff'],
		},
		legend: {
			show: false,
		},
	})

	const balanceChart = (balance: number) => ({
		chart: {
			type: 'area',
			sparkline: {
				enabled: !0,
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		series: [
			{
				data: balance,
			},
		],
		colors: ['#5CD1A5'],
		yaxis: {
			max: 1000,
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 0.9,
				opacityFrom: 0.7,
				opacityTo: 0.7,
				stops: [0, 90, 100],
			},
		},
		tooltip: {
			enabled: false,
		},
	})

	return {
		getWinRateChartOptions,
		balanceChart,
	}
}
