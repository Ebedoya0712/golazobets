import { t } from '@/i18n'
import { useForm, usePage } from '@inertiajs/react'
import {
	Button,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { toast } from 'react-toastify'

import type { FlashMessage } from '@/types'
import type { Tipster } from '@/types/tipsters.d'
import { useState } from 'react'

export const DeleteAccount = () => {
	const { tipster } = usePage<{ tipster: Tipster }>().props
	const { user } = tipster
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [deleting, setDeleting] = useState(false)

	const { delete: destroy } = useForm()

	return (
		<>
			<div className="space-y-5">
				<Card shadow="none" className="bg-danger-50 text-danger-500">
					<CardBody className="text-sm font-light">
						{t('Deleted accounts cannot be restored!')}
					</CardBody>
				</Card>

				<Button color="danger" onPress={onOpen}>
					{t('Delete account')}
				</Button>
			</div>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				isKeyboardDismissDisabled={true}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 select-none">
								{t('Canfirma la eliminación de este tipster')}
							</ModalHeader>

							<ModalBody className="pt-0">
								<div className="text-sm space-y-2 text-pretty">
									<p>
										{t('Al eliminar este tipster, estás eliminando también:')}
									</p>
									<ul className="list-inside">
										<li className="list-disc">
											{t('El usuario relacionado.')}
										</li>
										<li className="list-disc">
											{t('Las suscripciones a este tipster.')}
										</li>
										<li className="list-disc">{t('Estadísticas.')}</li>
									</ul>
									<p className="text-danger font-medium text-lg leading-none">
										{t(
											'Ten en cuenta que no podrás recuperar los datos eliminados.'
										)}
									</p>
								</div>
							</ModalBody>

							<ModalFooter className="gap-x-4">
								<Button fullWidth variant="ghost" onPress={onClose}>
									{t('Cancel')}
								</Button>

								<Button
									fullWidth
									color="danger"
									isLoading={deleting}
									isDisabled={deleting}
									onPress={() => {
										setDeleting(true)

										destroy(route('admin.tipsters.destroy', { tipster }), {
											preserveScroll: true,
											onSuccess: (resp) => {
												setDeleting(false)
												const flash = resp.props.flash as FlashMessage
												if (flash.success) toast.success(t(flash.success))
												if (flash.error) toast.error(t(flash.error))
											},
										})
									}}
								>
									{t('Confirm')}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
