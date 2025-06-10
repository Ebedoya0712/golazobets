import { t } from '@/i18n'
import { router, usePage } from '@inertiajs/react'
import { cn, Input, Select, SelectItem } from '@nextui-org/react'
import { FormEvent, useState } from 'react'

import type { PageProps } from '@/types'
import type { Sport } from '@/types/sports.d'
type FormProps = {
	picks: string
	yield: string
	sport_id: string
}

export const TipsterSearch = () => {
	const props = usePage().props as PageProps
	const { sports } = props as unknown as { sports: Sport[] }
	const [activeCol, setActiveCol] = useState<number>(0)

	const [form, setForm] = useState<FormProps>({
		picks: '',
		yield: '',
		sport_id: '',
	})

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.visit(route('tipsters.premium', { filters: form }))
	}

	return (
		<section
			className="bg-primary pt-32 pb-20 -mt-24 -mb-7 flex justify-center overflow-hidden shadow-[0_14rem_0_#FFFFFF17_inset]
				md:shadow-[0_11.5rem_0_#FFFFFF20_inset]
				lg:pt-44 lg:pb-32 lg:shadow-none"
		>
			<div className="flex-1 lg:!px-0 --max-w-6xl">
				<form
					onSubmit={submit}
					className="grid gap-y-4 lg:grid-cols-5 lg:gap-x-8"
				>
					<div className="pb-8 relative lg:pb-0">
						<h3 className="text-secondary text-4xl font-bc font-medium text-pretty uppercase text-center leading-none select-none relative z-10 lg:text-left">
							{t('Encuentra el mejor tipster')}
						</h3>

						<div className="top-0 -right-3 absolute hidden lg:block">
							<div className="bg-white/15 w-[50vw] h-[430px] -top-48 relative" />
						</div>
					</div>

					<div className="flex justify-between items-center gap-x-10 relative lg:flex-col lg:justify-center lg:items-start lg:gap-y-5">
						<p
							className={`text-sm font-medium select-none relative z-10 ${
								1 === activeCol ? 'text-primary' : 'text-secondary'
							}`}
						>
							{t('Número de apuestas')}
						</p>

						<Input
							variant="underlined"
							onFocus={() => setActiveCol(1)}
							onBlur={() => setActiveCol(0)}
							aria-label="Número de apuestas"
							value={form.picks}
							onValueChange={(val) => {
								// Remove non-numeric characters
								const numericValue = val.replace(/\D/g, '')
								// Limit to 3 characters
								const truncatedValue = numericValue.slice(0, 3)
								// Apply max limit of 500 if needed
								const limitedValue =
									truncatedValue === ''
										? ''
										: Number(truncatedValue) > 500
										? '500'
										: truncatedValue
								// Format with thousands separator
								const formattedValue =
									limitedValue === ''
										? ''
										: Number(limitedValue).toLocaleString()
								setForm({ ...form, picks: formattedValue })
							}}
							classNames={{
								base: 'w-1/2 relative z-10 lg:w-full',
								inputWrapper:
									'!border-t-transparent !border-x-transparent !border-opacity-50',
								input:
									'!text-white font-bc text-xl font-semibold text-right md:text-3xl',
							}}
						/>

						<YellowIndicator {...{ active: activeCol, index: 1 }} />
					</div>

					<div className="flex justify-between items-center gap-x-10 relative lg:flex-col lg:justify-center lg:items-start lg:gap-y-5">
						<p
							className={`text-sm font-medium select-none relative z-10 ${
								2 === activeCol ? 'text-primary' : 'text-secondary'
							}`}
						>
							{t('Yield')}
						</p>

						<Input
							variant="underlined"
							onFocus={() => setActiveCol(2)}
							onBlur={() => setActiveCol(0)}
							aria-label="Yield"
							value={form.yield}
							onValueChange={(val) => {
								// Remove non-numeric characters
								const numericValue = val.replace(/\D/g, '')
								// Limit to 3 characters
								const truncatedValue = numericValue.slice(0, 3)
								// Apply max limit of 100 for percentage
								const limitedValue =
									truncatedValue === ''
										? ''
										: Number(truncatedValue) > 100
										? '100'
										: truncatedValue
								// Format with thousands separator
								const formattedValue =
									limitedValue === ''
										? ''
										: Number(limitedValue).toLocaleString()
								setForm({ ...form, yield: formattedValue })
							}}
							endContent={
								<span className="text-white font-bc text-xl font-semibold md:text-3xl">
									%
								</span>
							}
							classNames={{
								base: 'w-1/2 relative z-10 lg:w-full',
								inputWrapper:
									'!border-t-transparent !border-x-transparent !border-opacity-50',
								input:
									'!text-white font-bc text-xl font-semibold text-right md:text-3xl',
							}}
						/>

						<YellowIndicator {...{ active: activeCol, index: 2 }} />
					</div>

					<div className="flex justify-between items-center gap-x-10 relative lg:flex-col lg:justify-center lg:items-start lg:gap-y-5">
						<p
							className={`text-sm font-medium select-none relative z-10 ${
								3 === activeCol ? 'text-primary' : 'text-secondary'
							}`}
						>
							{t('Deporte')}
						</p>

						{/* Deporte */}
						<Select
							items={sports}
							variant="underlined"
							disallowEmptySelection
							aria-label="Deporte"
							classNames={{
								base: 'w-1/2 relative z-10 lg:w-full',
								trigger:
									'!border-t-transparent !border-x-transparent !border-opacity-50',
								value: '!text-white font-bc text-xl font-semibold md:text-2xl',
							}}
							selectorIcon={
								<div>
									<i className="ri-expand-up-down-line ri-lg text-white" />
								</div>
							}
							onOpenChange={(isOpen) =>
								isOpen ? setActiveCol(3) : setActiveCol(0)
							}
							disableSelectorIconRotation
							onFocus={() => setActiveCol(3)}
							onBlur={() => setActiveCol(0)}
							onSelectionChange={(value) => {
								setForm({
									...form,
									sport_id: value?.currentKey?.toString() ?? '',
								})
							}}
						>
							{sports.map((sport) => (
								<SelectItem key={sport.id} selectedIcon={<></>}>
									{sport.name}
								</SelectItem>
							))}
						</Select>

						<YellowIndicator {...{ active: activeCol, index: 3 }} />
					</div>

					<div className="flex justify-center mt-3 lg:mt-0 md:justify-start lg:items-center">
						<button
							className="text-white font-bc font-semibold leading-none uppercase text-left flex gap-x-2 items-center select-none
								lg:flex-col lg:items-start"
						>
							<span className="text-xl flex  gap-x-2 lg:text-xl lg:flex-row-reverse lg:justify-between lg:gap-x-5">
								<i className="ri-search-line lg:text-xl" /> {t('Exporar')}
							</span>
							<span className="text-xl lg:text-3xl lg:-mt-1.5">
								{t('Tipsters')}
							</span>
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

const YellowIndicator = ({ active, index }: YellowIndicatorProps) => {
	return (
		<div
			className={cn(
				'bg-secondary w-[calc(100%+25px)] h-[calc(100%+25px)] -left-[12.5px] -top-[12.5px] absolute opacity-0',
				index === active && 'opacity-100'
			)}
		/>
	)
}

type YellowIndicatorProps = {
	active: number
	index: number
}

const formatNumber = (value: string): string => {
	const numericValue = value.replace(/\D/g, '')
	return numericValue === '' ? '' : Number(numericValue).toLocaleString()
}
