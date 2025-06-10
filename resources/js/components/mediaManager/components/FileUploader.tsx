import { useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@nextui-org/react'
import { t } from '@/i18n'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
import { tabsMapper } from '../helpers/mappers/tabs.mapper'
import { MediaManagerContext } from '../providers/MediaManagerProvider'

import type { FlashMessage } from '@/types'

const defaultAcceptedFormats = {
	'image/jpeg': ['.jpeg', '.jpg'],
	'image/png': ['.png'],
	'image/webp': ['.webp'],
	'image/svg+xml': ['.svg'],
	'image/avif': ['.avif'],
}

const allowedTypes = Object.values(defaultAcceptedFormats).flat().join(', ')

export const FileUploader = () => {
	const { enableTabs, disableTabs, setSelectedTab } =
		useContext(MediaManagerContext)

	const upload = (files: any) => {
		router.post(
			route('media.upload'),
			{ files: files },
			{
				forceFormData: true,
				onSuccess: (resp) => {
					setSelectedTab && setSelectedTab(tabsMapper('TAB_LIBRARY'))
					enableTabs && enableTabs()

					const flash = resp.props.flash as FlashMessage
					if (flash.success) toast.success(t(flash.success))
					if (flash.error) toast.error(t(flash.error))
				},
				onError: (errors) => {
					console.log('Error uploading files', errors)
					enableTabs && enableTabs()

					toast.error(
						t('An error occurred while uploading files. Please try again.')
					)
				},
			}
		)
	}

	const { open, getRootProps, getInputProps } = useDropzone({
		accept: defaultAcceptedFormats,
		onDrop: (acceptedFiles) => {
			disableTabs && disableTabs()
		},
		onDropAccepted: (files) => {
			upload(files)
		},
		onDropRejected: (err) => {
			console.log('Drop rejected', err)
		},
	})

	return (
		<div
			{...getRootProps({
				className:
					'dropzone w-full grid place-content-center cursor-pointer select-none',
			})}
		>
			<input {...getInputProps()} type="hidden" />

			<div className="space-y-2 text-center">
				<p className="font-semibold">{t('Drop files to upload')}</p>
				<p className="text-foreground-600 text-xs">{t('or')}</p>
				<Button
					color="primary"
					variant="faded"
					className="px-10"
					onPress={open}
				>
					{t('Upload files')}
				</Button>
				<p className="text-foreground-600 text-xs font-medium pt-5">
					{t('Maximum upload file size')} 300 MB
				</p>
				<p className="text-foreground-600 text-xs font-medium pt-5">
					{t('Allowed image types:', { types: allowedTypes })}
				</p>
			</div>
		</div>
	)
}
