import { Layout } from '@/layouts/user/Layout'
import { t } from '@/i18n'
import { PageHeader, PageContent, MediaManager } from '@/components'
import { Image, Pagination } from '@nextui-org/react'
import { router } from '@inertiajs/react'

import type { Image as ImageProps } from '@/components/mediaManager/types.d'

const pageTitle = String(t('Image gallery'))

type Props = {
	images: {
		data: ImageProps[]
		last_page: number
		current_page: number
	}
	imagesTotal: number
}

const Page = ({ images, imagesTotal }: Props) => {
	return (
		<>
			<PageHeader title={pageTitle}>
				<div className="flex justify-end">
					<MediaManager
						{...{
							selectMultiple: true,
							button: {
								text: images ? 'Update images' : 'Add images',
								props: { className: 'px-6', size: 'md' },
							},
						}}
					/>
				</div>
			</PageHeader>

			<PageContent>
				{images.data ? (
					<div className="space-y-14">
						<div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
							{images.data.map(({ id, name, size, preview_url }) => (
								<div key={id}>
									<Image
										isZoomed
										width={250}
										alt={name}
										src={preview_url}
										classNames={{ img: 'aspect-square object-cover' }}
									/>
								</div>
							))}
						</div>

						<div className="flex justify-end gap-10">
							{images.last_page > 1 && (
								<Pagination
									total={images.last_page}
									initialPage={images.current_page}
									variant="light"
									onChange={(page) => router.reload({ data: { page } })}
								/>
							)}

							<MediaManager
								{...{
									selectMultiple: true,
									button: {
										text: images ? 'Update images' : 'Add images',
										props: { className: 'px-6', size: 'md' },
									},
								}}
							/>
						</div>
					</div>
				) : (
					<div className="">{t('The gallery is empty')}</div>
				)}
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle }} />
)

export default Page
