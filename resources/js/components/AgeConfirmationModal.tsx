import { useCookies } from '@/hooks'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/react'

export const AgeConfirmationModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { setCookie } = useCookies()

	return (
		<Modal
			defaultOpen
			disableAnimation
			hideCloseButton
			isDismissable={false}
			isKeyboardDismissDisabled={false}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalBody className="text-pretty leading-tight pt-6">
							<p>Este sitio web requiere que tengas 18 años de edad o más.</p>
							<p>Por favor, verifica tu edad para ver el contenido.</p>
						</ModalBody>

						<ModalFooter className="justify-center pb-6">
							<Button
								color="secondary"
								onClick={() => {
									onClose()
									setCookie('ageConfirmation', 'true', 90)
								}}
							>
								Soy mayor de 18
							</Button>
						</ModalFooter>

						{/* <ModalHeader>Age Confirmation</ModalHeader> */}
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
