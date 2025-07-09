import { Link, usePage } from '@inertiajs/react'
import { SectionHeader } from './SectionHeader'

import { t } from '@/i18n'
import type { PageProps } from '@/types'
import type { Pick } from '@/types/picks.d'
import { Button, Image } from '@nextui-org/react'
import dayjs from 'dayjs'

export const FeaturedPicks = () => {
	const props = usePage().props as PageProps
	const { featuredPicks } = props as unknown as {
		featuredPicks: Pick[]
	}
	const user = props.auth?.user

	const pick = featuredPicks[0]
	const picks = featuredPicks.slice(1)

	return (
		<section>
			<div>
				<SectionHeader title="PRONÓSTICOS DESTACADOS">
					<Button
						variant="bordered"
						radius="none"
						as={Link}
						href={route('free.picks')}
						className="border-black font-bc font-semibold uppercase hover:bg-secondary hover:border-secondary"
					>
						{t('Ver más pronósticos')}
					</Button>
				</SectionHeader>

				<div className="pt-10 pb-5 max-w-xl mx-auto grid gap-x-6 gap-y-5 md:pb-14 lg:grid-cols-2 lg:max-w-full">
					{/* --------------------------------------------------------------------------- */}
					{/* FIRST PICK */}
					{/* --------------------------------------------------------------------------- */}
					{pick && (
						<div className="flex gap-x-4 lg:flex-col lg:gap-y-3">
							<div className="bg-gray-200 h-16 aspect-video shrink-0 lg:w-full lg:h-64 lg:aspect-auto">
								{pick.screenshot_path && (
									<Image
										src={`/storage/img/${pick.screenshot_path}`}
										fallbackSrc="https://via.placeholder.com/300x200"
										alt="Pick screenshot"
										classNames={{
											img: 'size-full object-cover',
											wrapper: 'size-full',
										}}
										width="100%"
									/>
								)}
							</div>

							<div className="flex-1 max-w-full space-y-2">
								<div className="space-y-1">
									<div className="bg-white flex justify-between">
										<p className="font-bc text-sm font-medium leading-tight uppercase h-5 px-2 flex items-center">
											{t('Pronóstico')}
										</p>

										<p className="bg-secondary font-bc text-sm font-semibold leading-tight h-5 px-2 flex items-center">
											{dayjs(pick.event_date).format('DD/MM/YYYY')}
										</p>
									</div>
								</div>

								<div className="space-y-1 pl-2">
									<h4 className="text-black text-sm tracking-tight leading-tight truncate overflow-hidden">
										{pick.competition} - {pick.event}
									</h4>
									<p className="text-gray-400 text-xs font-medium truncate">
										{user?.name ?? ''}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* --------------------------------------------------------------------------- */}
					{/* The rest of the PICKS */}
					{/* --------------------------------------------------------------------------- */}
					{picks && (
						<div className="space-y-3">
							{picks.map((pick) => (
								<div key={pick.id} className="flex gap-x-4">
									<div className="bg-gray-200 h-16 aspect-video shrink-0">
										{pick.screenshot_path && (
											<Image
												src={`/storage/img/${pick.screenshot_path}`}
												fallbackSrc="https://via.placeholder.com/300x200"
												alt="Pick screenshot"
												width="100%"
												classNames={{
													wrapper: 'size-full',
													img: 'size-full object-cover rounded-none',
												}}
											/>
										)}
									</div>

									<div className="flex-1 space-y-2 overflow-hidden">
										<div className="space-y-1">
											<div className="bg-white flex justify-between">
												<p className="font-bc text-sm font-medium leading-tight uppercase h-5 px-2 flex items-center">
													{t('Pronóstico')}
												</p>

												<p className="bg-secondary font-bc text-sm font-semibold leading-tight h-5 px-2 flex items-center">
													{dayjs(pick.event_date).format('DD/MM/YYYY')}
												</p>
											</div>
										</div>

										<div className="space-y-1 pl-2">
											<h4 className="text-black text-sm tracking-tight leading-tight truncate">
												{pick.competition}-{pick.event}
											</h4>
											<p className="text-gray-400 text-xs font-medium truncate">
												{user?.name ?? ''}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
