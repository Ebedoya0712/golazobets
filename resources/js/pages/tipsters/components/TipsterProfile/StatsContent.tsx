import { t } from '@/i18n'
import { Tab, Tabs } from '@nextui-org/react'
import { StatsMoment, StatsMonthly, StatsOdd, StatsStake } from '.'

export const StatsContent = () => {
	return (
		<Tabs
			aria-label="Stats"
			color="primary"
			variant="light"
			defaultSelectedKey="month"
			classNames={{
				panel: 'w-full overflow-x-scroll',
				tabList: 'gap-0',
				tab: '[&>div]:text-gray-500 text-base font-bc font-semibold uppercase px-4',
			}}
		>
			<Tab key="month" title={t('Mes')}>
				<StatsMonthly />
			</Tab>

			<Tab key="moment" title={t('Tipo de apuesta')}>
				<StatsMoment />
			</Tab>

			<Tab key="stake" title={t('Stake')}>
				<StatsStake />
			</Tab>

			<Tab key="odd" title={t('Cuota')}>
				<StatsOdd />
			</Tab>
		</Tabs>
	)
}
