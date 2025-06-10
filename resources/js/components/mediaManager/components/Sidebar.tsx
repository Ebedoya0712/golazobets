import { useEffect, useState, useContext } from 'react'
import { cn, Input, Textarea, Button, Divider } from '@nextui-org/react'
import { MediaManagerContext } from '../providers/MediaManagerProvider'
import { t } from '@/i18n'
import { toast } from 'react-toastify'
import { useMediaManager } from '../hooks/useMediaManager'
import dayjs from 'dayjs'
import { useForm } from '@inertiajs/react'

import type { Image as ImageProps } from '../types.d'

const handleCopy = (url: string) => {
	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(url)
			.then(() => {
				toast.success(t('Text copied to clipboard'))
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err)
			})
	} else {
		toast.error(t('Clipboard API not supported'))
	}
}

const inputStyle = {
	base: 'gap-2 items-start',
	label: 'w-20',
	mainWrapper: 'flex-1',
}

export const Sidebar = () => {
	const { fileToEdit } = useContext(MediaManagerContext)
	const { updateFile, deleteFile, formatSize } = useMediaManager()
	const [editable, setEditable] = useState(false)
	const { data, setData } = useForm({ ...fileToEdit })

	useEffect(() => {
		setEditable(false)
		setData({ ...fileToEdit })
	}, [fileToEdit])

	const content = () => {
		if (!fileToEdit) return <FileNotFound />

		const { name, file_name, original_url, size, created_at, id, uuid } =
			fileToEdit

		return (
			<div className="h-full overflow-auto">
				<div className="text-sm px-6 pt-4 pb-10">
					<div className="text-foreground-500 text-base font-semibold">
						{t('Attachment details')}
					</div>

					<div className="mt-1 space-y-5">
						<div className="space-y-2">
							<div className="text-base font-semibold truncate">{name}</div>

							<div className="flex justify-between gap-4 pt-3">
								<span className="w-24">{t('File name')}:</span>
								<span className="truncate flex-1">{file_name}</span>
							</div>

							<Divider />

							<div className="flex justify-between gap-4">
								<span className="w-24">{t('Size')}:</span>
								<span className="truncate flex-1">{formatSize(size)}</span>
							</div>

							<Divider />

							<div className="flex justify-between gap-4">
								<span className="w-24">{t('Date')}:</span>
								<span className="truncate flex-1">
									{dayjs(created_at).format('MMM DD, YYYY')}
								</span>
							</div>

							<Divider />

							<div className="flex justify-between gap-4">
								<span className="w-24">{t('uuid')}:</span>
								<span className="truncate flex-1">{uuid}</span>
							</div>

							<Divider />
						</div>

						{data && (
							<div className="space-y-3">
								{!editable && (
									<div className="flex justify-end">
										<Button
											color="primary"
											size="sm"
											variant="light"
											startContent={<i className="ri-image-edit-line ri-xl" />}
											onPress={() => setEditable(true)}
										>
											{t('Edit')}
										</Button>
									</div>
								)}

								<Input
									size="sm"
									value={data.name ?? ''}
									label={t('Name')}
									labelPlacement="outside-left"
									classNames={inputStyle}
									isReadOnly={!editable}
									onValueChange={(val) => setData('name', val)}
								/>

								{data.custom_properties && (
									<>
										<Textarea
											size="sm"
											value={data.custom_properties.altText ?? ''}
											label={t('Alt text')}
											labelPlacement="outside-left"
											classNames={inputStyle}
											isReadOnly={!editable}
											onValueChange={(val) =>
												setData('custom_properties', {
													...data.custom_properties,
													altText: val,
												})
											}
										/>

										<Textarea
											size="sm"
											value={data.custom_properties.caption ?? ''}
											label={t('Caption')}
											labelPlacement="outside-left"
											classNames={inputStyle}
											isReadOnly={!editable}
											onValueChange={(val) =>
												setData('custom_properties', {
													...data.custom_properties,
													caption: val,
												})
											}
										/>

										<Textarea
											size="sm"
											value={data.custom_properties.description ?? ''}
											label={t('Description')}
											labelPlacement="outside-left"
											classNames={inputStyle}
											isReadOnly={!editable}
											onValueChange={(val) =>
												setData('custom_properties', {
													...data.custom_properties,
													description: val,
												})
											}
										/>
									</>
								)}

								{editable && (
									<div className="pt-1 pb-3 flex gap-3">
										<Button
											variant="faded"
											className="flex-1"
											onPress={() => setEditable(false)}
										>
											{t('Cancel')}
										</Button>

										<Button
											color="primary"
											className="flex-1"
											onPress={() => {
												setData({
													...data,
													name: data.name,
													custom_properties: data.custom_properties,
												})

												updateFile(data as ImageProps)

												setEditable(false)
											}}
										>
											{t('Save')}
										</Button>
									</div>
								)}

								<div className="flex gap-3">
									<Input
										isReadOnly
										value={original_url}
										label={t('File URL')}
										size="sm"
										labelPlacement="outside-left"
										classNames={inputStyle}
									/>

									<Button
										isIconOnly
										size="sm"
										radius="lg"
										onPress={() => handleCopy(original_url)}
									>
										<i className="ri-file-copy-line"></i>
									</Button>
								</div>
							</div>
						)}

						<div className="flex justify-end">
							<a href={original_url} target="_blank">
								<Button
									size="sm"
									color="primary"
									variant="light"
									startContent={<i className="ri-image-circle-line ri-2x" />}
								>
									{t('Open image in new tab')}
								</Button>
							</a>
						</div>
					</div>

					<div className="mt-8 flex justify-end">
						<Button
							size="sm"
							color="danger"
							variant="light"
							startContent={<i className="ri-close-line ri-xl" />}
							onPress={() => deleteFile(id)}
						>
							{t('Delete permanently')}
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<aside
			className={cn(
				'bg-content1 border-left-100 border-l w-60 hidden inset-y-0 right-0 absolute',
				'lg:block lg:w-96',
				'dark:border-gray-800'
			)}
		>
			{content()}
		</aside>
	)
}

const FileNotFound = () => (
	<div className="text-foreground-600 fill-foreground-200 text-sm font-medium py-14">
		<div className="flex flex-col items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="w-16"
			>
				<path d="M20 3C20.5523 3 21 3.44772 21 4V5.757L19 7.757V5H5V13.1L9 9.1005L13.328 13.429L11.9132 14.8422L9 11.9289L5 15.928V19H15.533L16.2414 19.0012L17.57 17.671L18.8995 19H19V16.242L21 14.242V20C21 20.5523 20.5523 21 20 21H4C3.45 21 3 20.55 3 20V4C3 3.44772 3.44772 3 4 3H20ZM21.7782 7.80761L23.1924 9.22183L15.4142 17L13.9979 16.9979L14 15.5858L21.7782 7.80761ZM15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7Z"></path>
			</svg>

			<p className="">{t('Select an image to start editing')}</p>
		</div>
	</div>
)
