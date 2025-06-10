import { Spinner } from '@nextui-org/react'
import { t } from '@/i18n'

export const FormLoading = () => {
	return (
		<div className="bg-black/70 grid place-content-center !m-0 inset-0 fixed z-[300]">
			<Spinner
				color="warning"
				label={String(t('Enviando'))}
				labelColor="warning"
			/>
		</div>
	)
}
