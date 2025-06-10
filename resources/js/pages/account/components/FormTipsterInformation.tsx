import { FormEvent } from 'react'
import {
	Button,
	Divider,
	Select,
	SelectItem,
	Tabs,
	Tab,
} from '@nextui-org/react'
import { t } from '@/i18n'
import { useForm, usePage } from '@inertiajs/react'
import { Wysiwyg, FormLoading, ErrorMessage } from '@/components/form'
import { toast } from 'react-toastify'

import type { FlashMessage, PageProps } from '@/types'
import type { Sport } from '@/types/sports'

export const FormTipsterInformation = () => {
	const { props } = usePage<PageProps>()
	const {
		auth: { user },
		sports,
	} = props

	const wysiwygMaxLength = props.wysiwygMaxLength ?? 400

	if (!user) return null
	const { tipster, account } = user

	const { data, setData, patch, processing, errors, clearErrors, isDirty } =
		useForm({
			sport_id: tipster.sport_id ?? null,
			bio: account.bio ?? '',
			description_service: account.description_service ?? '',
			description_market: account.description_market ?? '',
			description_picks: account.description_picks ?? '',
			publishing_time: account.publishing_time ?? '',
			stake_preference: account.stake_preference ?? '',
			form_type: 'tipster_information',
		})

	const submit = (e: FormEvent) => {
		e.preventDefault()

		patch(route('account.update'), {
			preserveScroll: true,
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => {
				console.log(errors)
				Object.keys(errors).forEach((key) => {
					toast.error(t(errors[key]))
				})
			},
		})
	}

	return (
		<section className="space-y-5 mt-5 md:mt-0">
			<div className="text-sm font-medium flex gap-5 items-center select-none">
				{t('Información de tipster')}
				<Divider className="flex-1" />
			</div>

			<form onSubmit={submit}>
				<div className="grid gap-x-6 gap-y-5 lg:grid-cols-2">
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
						{sports.map((sport: Sport) => (
							<SelectItem key={sport.id} selectedIcon={<></>}>
								{sport.name}
							</SelectItem>
						))}
					</Select>
				</div>
			</form>

			<div className="pt-5 text-sm font-medium flex gap-5 items-center select-none">
				{t('Información de cuenta')}
				<Divider className="flex-1" />
			</div>

			<form onSubmit={submit}>
				<Tabs aria-label="tipster-information" variant="light" color="primary">
					<Tab key="bio" title={t('Biografía')}>
						<div className="space-y-2">
							<label className="text-sm font-medium">{t('Biografía')}</label>
							<Wysiwyg
								{...{
									initialContent: data.bio,
									headings: false,
									link: false,
									charactersLimit: wysiwygMaxLength,
								}}
								onUpdate={(value) => {
									setData('bio', value)
									clearErrors('bio')
								}}
							/>
							<ErrorMessage error={errors.bio} />
						</div>
					</Tab>

					<Tab key="description" title={t('Descripción')}>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								{t('Descripción de tu servicio')}
							</label>
							<Wysiwyg
								{...{
									initialContent: data.description_service,
									headings: false,
									link: false,
									charactersLimit: wysiwygMaxLength,
								}}
								onUpdate={(value) => {
									setData('description_service', value)
									clearErrors('description_service')
								}}
							/>
							<ErrorMessage error={errors.bio} />
						</div>
					</Tab>

					<Tab key="markets" title={t('Mercados')}>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								{t('Mercados en los que pronosticas')}
							</label>
							<Wysiwyg
								{...{
									initialContent: data.description_market,
									headings: false,
									link: false,
									charactersLimit: wysiwygMaxLength,
								}}
								onUpdate={(value) => {
									setData('description_market', value)
									clearErrors('description_market')
								}}
							/>
							<ErrorMessage error={errors.description_market} />
						</div>
					</Tab>

					<Tab key="picksPerMonth" title={t('Picks')}>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								{t('Número medio de pronósticos por mes')}
							</label>
							<Wysiwyg
								{...{
									initialContent: data.description_picks,
									headings: false,
									link: false,
									charactersLimit: wysiwygMaxLength,
								}}
								onUpdate={(value) => {
									setData('description_picks', value)
									clearErrors('description_picks')
								}}
							/>
							<ErrorMessage error={errors.description_picks} />
						</div>
					</Tab>

					<Tab key="schedule" title={t('Horarios')}>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								{t('Horarios habituales de publicación')}
							</label>
							<Wysiwyg
								{...{
									initialContent: data.publishing_time,
									headings: false,
									link: false,
									charactersLimit: wysiwygMaxLength,
								}}
								onUpdate={(value) => {
									setData('publishing_time', value)
									clearErrors('publishing_time')
								}}
							/>
							<ErrorMessage error={errors.publishing_time} />
						</div>
					</Tab>

					<Tab key="stake" title={t('Stake')}>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								{t('Gestión del stake')}
							</label>
							<Wysiwyg
								{...{
									initialContent: data.stake_preference,
									headings: false,
									link: false,
									charactersLimit: wysiwygMaxLength,
								}}
								onUpdate={(value) => {
									setData('stake_preference', value)
									clearErrors('stake_preference')
								}}
							/>
							<ErrorMessage error={errors.stake_preference} />
						</div>
					</Tab>
				</Tabs>

				<div className="pt-5 flex justify-end">
					<Button
						type="submit"
						color="primary"
						className="w-40"
						isDisabled={!isDirty}
					>
						{t('Save')}
					</Button>
				</div>
			</form>

			{processing && <FormLoading />}
		</section>
	)
}
