import { PageContent, PageHeader } from '@/components'
import { ErrorMessage, Wysiwyg } from '@/components/form'
import { ImageUploader } from '@/components/uploaders'
import { t } from '@/i18n'
import { Head, Link, usePage } from '@inertiajs/react'
import { getLocalTimeZone, now } from '@internationalized/date'
import {
	Button,
	DatePicker,
	Input,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Slider,
	cn,
} from '@nextui-org/react'
import { I18nProvider } from '@react-aria/i18n'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { PickPreview } from './components'
import { useData } from './hooks'

import { PageProps } from '@/types'
import type { Bookie } from '@/types/bookies.d'
import type { Pick } from '@/types/picks.d'
import type { Sport } from '@/types/sports.d'

const pageTitle = 'Nuevo pick'

type Props = {
	sports: Sport[]
	bookies: Bookie[]
}

const Page = ({ sports, bookies }: Props) => {
	const { data, setData, errors, clearErrors, processing, submit } = useData()

	const { auth } = usePage<PageProps>().props
	const { user } = auth

	useEffect(() => clearErrors('sport_id'), [data.sport_id])
	useEffect(() => clearErrors('competition'), [data.competition])
	useEffect(() => clearErrors('event'), [data.event])
	useEffect(() => clearErrors('pick'), [data.pick])
	useEffect(() => clearErrors('bookie_id'), [data.bookie_id])
	useEffect(() => clearErrors('odds'), [data.odds])
	useEffect(() => clearErrors('event_date'), [data.event_date])
	useEffect(() => clearErrors('screenshot'), [data.screenshot])

	return (
		<>
			<Head title="Nuevo pick" />

			<PageHeader title={t(pageTitle)}>
				<div className="flex justify-end">
					<Button
						color="primary"
						isDisabled={processing}
						as={Link}
						href={route('account.picks.index')}
						startContent={<i className="ri-arrow-left-line" />}
					>
						{t('Cancelar')}
					</Button>
				</div>
			</PageHeader>

			<PageContent
				bottomSpacerClassName="h-0"
				className="h-[calc(100dvh-140px)] px-0 [&>div]:h-full overflow-hidden md:py-0"
			>
				<div className="h-full flex-1 flex gap-10">
					<form
						onSubmit={submit}
						className="w-[500px] h-full relative xl:w-[600px]"
					>
						<div className="scrollbar-thumb-gray-300 scrollbar-thumb-rounded scrollbar-thin h-full overflow-y-scroll">
							<div className="space-y-6 pr-6 pl-2 pt-10 pb-36 select-none">
								{/* Deporte */}
								<Select
									defaultSelectedKeys={
										data.sport_id ? [data.sport_id.toString()] : undefined
									}
									items={sports}
									label={t('Deporte')}
									disallowEmptySelection
									onSelectionChange={(value) =>
										setData('sport_id', Number(value.anchorKey))
									}
									isInvalid={!!errors.sport_id}
									errorMessage={t(String(errors.sport_id))}
								>
									{sports.map((sport) => (
										<SelectItem key={sport.id} selectedIcon={<></>}>
											{sport.name}
										</SelectItem>
									))}
								</Select>

								{/* Tipo */}
								<RadioGroup
									size="sm"
									label={t('Tipo')}
									defaultValue={data.sub_type}
									orientation="horizontal"
									onValueChange={(value: string) => {
										setData('sub_type', value as Pick['sub_type'])
									}}
									isInvalid={!!errors.sub_type}
									errorMessage={t(String(errors.sub_type))}
								>
									<Radio value="simple">Simple</Radio>
									<Radio value="combined">Combinada</Radio>
								</RadioGroup>

								{/* Momento */}
								<RadioGroup
									size="sm"
									label={t('Tipo de apuesta')}
									defaultValue={data.bet_type}
									orientation="horizontal"
									isRequired
									onValueChange={(value: string) => {
										setData('bet_type', value as Pick['bet_type'])
									}}
									isInvalid={!!errors.bet_type}
									errorMessage={t(String(errors.bet_type))}
								>
									<Radio value="pre_match">Pre partido</Radio>
									<Radio value="live">Live</Radio>
									<Radio value="long_term">A largo plazo</Radio>
								</RadioGroup>

								{/* Competición */}
								<Input
									label={t('Competición')}
									isRequired
									onValueChange={(value) => setData('competition', value)}
									isInvalid={!!errors.competition}
									errorMessage={t(String(errors.competition))}
								/>

								{/* Evento */}
								<Input
									label={t('Evento')}
									isRequired
									onValueChange={(value) => setData('event', value)}
									isInvalid={!!errors.event}
									errorMessage={t(String(errors.event))}
								/>

								{/* Pronóstico */}
								<Input
									label={t('Pronóstico')}
									isRequired
									onValueChange={(value) => setData('pick', value)}
									isInvalid={!!errors.pick}
									errorMessage={t(String(errors.pick))}
								/>

								{/* Stake */}
								<div className="pl-2">
									<Slider
										label={t('Stake')}
										step={0.25}
										maxValue={10}
										minValue={0.25}
										defaultValue={data.stake ?? 1}
										showTooltip={true}
										size="sm"
										marks={[
											{ value: 0.25, label: '0.25' },
											{ value: 10, label: '10' },
										]}
										onChange={(value) => setData('stake', Number(value))}
										classNames={{
											labelWrapper: 'justify-start gap-x-2',
											label: 'after:content-[":"]',
											value: 'font-bold',
										}}
									/>
								</div>

								{/* Casa de apuestas */}
								<Select
									items={bookies}
									label={t('Casa de apuestas')}
									onSelectionChange={(value) =>
										setData('bookie_id', Number(value.anchorKey))
									}
									isInvalid={!!errors.bookie_id}
									errorMessage={t(String(errors.bookie_id))}
								>
									{bookies.map((bookie) => (
										<SelectItem key={bookie.id} selectedIcon={<></>}>
											{bookie.name}
										</SelectItem>
									))}
								</Select>

								{/* Cuota */}
								<Input
									label={t('Cuota')}
									isRequired
									value={data.odds ? data.odds?.toString() : ''}
									onValueChange={(value) => {
										const numericValue = value
											.replace(/[^0-9,.]/g, '') // Allow numbers, commas and dots
											.replace(/,/g, '.') // Replace all commas with dots
											.replace(/\.(?=.*\.)/g, '') // Keep only the last dot
										setData('odds', numericValue)
									}}
									onFocus={(e) => {
										// @ts-ignore
										if (e.target.value === '0') {
											// @ts-ignore
											e.target.value = ''
											setData('odds', '')
										}
									}}
									onBlur={(e) => {
										// @ts-ignore
										if (e.target.value === '') {
											// @ts-ignore
											e.target.value = '0'
											setData('odds', '0')
										}
									}}
									isInvalid={!!errors.odds}
									errorMessage={t(String(errors.odds))}
								/>

								{/* Fecha */}
								<I18nProvider locale="es">
									<DatePicker
										label={t('Fecha')}
										isRequired
										hideTimeZone
										showMonthAndYearPickers
										defaultValue={
											// data.event_date
											// 	? parseDateTime(String(data.event_date))
											// 	: now(getLocalTimeZone())
											now(getLocalTimeZone())
										}
										// defaultValue={now(getLocalTimeZone())}
										onChange={(date) => {
											const jsDate = date.toDate()

											setData(
												'event_date',
												dayjs(jsDate).format('YYYY-MM-DD HH:mm:ss')
											)
										}}
										isInvalid={!!errors.event_date}
										errorMessage={t(String(errors.event_date))}
									/>
								</I18nProvider>

								{/* Análisis */}
								<div className="space-y-2">
									<label className="text-sm font-medium">{t('Análisis')}</label>
									<Wysiwyg
										{...{ headings: false, link: false, charactersLimit: 400 }}
										onUpdate={(value) => setData('analysis', value)}
									/>
								</div>

								{/* Captura de pantalla */}
								<div className="space-y-2">
									<span className="text-sm font-medium">
										Adjuntar captura de pantalla de la apuesta realizada
									</span>
									<ImageUploader
										classNames={{
											base: cn(
												' w-full',
												errors.screenshot
													? 'bg-danger-50 border-danger-50 [&_.ri-image-add-line]:!text-white'
													: 'bg-default-100 border-default-100'
											),
										}}
										accept={{
											'image/jpeg': ['.jpeg', '.jpg'],
											'image/png': ['.png'],
											'image/webp': ['.webp'],
										}}
										onFileUpload={(image) => {
											if (image) {
												const blobImage = new Blob([image], {
													type: image.type,
												})

												setData('screenshot', blobImage)
											} else {
												setData('screenshot', null)
											}
										}}
									/>

									{errors.screenshot && (
										<ErrorMessage error={errors.screenshot} />
									)}
								</div>
							</div>
						</div>

						<div className="bg-white px-8 py-6 flex justify-between inset-x-0 bottom-0 absolute shadow-xl z-10">
							<Button
								color="default"
								variant="flat"
								isDisabled={processing}
								as={Link}
								href={route('account.picks.index')}
							>
								{t('Cancelar')}
							</Button>

							<Button
								color="primary"
								type="submit"
								className="px-10"
								isDisabled={processing}
							>
								{t('Guardar')}
							</Button>
						</div>
					</form>

					<div className="flex flex-1 justify-center items-center">
						<div className="w-[440px] shadow-lg flex-shrink-0">
							<PickPreview
								{...{
									data: {
										...data,
										tipster_name: user ? user.username : '',
										profile_picture: user ? user.profile_picture : '',
									},
								}}
							/>
						</div>
					</div>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => {
	return page
}

export default Page
