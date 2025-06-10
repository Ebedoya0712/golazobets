import { useEffect, useContext } from 'react'
import { Sidebar, GallerySelection, EmptyLibrary } from '.'
import { t } from '@/i18n'
import { useMediaManager } from '../hooks'
import { MediaManagerContext } from '../providers/MediaManagerProvider'
import {
	cn,
	Card,
	CardFooter,
	CircularProgress,
	Image,
} from '@nextui-org/react'

import type { Image as ImageProps } from '../types.d'

export const MediaLibrary = () => {
	const { getFiles, formatSize } = useMediaManager()
	const {
		files,
		setFilesSelected,
		filesSelected,
		selectMultiple,
		setFileToEdit,
	} = useContext(MediaManagerContext)

	useEffect(() => {
		getFiles()
	}, [])

	const selectFile = (file: ImageProps) => {
		if (!selectMultiple) {
			setFileToEdit && setFileToEdit(file)

			if (
				filesSelected &&
				filesSelected[0] &&
				file.id === filesSelected[0].id
			) {
				setFilesSelected && setFilesSelected([])
			} else {
				setFilesSelected && setFilesSelected([file])
			}
		} else {
			// @ts-ignore
			setFilesSelected((prev: ImageProps[]) => {
				if (prev.find((f) => f.id === file.id)) {
					return prev.filter((f) => f.id !== file.id)
				} else {
					return [...prev, file]
				}
			})
		}
	}

	return (
		<section className="w-full relative">
			<div className="inset-y-0 left-0 absolute lg:right-96">
				{!files && (
					<div className="w-full h-full grid place-content-center">
						<CircularProgress label={t('Loading files')} />
					</div>
				)}

				{files && !files.length && <EmptyLibrary />}

				{files && (
					<div className="scrollbar-thin h-full overflow-y-scroll">
						<div
							className={cn(
								'grid grid-cols-3 gap-4 px-6 pt-4 pb-24',
								'sm:grid-cols-4 xl:grid-cols-5'
							)}
						>
							{files.map((file: ImageProps) => (
								<Card
									isPressable
									isFooterBlurred
									key={file.id}
									radius="md"
									classNames={{
										base: cn(
											'aspect-square',
											filesSelected &&
												filesSelected.find((f) => f.id === file.id) &&
												'outline outline-2 outline-primary'
										),
										footer:
											'bg-black/30 whitespace-nowrap flex-col items-end p-2 absolute bottom-0 inset-x-0 rounded-none z-10',
									}}
									onPress={() => selectFile(file)}
								>
									{filesSelected &&
										filesSelected.find((f) => f.id === file.id) && (
											<i className="ri-checkbox-circle-fill ri-2x text-primary right-0 -top-2 absolute pointer-events-none z-20"></i>
										)}
									<Image
										src={file.preview_url}
										alt={file.name}
										className={cn('w-full h-full object-cover')}
										radius="md"
										removeWrapper
									/>
									<CardFooter className="text-white">
										<div className="text-xs font-light text-right truncate w-full">
											{file.name}
										</div>
										<div className="text-xs truncate">
											{formatSize(file.size)}
										</div>
									</CardFooter>
								</Card>
							))}
						</div>
					</div>
				)}
			</div>

			{selectMultiple ? <GallerySelection /> : <Sidebar />}
		</section>
	)
}
