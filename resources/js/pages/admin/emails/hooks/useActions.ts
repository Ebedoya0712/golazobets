import { FormEvent, useRef } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { t } from '@/i18n'

import type { EmailTemplate } from '@/types/notification-templates'
import type { FlashMessage } from '@/types'

export const useActions = () => {
	const props = usePage().props
	const template = props.template as EmailTemplate
	const { body, subject } = template

	const { data, post, patch, errors, setData, processing, clearErrors } =
		useForm({
			subject: subject ?? '',
			body: body ?? '',
		})

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

		patch(route('admin.emailTemplates.update', { template }), {
			preserveScroll: true,
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => console.log('error', errors),
		})
	}

	const inputName = useRef<HTMLInputElement>(null)

	return {
		data,
		post,
		patch,
		errors,
		setData,
		processing,
		clearErrors,
		inputName,
		submit,
	}
}
