import { FormEvent, useEffect, useRef, useContext } from 'react'
import { useForm, router } from '@inertiajs/react'
import { RoleContext } from '../providers/RoleProvider'
import { toast } from 'react-toastify'
import { t } from '@/i18n'

import type { RoleContextProps } from '@/types/roles'
import { Permission } from '@/types/permissions'
import type { FlashMessage } from '@/types'

export const useActions = () => {
	const { state, dispatch } = useContext(RoleContext) as RoleContextProps

	const {
		data,
		post,
		patch,
		errors,
		setData,
		processing,
		clearErrors,
		reset,
		isDirty,
	} = useForm({
		name: '',
		permissions: [] as string[],
	})

	useEffect(() => {
		if (state.selectedRole) {
			setData({
				name: state.selectedRole.name,
				permissions: state.selectedRole.permissions.map(
					(permission: Permission) => permission.name
				),
			})
		}
	}, [state.selectedRole])

	const submit = (e: FormEvent) => {
		e.preventDefault()

		if (!isDirty) return

		if (state.selectedRole) {
			patch(
				route('admin.role.update', {
					role: state.selectedRole,
				}),
				{
					preserveScroll: true,
					onSuccess: (resp) => {
						const flash = resp.props.flash as FlashMessage
						if (flash.success) toast.success(t(flash.success))
						if (flash.error) toast.error(t(flash.error))

						dispatch({ type: 'closeDrawer' })
						reset()
						dispatch({ type: 'setSelectedRole', payload: null })
						router.reload({ only: ['roles'] })
					},
					onError: (errors) => console.log(errors),
				}
			)
		} else {
			post(route('admin.role.store'), {
				preserveScroll: true,
				onSuccess: (resp) => {
					const flash = resp.props.flash as FlashMessage
					if (flash.success) toast.success(t(flash.success))
					if (flash.error) toast.error(t(flash.error))

					dispatch({ type: 'setSelectedRole', payload: null })

					dispatch({ type: 'closeDrawer' })
					reset()

					router.reload({ only: ['roles'] })
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
