import { t } from '@/i18n'
import { useForm } from '@inertiajs/react'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	cn,
} from '@nextui-org/react'

import type { Pick } from '@/types/picks'

type Props = {
	isOpen: boolean
	onOpenChange: (isOpen: boolean) => void
	selectedPick: Pick | null
	setSelectedPick: (pick: Pick | null) => void
}

export const FormCorrectPick = ({
	isOpen,
	onOpenChange,
	selectedPick,
	setSelectedPick,
}: Props) => {
	const { data, setData, patch, processing, reset } = useForm({ status: '' })

	const submit = () => {
		if (data.status === '' || data.status === selectedPick?.status) return

		patch(route('admin.picks.correct', { pick: selectedPick }), {
			only: ['picks'],
			preserveScroll: true,
			onSuccess: () => {
				reset()
				onOpenChange(false)
				setSelectedPick(null)
			},
		})
	}

	return (
		<Modal {...{ isOpen, size: 'lg', hideCloseButton: true }}>
			<ModalContent>
				{() => {
					return (
						<>
							<ModalHeader className="items-start gap-x-2">
								<i className="ri-list-check-3 ri-lg mt-1" />
								<div className="flex-1 overflow-hidden">
									<p className="leading-none">Corregir</p>
									<p className="text-sm truncate">
										{selectedPick?.event} {selectedPick?.event}
									</p>
								</div>
							</ModalHeader>

							<ModalBody
								className={cn(processing && 'opacity-70 pointer-events-none')}
							>
								<div className="flex justify-between gap-3">
									<Button
										fullWidth
										color="default"
										onPress={() => setData('status', 'cancelled')}
										isDisabled={
											data.status === 'cancelled' ||
											(!data.status && selectedPick?.status === 'cancelled')
										}
									>
										{t('Cancelado')}
									</Button>

									<Button
										fullWidth
										color="default"
										onPress={() => setData('status', 'void')}
										isDisabled={
											data.status === 'void' ||
											(!data.status && selectedPick?.status === 'void')
										}
										className="bg-sky-500 text-white"
									>
										{t('Nulo')}
									</Button>

									<Button
										fullWidth
										color="secondary"
										onPress={() => setData('status', 'pending')}
										isDisabled={
											data.status === 'pending' ||
											(!data.status && selectedPick?.status === 'pending')
										}
									>
										{t('Pendiente')}
									</Button>

									<Button
										fullWidth
										color="danger"
										onPress={() => setData('status', 'lost')}
										isDisabled={
											data.status === 'lost' ||
											(!data.status && selectedPick?.status === 'lost')
										}
										className="bg-red-600"
									>
										{t('Fallado')}
									</Button>

									<Button
										fullWidth
										color="success"
										onPress={() => setData('status', 'won')}
										isDisabled={
											data.status === 'won' ||
											(!data.status && selectedPick?.status === 'won')
										}
									>
										{t('Ganado')}
									</Button>
								</div>
							</ModalBody>

							<ModalFooter className="flex justify-between">
								<Button
									variant="light"
									onPress={() => {
										setData('status', '')
										onOpenChange(false)
									}}
									startContent={<i className="ri-close-line ri-lg" />}
								>
									{t('Cancelar')}
								</Button>

								<Button color="primary" className="px-10" onPress={submit}>
									{t('Aceptar')}
								</Button>
							</ModalFooter>
						</>
					)
				}}
			</ModalContent>
		</Modal>
	)
}
