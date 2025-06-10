import { t } from '@/i18n'
import { Link, usePage } from '@inertiajs/react'
import { Button, Input, Select, SelectItem, Slider } from '@nextui-org/react'
import { useFilters } from '../hooks/useFilters'

import type { PageProps } from '@/types'
import type { Sport } from '@/types/sports.d'

export const Sidebar = () => {
	const { props } = usePage<PageProps>()
	const { pageData, sports } = props
	const buttonLink = pageData.linkToOtherTypeOfTipsters
	const { filters, setFilters, clearFilters, order } = useFilters()

	return (
		<aside className="border-l border-divider w-[300px] min-h-screen pl-4 pr-6 py-8 -min-h-[100dvh] sticky top-14">
			<Button fullWidth as={Link} href={route(buttonLink.link)} color="primary">
				{buttonLink.label}
			</Button>

			<div className="mt-5 space-y-5">
				{/* Username */}
				<Input
					label="Buscar por usuario"
					startContent={<i className="ri-search-line" />}
					description={t('Presiona ENTER para buscar')}
					labelPlacement="outside"
					className="pt-5"
					value={filters.username}
					isClearable
					pattern="^[a-zA-Z0-9]*$"
					onValueChange={(val) => {
						const alphanumericValue = val.replace(/[^a-zA-Z0-9]/g, '')
						setFilters({ ...filters, username: alphanumericValue })
					}}
					onClear={() => setFilters({ ...filters, username: '' })}
				/>

				{/* Order by */}
				<Select
					label="Ordenar por"
					defaultSelectedKeys={[filters.order_by?.toString() ?? '']}
					labelPlacement="outside"
					startContent={<i className="ri-sort-desc" />}
					className="pt-5"
					disallowEmptySelection
					onSelectionChange={(value) =>
						setFilters({
							...filters,
							order_by: value.anchorKey as 'profit' | 'picks' | 'yield',
						})
					}
				>
					{order.map((e) => (
						<SelectItem key={e.key} selectedIcon={<></>}>
							{t(e.label)}
						</SelectItem>
					))}
				</Select>

				{/* ................. */}
				<div className="h-8 flex items-end gap-3">
					<span className="text-xs font-semibold">FILTROS</span>
					<span className="border-t border-gray-200 w-full flex-1 flex mb-0.5"></span>
				</div>

				{/* Sports */}
				<Select
					label={t('Deporte')}
					labelPlacement="outside"
					startContent={<></>}
					defaultSelectedKeys={[filters.sport_id?.toString() ?? '']}
					onSelectionChange={(value) => {
						setFilters({
							...filters,
							// @ts-ignore
							sport_id: !value.size ? '0' : Number(value.anchorKey),
						})
					}}
					className="pt-5"
				>
					{sports.map((sport: Sport) => (
						<SelectItem key={sport.id} selectedIcon={<></>}>
							{sport.name}
						</SelectItem>
					))}
				</Select>

				{/* Profit */}
				<Slider
					label={t('Beneficio')}
					color="primary"
					size="sm"
					showTooltip
					minValue={0}
					maxValue={500}
					className="w-full"
					onChangeEnd={(val: number | number[]) => {
						if (Array.isArray(val)) {
							setFilters({ ...filters, profit: val[0] })
						} else {
							setFilters({ ...filters, profit: val })
						}
					}}
					classNames={{
						labelWrapper: 'justify-start gap-x-2',
						label: 'after:content-[":"]',
						value: 'font-bold',
					}}
				/>

				{/* Picks */}
				<Slider
					label={t('Apuestas')}
					color="primary"
					size="sm"
					showTooltip
					minValue={0}
					maxValue={500}
					className="w-full"
					onChangeEnd={(val: number | number[]) => {
						if (Array.isArray(val)) {
							setFilters({ ...filters, picks: val[0] })
						} else {
							setFilters({ ...filters, picks: val })
						}
					}}
					classNames={{
						labelWrapper: 'justify-start gap-x-2',
						label: 'after:content-[":"]',
						value: 'font-bold',
					}}
				/>

				{/* Yield */}
				<Slider
					label={t('Yield')}
					color="primary"
					size="sm"
					showTooltip
					minValue={0}
					maxValue={500}
					className="w-full"
					onChangeEnd={(val: number | number[]) => {
						if (Array.isArray(val)) {
							setFilters({ ...filters, yield: val[0] })
						} else {
							setFilters({ ...filters, yield: val })
						}
					}}
					classNames={{
						labelWrapper: 'justify-start gap-x-2',
						label: 'after:content-[":"]',
						value: 'font-bold',
					}}
				/>

				<Button
					fullWidth
					size="sm"
					startContent={<i className="ri-filter-off-line ri-xl" />}
					onPress={() => clearFilters()}
				>
					Borrar filtros
				</Button>
			</div>

			<div className="h-10" />
		</aside>
	)
}
