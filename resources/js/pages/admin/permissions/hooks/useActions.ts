import { FormEvent, useEffect, useRef, useContext } from 'react'
import { useForm, router } from '@inertiajs/react'
import { PermissionContext } from '../providers/PermissionProvider'
import { toast } from 'react-toastify'
import { t } from '@/i18n'

import type { PermissionContextProps } from '@/types/permissions'
import type { FlashMessage } from '@/types'

export const useActions = () => {
	const { state, dispatch } = useContext(
		PermissionContext
	) as PermissionContextProps

	const { data, post, patch, errors, setData, processing, clearErrors, reset } =
		useForm({
			name: '',
			guard_name: ['web'],
		})

	useEffect(() => {
		if (state.selectedPermission) setData({ ...state.selectedPermission })
	}, [state.selectedPermission])

	const submit = (e: FormEvent) => {
		e.preventDefault()

		if (state.selectedPermission) {
			patch(
				route('admin.permission.update', {
					permission: state.selectedPermission,
				}),
				{
					preserveScroll: true,
					// @ts-ignore
					onSuccess: (resp: InertiaResponse) => {
						if (resp.props.flash && resp.props.flash.success) {
							toast.success(t(resp.props.flash.success))
						}

						dispatch({ type: 'closeDrawer' })
						reset()
						dispatch({ type: 'setSelectedPermission', payload: null })
						router.reload({ only: ['permissions'] })
					},
					onError: (errors) => console.log(errors),
				}
			)
		} else {
			post(route('admin.permission.store'), {
				preserveScroll: true,
				onSuccess: (resp) => {
					const flash = resp.props.flash as FlashMessage
					if (flash.success) toast.success(t(flash.success))
					if (flash.error) toast.error(t(flash.error))

					dispatch({ type: 'setSelectedPermission', payload: null })

					dispatch({ type: 'closeDrawer' })
					reset()

					router.reload({ only: ['permissions'] })
				},
				onError: (errors) => console.log(errors),
			})
		}
	}

	const inputName = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setTimeout(() => {
			inputName.current?.focus()
		}, 300)
	}, [state.drawerOpen])

	return {
		data,
		post,
		patch,
		errors,
		setData,
		processing,
		clearErrors,
		reset,
		inputName,
		submit,
	}
}
