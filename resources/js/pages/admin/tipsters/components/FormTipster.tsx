import {
	Button,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Tabs,
	Tab,
	Divider,
} from '@nextui-org/react'
import { useForm, usePage, Link } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { t } from '@/i18n'

import type { Tipster } from '@/types/tipsters.d'
import type { Sport } from '@/types/sports.d'
import type { FlashMessage } from '@/types'
interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

export const FormTipster = () => {
	const { tipster, sports } = usePage<{ tipster: Tipster; sports: Sport[] }>()
		.props

	const { data, setData, patch, errors, clearErrors, processing } = useForm({
		...tipster,
	})

	const submit = (e: SubmitEvent) => {
		e.preventDefault()

		patch(route('admin.tipsters.update', { tipster }), {
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
			<form onSubmit={submit} className="space-y-5">
				<div className="font-medium flex gap-5 items-center">
					{t('Perfil de tipster')}
					<Divider className="flex-1" />
				</div>

				<Select
					defaultSelectedKeys={
						data.sport_id ? [data.sport_id.toString()] : undefined
					}
					items={sports}
					isDisabled={processing}
					label={t('Deporte')}
					onSelectionChange={(key) => {
						if (key.anchorKey) {
							setData('sport_id', Number(key.anchorKey))
						}
					}}
					autoComplete="off"
					isInvalid={errors.sport_id ? true : false}
					errorMessage={errors.sport_id && String(t(errors.sport_id))}
					disallowEmptySelection
				>
					{sports.map((sport) => (
						<SelectItem key={sport.id}>{sport.name}</SelectItem>
					))}
				</Select>

				{/* Tipo */}
				<RadioGroup
					size="sm"
					label={t('Tipo')}
					defaultValue={data.type}
					orientation="horizontal"
					onValueChange={(value: string) => {
						setData('type', value as Tipster['type'])
					}}
					isInvalid={!!errors.type}
					errorMessage={errors.type}
					isDisabled={processing}
				>
					<Radio value="free">Free</Radio>
					<Radio value="premium">Premium</Radio>
				</RadioGroup>

				<div className="flex gap-5 justify-end pt-6">
					<Button
						color="default"
						variant="flat"
						isDisabled={processing}
						as={Link}
						href={route('admin.tipsters.index')}
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
		</>
	)
}
