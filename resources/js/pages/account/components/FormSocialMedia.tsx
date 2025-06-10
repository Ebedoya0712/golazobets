import { FormLoading } from '@/components/form'
import { t } from '@/i18n'
import { useForm, usePage } from '@inertiajs/react'
import { Button, Divider, Input } from '@nextui-org/react'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'

import type { FlashMessage, PageProps } from '@/types'

export const FormSocialMedia = () => {
	const user = usePage<PageProps>().props.auth.user

	if (!user) return null

	const { account } = user

	const { data, setData, patch, processing, errors, clearErrors, isDirty } =
		useForm({
			telegram_user: account.telegram_user ?? '',
			x_user: account.x_user ?? '',
			facebook_user: account.facebook_user ?? '',
			instagram_user: account.instagram_user ?? '',
			form_type: 'social_media',
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

				Object.values(errors).forEach((error) => {
					toast.error(t(error as string))
				})
			},
		})
	}

	return (
		<form onSubmit={submit}>
			<section className="space-y-5 mt-5 md:mt-0">
				<div className="text-sm font-medium flex gap-5 items-center select-none">
					{t('Redes sociales')}
					<Divider className="flex-1" />
				</div>

				<div className="grid gap-x-6 gap-y-5">
					<Input
						label={t('Usuario de Telegram')}
						variant="faded"
						value={data.telegram_user}
						isInvalid={errors.telegram_user ? true : false}
						errorMessage={errors.telegram_user}
						onKeyUp={() => clearErrors('telegram_user')}
						isDisabled={processing}
						startContent={
							<span className="flex items-center">
								<i className="ri-telegram-2-line" />
								<span className="text-gray-400 text-sm font-medium pl-2">
									https://t.me/
								</span>
							</span>
						}
						onValueChange={(e) => setData('telegram_user', e)}
					/>

					<Input
						label={t('Usuario de X')}
						variant="faded"
						value={data.x_user}
						isInvalid={errors.x_user ? true : false}
						errorMessage={errors.x_user}
						onKeyUp={() => clearErrors('x_user')}
						isDisabled={processing}
						startContent={
							<span className="flex items-center">
								<i className="ri-twitter-x-line" />
								<span className="text-gray-400 text-sm font-medium pl-2">
									https://x.com/
								</span>
							</span>
						}
						onValueChange={(e) => setData('x_user', e)}
					/>

					<Input
						label={t('Usuario de Instagram')}
						variant="faded"
						value={data.instagram_user}
						isInvalid={errors.instagram_user ? true : false}
						errorMessage={errors.instagram_user}
						onKeyUp={() => clearErrors('instagram_user')}
						isDisabled={processing}
						startContent={
							<span className="flex items-center">
								<i className="ri-instagram-line" />
								<span className="text-gray-400 text-sm font-medium pl-2">
									https://instagram.com/
								</span>
							</span>
						}
						onValueChange={(e) => setData('instagram_user', e)}
					/>

					<Input
						label={t('Usuario de Facebook')}
						variant="faded"
						value={data.facebook_user}
						isInvalid={errors.facebook_user ? true : false}
						errorMessage={errors.facebook_user}
						onKeyUp={() => clearErrors('facebook_user')}
						isDisabled={processing}
						startContent={
							<span className="flex items-center">
								<i className="ri-facebook-fill" />
								<span className="text-gray-400 text-sm font-medium pl-2">
									https://facebook.com/
								</span>
							</span>
						}
						onValueChange={(e) => setData('facebook_user', e)}
					/>
				</div>

				<div className="pt-5 flex justify-end">
					<Button
						type="submit"
						color="primary"
						className="w-40"
						isLoading={processing}
						isDisabled={!isDirty}
					>
						{t('Save')}
					</Button>
				</div>
			</section>

			{processing && <FormLoading />}
		</form>
	)
}
