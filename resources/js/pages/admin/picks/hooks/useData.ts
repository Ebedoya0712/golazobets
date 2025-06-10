import { useCallback } from 'react'
import { useForm, usePage, router } from '@inertiajs/react'
import { FormEvent } from 'react'
import { t } from '@/i18n'
import { toast } from 'react-toastify'

import type { FlashMessage } from '@/types'
import type { Pick } from '@/types/picks'

export const useData = () => {
	const { props } = usePage()
	const pick = props.pick as Pick

	const { data, setData, errors, setError, clearErrors, processing } = useForm({
		...pick,
	})

	const submit = (e: FormEvent) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('_method', 'PUT')

		// Append all data fields to FormData
		Object.keys(data).forEach((key) => {
			if (data[key as keyof typeof data] !== null) {
				if (
					key === 'screenshot' &&
					data[key as keyof typeof data] instanceof Blob
				) {
					formData.append(
						key,
						data[key as keyof typeof data] as Blob,
						'screenshot.jpg'
					)
				} else {
					formData.append(key, String(data[key as keyof typeof data]))
				}
			}
		})

		router.post(route('admin.picks.update', { pick }), formData, {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => {
				console.log(errors)

				Object.keys(errors).forEach((key: any) => {
					setError(key, errors[key])
				})
			},
		})
	}

	const destroyPick = useCallback(() => {
		const confirmMessage = t('¿Estás seguro de eliminar este pick?') as string

		if (window.confirm(confirmMessage)) {
			router.delete(route('admin.picks.destroy', { pick }), {
				preserveScroll: true,
				onSuccess: (resp) => {
					const flash = resp.props.flash as FlashMessage
					if (flash.success) toast.success(t(flash.success))
					if (flash.error) toast.error(t(flash.error))
				},
			})
		}
	}, [])

	return {
		data,
		setData,
		errors,
		clearErrors,
		processing,
		submit,
		destroyPick,
	}
}
