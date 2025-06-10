import { FormEvent } from 'react'
import { t } from '@/i18n'
import { useForm, usePage } from '@inertiajs/react'
import { Input, Button, Divider } from '@nextui-org/react'
import { toast } from 'react-toastify'

import type { PageProps, FlashMessage } from '@/types'

export const FormPersonalInformation = () => {
	const { user } = usePage<PageProps>().props

	const { data, setData, patch, processing, errors, clearErrors, isDirty } =
		useForm({
			id: user.id,
			country: user.country,
			personal_information: true,
		})

	const submit = (e: FormEvent) => {
		e.preventDefault()

		patch(route('admin.user.update', { user }), {
			preserveScroll: true,
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => console.log(errors),
		})
	}

	return (
		<>
			<form onSubmit={submit}>
				<section className="space-y-5">
					<div className="font-medium flex gap-5 items-center">
						{t('Personal information')}
						<Divider className="flex-1" />
					</div>

					<div className="grid grid-cols-2 gap-x-6 gap-y-5">
						<fieldset className="space-y-1">
							<label htmlFor="" className="text-sm">
								{t('Country')}
							</label>

							<Input
								variant="faded"
								value={data.country}
								isInvalid={errors.country ? true : false}
								errorMessage={errors.country}
								onKeyUp={() => clearErrors('country')}
								isDisabled={processing}
								onValueChange={(e) => setData('country', e)}
							/>
						</fieldset>
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
			</form>
		</>
	)
}
