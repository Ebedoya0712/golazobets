import { FormEvent, useEffect, useRef, useContext } from 'react'
import { useForm, router } from '@inertiajs/react'
import { NotificationContext } from '../providers/NotificationProvider'
import { toast } from 'react-toastify'
import { t } from '@/i18n'

import type { NotificationContextProps } from '@/types/notifications'
import type { FlashMessage } from '@/types'

export const useActions = () => {
	const { state, dispatch } = useContext(
		NotificationContext
	) as NotificationContextProps

	const { data, patch, errors, setData, processing, clearErrors, reset } =
		useForm({
			title: '',
			content: '',
		})

	useEffect(() => {
		if (state.selectedNotification) {
			const { title, content } = state.selectedNotification
			setData({ title, content })
		}
	}, [state.selectedNotification])

	/**
	 * Submits the form data to the server.
	 *
	 * If the user is editing an existing notification, it will call the `update` method
	 * and then reload the page.
	 *
	 * If the user is creating a new notification, it will call the `store` method and
	 * then reload the page.
	 *
	 * @param {FormEvent} e - The form event.
	 */
	const submit = (e: FormEvent) => {
		e.preventDefault()

		patch(
			route('admin.notificationTemplates.update', {
				template: state.selectedNotification,
			}),
			{
				preserveScroll: true,
				onSuccess: (resp) => {
					const flash = resp.props.flash as FlashMessage
					if (flash.success) toast.success(t(flash.success))
					if (flash.error) toast.error(t(flash.error))

					dispatch({ type: 'closeDrawer' })
					reset()
					dispatch({ type: 'setSelectedNotification', payload: null })
					router.reload({ only: ['templates'] })
				},
				onError: (errors) => console.log('error', errors),
			}
		)
	}

	const inputName = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setTimeout(() => {
			inputName.current?.focus()
		}, 300)
	}, [state.drawerOpen])

	return {
		data,
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
