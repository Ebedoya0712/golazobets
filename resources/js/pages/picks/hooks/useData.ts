import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'

import { t } from '@/i18n'
import { FlashMessage } from '@/types'
import type { Pick } from '@/types/picks'
import { toast } from 'react-toastify'

export const useData = () => {
	const { data, setData, post, errors, clearErrors, processing } = useForm({
		// sport_id: 2,
		// bookie_id: 4,
		// bet_type: 'pre_match',
		// sub_type: 'combined',
		// competition: 'La Liga',
		// event: 'Real Madrid vs Barcelona',
		// pick: 'Over 2.5 goals',
		// stake: 5,
		// odds: 1.85,
		// event_date: '2025-02-20T20:16:00',
		// analysis:
		// 	'Real Madrid y Barcelona tienen un historial de partidos con alta cantidad de goles. Ambos equipos tienen sus principales delanteros disponibles, y sus defensas han mostrado vulnerabilidades en los últimos juegos.',
		// screenshot: null,
		// status: 'pending',
		// result: null,
		/////////////////////////////////
		sport_id: null,
		bookie_id: null,
		bet_type: 'pre_match',
		sub_type: 'simple',
		competition: '',
		event: '',
		pick: '',
		stake: 1,
		odds: '0',
		event_date: null,
		analysis: '',
		screenshot_path: null,
		status: 'pending',
		result: null,
	} as Pick)

	const submit = (e: FormEvent) => {
		e.preventDefault()

		post(route('account.picks.store'), {
			preserveScroll: true,
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => {
				console.log(errors)
			},
		})
	}

	return {
		data,
		setData,
		errors,
		clearErrors,
		processing,
		submit,
	}
}
