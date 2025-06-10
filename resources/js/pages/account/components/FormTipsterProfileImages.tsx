import { useRef, useState } from 'react'
import { Image, Button, cn } from '@nextui-org/react'
import { t } from '@/i18n'
import { router, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { FormLoading } from '@/components/form'
import config from '@/config'

import type { PageProps, FlashMessage } from '@/types'

export const FormTipsterProfileImages = () => {
	const [hoverCoverImage, setHoverCoverImage] = useState(false)
	const [hoverProfileImage, setHoverProfileImage] = useState(false)
	const [processing, setProcessing] = useState(false)

	return (
		<section>
			{/* COVER IMAGE */}
			<CoverImage
				{...{
					hoverCoverImage,
					setHoverCoverImage,
					hoverProfileImage,
					setProcessing,
				}}
			/>

			{/* PROFILE PICTURE */}
			<ProfileImage
				{...{
					hoverCoverImage,
					setHoverProfileImage,
					hoverProfileImage,
					setProcessing,
				}}
			/>

			{processing && <FormLoading />}
		</section>
	)
}

/**
 *
 *
 * PROFILE IMAGE
 */
type ProfileImageProps = {
	hoverCoverImage: boolean
	hoverProfileImage: boolean
	setHoverProfileImage: (val: boolean) => void
	setProcessing: (val: boolean) => void
}

const ProfileImage = ({
	hoverCoverImage,
	setHoverProfileImage,
	hoverProfileImage,
	setProcessing,
}: ProfileImageProps) => {
	const user = usePage<PageProps>().props.auth.user
	if (!user) return null

	const imgField = useRef<HTMLInputElement>(null)

	const removeImage = () => {
		setProcessing(true)

		router.delete(route('profile.remove_image'), {
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => console.log(errors),
			onFinish: () => setProcessing(false),
		})
	}

	const uploadNewProfilePicture = () => {
		imgField.current && imgField.current.click()
	}

	const updateImage = (file: File) => {
		if (file) {
			setProcessing(true)

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
					onFinish: () => setProcessing(false),
				}
			)
		} else {
			console.error('Attempted to update image with null file')
		}
	}

	return (
		<div
			className={cn(
				'h-12 -mt-12 px-6 relative transition-opacity',
				hoverCoverImage && 'opacity-50 pointer-events-none'
			)}
			onMouseEnter={() => setHoverProfileImage(true)}
			onMouseLeave={() => setHoverProfileImage(false)}
		>
			<Image
				width={90}
				height={90}
				removeWrapper
				radius="lg"
				src={
					user.profile_picture
						? `/storage/img/users/avatars/${user.profile_picture}`
						: config.userBlank
				}
				classNames={{
					img: '-top-0 relative object-cover aspect-square',
				}}
			/>

			<div
				className={cn(
					'flex gap-3 pl-28 -mt-9 transition-opacity opacity-0 pointer-events-none',
					hoverProfileImage && 'opacity-100 pointer-events-auto'
				)}
			>
				<input
					ref={imgField}
					type="file"
					style={{ height: 0, visibility: 'hidden' }}
					className="absolute"
					accept=".jpg,.webp"
					onChange={(e) => {
						const target = e.target as HTMLInputElement
						if (target.files) {
							updateImage(target.files[0])
						}
					}}
				/>

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

/**
 *
 *
 * COVER IMAGE
 */
type CoverImageProps = {
	hoverCoverImage: boolean
	setHoverCoverImage: (val: boolean) => void
	hoverProfileImage: boolean
	setProcessing: (val: boolean) => void
}
const CoverImage = ({
	hoverProfileImage,
	setHoverCoverImage,
	hoverCoverImage,
	setProcessing,
}: CoverImageProps) => {
	const user = usePage<PageProps>().props.auth.user
	if (!user) return null
	const { tipster } = user

	const imgField = useRef<HTMLInputElement>(null)

	const removeImage = () => {
		setProcessing(true)

		router.delete(route('account.removeCoverImage'), {
			preserveScroll: true,
			onSuccess: (resp) => {
				const flash = resp.props.flash as FlashMessage
				if (flash.success) toast.success(t(flash.success))
				if (flash.error) toast.error(t(flash.error))
			},
			onError: (errors) => console.log(errors),
			onFinish: () => setProcessing(false),
		})
	}

	const uploadNewProfilePicture = () => {
		imgField.current && imgField.current.click()
	}

	const updateImage = (file: File) => {
		if (file) {
			setProcessing(true)

			router.post(
				route('account.updateCoverImage'),
				{ cover_image: file },
				{
					forceFormData: true,
					onSuccess: (resp) => {
						const flash = resp.props.flash as FlashMessage
						if (flash.success) toast.success(t(flash.success))
						if (flash.error) toast.error(t(flash.error))
					},
					onError: (errors) => console.log(errors),
					onFinish: () => setProcessing(false),
				}
			)
		} else {
			console.error('Attempted to update image with null file')
		}
	}

	return (
		<div
			className={cn(
				'relative transition-opacity',
				hoverProfileImage && 'opacity-20 pointer-events-none'
			)}
			onMouseEnter={() => setHoverCoverImage(true)}
			onMouseLeave={() => setHoverCoverImage(false)}
		>
			<Image
				height={200}
				removeWrapper
				radius="sm"
				src={
					tipster.cover_image
						? `/storage/img/tipsters/covers/${tipster.cover_image}`
						: '/img/profile-picture-blank.jpg'
				}
				classNames={{ img: 'w-full object-cover' }}
			/>

			<div
				className={cn(
					'bg-gradient-to-t from-black/60 p-2 pt-20',
					'flex justify-end gap-3 inset-x-0 bottom-0 absolute z-10 transition-opacity opacity-0 pointer-events-none',
					hoverCoverImage && 'opacity-100 pointer-events-auto'
				)}
			>
				<input
					ref={imgField}
					type="file"
					style={{ height: 0, visibility: 'hidden' }}
					accept=".jpg,.webp"
					className="absolute"
					onChange={(e) => {
						const target = e.target as HTMLInputElement
						if (target.files) {
							updateImage(target.files[0])
						}
					}}
				/>

				<Button
					size="sm"
					color="default"
					variant="light"
					startContent={
						<i className="ri-image-line ri-lg ml-1 -top-px relative" />
					}
					onPress={uploadNewProfilePicture}
					className="text-white"
				>
					{tipster.cover_image ? t('Cambiar cabecera') : t('Subir cabecera')}
				</Button>

				{tipster.cover_image && (
					<Button
						size="sm"
						color="danger"
						variant="light"
						startContent={
							<i className="ri-delete-bin-2-line ri-lg ml-1 -top-px relative" />
						}
						onClick={removeImage}
					>
						{t('Remover cabecera')}
					</Button>
				)}
			</div>
		</div>
	)
}
