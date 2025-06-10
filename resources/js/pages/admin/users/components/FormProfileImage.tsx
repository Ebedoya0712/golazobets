import { useRef } from 'react'
import { Image, Button } from '@nextui-org/react'
import { useUser } from '@/hooks'
import { t } from '@/i18n'
import { router, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'
import config from '@/config'

import type { PageProps, FlashMessage } from '@/types'

export const FormProfileImage = () => {
	const user = usePage<PageProps>().props.user

	if (!user) return null

	const imgField = useRef<HTMLInputElement>(null)

	const removeImage = () => {
		router.delete(route('profile.remove_image'), {
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => console.log(errors),
		})
	}

	const uploadNewProfilePicture = () => {
		imgField.current && imgField.current.click()
	}

	const updateImage = (file: File) => {
		if (file) {
			router.post(
				route('profile.update_image'),
				{ profile_picture: file },
				{
					forceFormData: true,
					onSuccess: (resp) => {
						const flash = resp.props.flash as FlashMessage
						if (flash.success) toast.success(t(flash.success))
						if (flash.error) toast.error(t(flash.error))
					},
					onError: (errors) => console.log(errors),
				}
			)
		} else {
			console.error('Attempted to update image with null file')
		}
	}

	return (
		<div className="flex items-center gap-7 relative">
			<Image
				width={150}
				height={150}
				removeWrapper
				radius="full"
				src={
					user.profile_picture
						? `/storage/img/users/avatars/${user.profile_picture}`
						: config.userBlank
				}
				classNames={{
					img: 'object-cover',
				}}
			/>

			<input
				ref={imgField}
				type="file"
				style={{ height: 0, visibility: 'hidden' }}
				className="absolute"
				onChange={(e) => {
					const target = e.target as HTMLInputElement
					if (target.files) {
						updateImage(target.files[0])
					}
				}}
			/>

			<div className="flex gap-x-3 justify-between">
				<Button
					size="sm"
					color="primary"
					startContent={
						<i className="ri-image-line ri-lg ml-1 -top-px relative" />
					}
					onPress={uploadNewProfilePicture}
				>
					{user.profile_picture ? t('Change picture') : t('Add profile image')}
				</Button>

				{user.profile_picture && (
					<Button
						size="sm"
						color="danger"
						startContent={
							<i className="ri-delete-bin-2-line ri-lg ml-1 -top-px relative" />
						}
						onClick={removeImage}
					>
						{t('Remove picture')}
					</Button>
				)}
			</div>
		</div>
	)
}
