import { useEffect, useContext } from 'react'
import { Sidebar, EmptyLibrary } from '.'
import { t } from '@/i18n'
import { useMediaManager } from '../hooks'
import { MediaManagerContext } from '../providers/MediaManagerProvider'
import { cn, Card, CircularProgress, Image } from '@nextui-org/react'

import type { Image as ImageProps } from '../types.d'

export const MediaEditor = () => {
	const { getFiles, formatSize } = useMediaManager()
	const { files, fileToEdit, setFileToEdit } = useContext(MediaManagerContext)

	useEffect(() => {
		getFiles()
		return () => {
			setFileToEdit && setFileToEdit(null)
		}
	}, [])

	const selectFile = (file: ImageProps) => {
		if (fileToEdit && file.id === fileToEdit.id) {
			setFileToEdit && setFileToEdit(null)
		} else {
			setFileToEdit && setFileToEdit(file)
		}
	}

	return (
		<section className="w-full relative">
			<div className="inset-y-0 left-0 lg:absolute lg:right-96">
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
								'flex flex-col pl-3 pr-2 pt-5 pb-14',
								'lg:pr-0',
								'[&>button+button]:border-t [&>button+button]:border-divider'
							)}
						>
							{files.map((file: ImageProps) => (
								<Card
									isPressable
									key={file.id}
									radius="none"
									shadow="none"
									onPress={() => selectFile(file)}
									className={cn(
										fileToEdit &&
											file.id === fileToEdit.id &&
											'bg-primary [&_p]:text-white'
									)}
								>
									<div className="w-full px-2 py-2 flex gap-5 select-none">
										<Image
											radius="lg"
											removeWrapper
											alt={file.name}
											src={file.preview_url}
											width={60}
											className={cn(
												'aspect-square object-cover',
												fileToEdit &&
													file.id === fileToEdit.id &&
													'brightness-110 shadow-[0_0_20px_10px_#000000]'
											)}
										/>

										<div className="text-sm font-medium text-left flex-1">
											<p className="text-foreground-400 truncate">{file.id}</p>
											<p className="w-[50%] truncate">{file.name}</p>
											<p className="text-xs truncate">
												{formatSize(file.size)}
											</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
				)}
			</div>

			<Sidebar />
		</section>
	)
}
