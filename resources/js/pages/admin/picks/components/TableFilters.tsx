import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { router } from '@inertiajs/react'

export const TableFilters = () => {
	const [pickId, setPickId] = useState(route().params.pick_id || '')
	const [tipsterName, setTipsterName] = useState(
		route().params.tipster_name || ''
	)

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		router.reload({
			only: ['picks'],
			data: {
				pick_id: pickId,
				tipster_name: tipsterName,
			},
		})
	}

	const reset = () => {
		setPickId('')
		setTipsterName('')
		router.reload({
			only: ['picks'],
			data: {
				pick_id: '',
				tipster_name: '',
			},
		})
	}

	return (
		<form onSubmit={submit} className="flex justify-end items-end gap-x-5">
			<div className="w-60">
				<Input
					label="ID de pick"
					labelPlacement="outside"
					variant="bordered"
					value={pickId}
					onValueChange={(val) => {
						setTipsterName('')
						setPickId(val.replace(/\D/g, ''))
					}}
					startContent={<i className="ri-search-line text-gray-400" />}
				/>
			</div>

			<div className="w-60">
				<Input
					label="Nombre de tipster"
					labelPlacement="outside"
					variant="bordered"
					value={tipsterName}
					onValueChange={(val) => {
						setPickId('')
						setTipsterName(val)
					}}
					startContent={<i className="ri-search-line text-gray-400" />}
				/>
			</div>

			<Button color="primary" type="submit">
				Buscar
			</Button>

			<Button
				color="primary"
				size="sm"
				variant="light"
				startContent={<i className="ri-filter-off-fill ri-xl -mt-1" />}
				onPress={reset}
			>
				Borrar filtros
			</Button>
		</form>
	)
}
