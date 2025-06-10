import { PageContent, PageHeader, Toastify } from '@/components'
import { ErrorMessage, Wysiwyg } from '@/components/form'
import { ImageUploader } from '@/components/uploaders'
import { useColorMode } from '@/hooks'
import { t } from '@/i18n'
import { Head, Link } from '@inertiajs/react'
import { getLocalTimeZone, now, parseDateTime } from '@internationalized/date'
import {
	Button,
	cn,
	DatePicker,
	Input,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Slider,
} from '@nextui-org/react'
import { I18nProvider } from '@react-aria/i18n'
import { useEffect } from 'react'
import { useData } from './hooks'

import { PickPreview } from '@/pages/picks/components'
import type { Bookie } from '@/types/bookies.d'
import type { Pick } from '@/types/picks.d'
import type { Sport } from '@/types/sports.d'
import type { Tipster } from '@/types/tipsters.d'
import dayjs from 'dayjs'

const pageTitle = 'Editar pick'

type Props = {
	sports: Sport[]
	bookies: Bookie[]
	tipster: Tipster
}

const Page = ({ sports, bookies, tipster }: Props) => {
	const {
		data,
		setData,
		errors,
		clearErrors,
		processing,
		submit,
		destroyPick,
	} = useData()
	const { colorMode } = useColorMode()

	useEffect(() => clearErrors('sport_id'), [data.sport_id])
	useEffect(() => clearErrors('competition'), [data.competition])
	useEffect(() => clearErrors('event'), [data.event])
	useEffect(() => clearErrors('pick'), [data.pick])
	useEffect(() => clearErrors('bookie_id'), [data.bookie_id])
	useEffect(() => clearErrors('odds'), [data.odds])
	useEffect(() => clearErrors('event_date'), [data.event_date])
	useEffect(() => {
		if (data.screenshot) {
			clearErrors('screenshot')
			setData('screenshot_path', null)
		}
	}, [data.screenshot])

	return (
		<>
			<Head title="Editar pick" />

			<PageHeader title={t(pageTitle)}>
				<div className="flex justify-end">
					<Button
						size="sm"
						color="default"
						isDisabled={processing}
						startContent={<i className="ri-arrow-left-line" />}
						as={Link}
						href={route('admin.picks.index')}
					>
						{t('Volver a la lista de picks')}
					</Button>
				</div>
			</PageHeader>

			<PageContent bottomSpacerClassName="h-0">
				<div className="flex-1 flex gap-10">
					<form onSubmit={submit} className="w-[500px] relative">
						<div className=" scrollbar-thumb-gray-300 scrollbar-thumb-rounded scrollbar-thin h-[calc(100dvh-170px)] overflow-y-scroll">
							<div className="space-y-6 pr-6 pl-2 pt-2 pb-28">
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
									errorMessage={errors.sport_id}
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
									errorMessage={errors.sub_type}
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
									errorMessage={errors.bet_type}
								>
									<Radio value="pre_match">Pre</Radio>
									<Radio value="live">Live</Radio>
									<Radio value="long_term">A largo plazo</Radio>
								</RadioGroup>

								{/* Competición */}
								<Input
									label={t('Competición')}
									defaultValue={data.competition}
									onValueChange={(value) => setData('competition', value)}
									isInvalid={!!errors.competition}
									errorMessage={errors.competition}
								/>

								{/* Evento */}
								<Input
									label={t('Evento')}
									defaultValue={data.event}
									onValueChange={(value) => setData('event', value)}
									isInvalid={!!errors.event}
									errorMessage={errors.event}
								/>

								{/* Pronóstico */}
								<Input
									label={t('Pronóstico')}
									defaultValue={data.pick}
									onValueChange={(value) => setData('pick', value)}
									isInvalid={!!errors.pick}
									errorMessage={errors.pick}
								/>

								{/* Stake */}
								<div className="pl-2">
									<Slider
										label={t('Stake')}
										step={0.25}
										maxValue={10}
										minValue={0.25}
										defaultValue={data.stake || 1}
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

								{/* Bookie */}
								<Select
									defaultSelectedKeys={
										data.bookie_id ? [data.bookie_id.toString()] : undefined
									}
									items={bookies}
									label={t('Casa de apuestas')}
									onSelectionChange={(value) =>
										setData('bookie_id', Number(value.anchorKey))
									}
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
									defaultValue={String(data.odds)}
									onValueChange={(value) => setData('odds', Number(value))}
								/>

								{/* Fecha */}
								<I18nProvider locale="es">
									<DatePicker
										label={t('Fecha')}
										hideTimeZone
										showMonthAndYearPickers
										defaultValue={
											data.event_date
												? parseDateTime(
														dayjs(data.event_date).format('YYYY-MM-DDTHH:mm:ss')
												  )
												: now(getLocalTimeZone())
										}
										onChange={(date) => setData('event_date', date.toString())}
										isInvalid={!!errors.event_date}
										errorMessage={errors.event_date}
									/>
								</I18nProvider>

								{/* Análisis */}
								<div className="space-y-2">
									<label className="text-sm font-medium">{t('Análisis')}</label>
									<Wysiwyg
										{...{
											headings: false,
											link: false,
											charactersLimit: 400,
											initialContent: data.analysis,
										}}
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
												errors.screenshot || errors.screenshot_path
													? 'bg-danger-50 border-danger-50 [&_.ri-image-add-line]:!text-white'
													: 'bg-default-100 border-default-100'
											),
										}}
										defaultImageSrc={
											data.screenshot_path || errors.screenshot_path
												? `/storage/img/${data.screenshot_path}`
												: null
										}
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
												setData((prev) => ({
													...prev,
													screenshot: null,
													screenshot_path: null,
												}))
											}
										}}
									/>

									{errors.screenshot && (
										<ErrorMessage error={errors.screenshot} />
									)}
									{errors.screenshot_path && (
										<ErrorMessage error={errors.screenshot_path} />
									)}
								</div>

								<div className="bg-red-50 space-y-2 p-3 rounded-lg">
									<p className="text-red-600 text-xs font-medium">
										Zona de peligro
									</p>

									<Button
										fullWidth
										className="bg-red-600 text-white"
										onPress={() => destroyPick()}
									>
										Eliminar este pick
									</Button>
								</div>
							</div>
						</div>

						<div className="bg-white px-8 py-6 flex justify-between inset-x-0 bottom-0 absolute shadow-xl z-10">
							<Button
								color="default"
								variant="flat"
								isDisabled={processing}
								as={Link}
								href={route('admin.picks.index')}
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
										tipster_name: tipster?.user?.username,
										profile_picture: tipster?.user?.profile_picture,
									},
								}}
							/>
						</div>
					</div>
				</div>
			</PageContent>

			<Toastify {...{ colorMode }} />
		</>
	)
}

// Page.layout = (page: JSX.Element) => (
// 	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
// )

export default Page
