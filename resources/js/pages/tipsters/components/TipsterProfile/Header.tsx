import config from '@/config'
import { t } from '@/i18n'
import { usePage } from '@inertiajs/react'
import { Button, Image } from '@nextui-org/react'
import numeral from 'numeral'

import type { PageProps } from '@/types'
import type { Tipster } from '@/types/tipsters.d'

export const Header = () => {
	const { props } = usePage<
		PageProps & {
			userTipster: any
			tipster: Tipster
			subscriptions: any
		}
	>()
	const { userTipster, tipster, subscriptions } = props
	const { tipster_stats, user } = tipster
	const { account } = user

	return (
		<section>
			<div className="bg-gray-200 pt-72 flex justify-center relative md:pt-64">
				<div className="bg-gradient-to-t from-black/70 to-transparent w-full flex justify-center relative z-20">
					<div
						className="w-full max-w-5xl flex flex-col gap-y-5 pb-5 px-5 
						md:flex-row md:items-end md:justify-between xl:px-0"
					>
						<div className="flex flex-1 gap-3 md:items-end">
							<Image
								radius="none"
								src={
									userTipster.profile_picture
										? `/storage/img/users/avatars/${userTipster.profile_picture}`
										: config.userBlank
								}
								classNames={{
									wrapper: 'bg-white size-16 shrink-0 md:size-32 md:top-10',
									img: 'size-16 object-cover md:size-32',
								}}
							/>

							<div className="text-white">
								<p className="font-bc font-semibold uppercase md:text-lg">
									{'premium' === tipster.type
										? t('Tipster premium')
										: t('Tipster free')}
								</p>
								<h2 className="text-3xl font-bc font-semibold uppercase md:text-4xl">
									{userTipster.username}
								</h2>
							</div>
						</div>

						<div className="flex justify-between items-end md:pl-0">
							<div className="flex gap-x-1 -mb-2 md:mb-0">
								{account.telegram_user && (
									<a
										href={`https://t.me/${account.telegram_user}`}
										target="_blank"
									>
										<Button
											isIconOnly
											variant="light"
											className="text-white relative md:top-2"
										>
											<i className="ri-telegram-2-fill ri-xl" />
										</Button>
									</a>
								)}

								{account.x_user && (
									<a href={`https://x.com/${account.x_user}`} target="_blank">
										<Button
											isIconOnly
											variant="light"
											className="text-white relative md:top-2"
										>
											<i className="ri-twitter-x-line ri-xl" />
										</Button>
									</a>
								)}

								{account.instagram_user && (
									<a
										href={`https://instagram.com/${account.instagram_user}`}
										target="_blank"
									>
										<Button
											isIconOnly
											variant="light"
											className="text-white relative md:top-2"
										>
											<i className="ri-instagram-fill ri-xl" />
										</Button>
									</a>
								)}

								{account.facebook_user && (
									<a
										href={`https://facebook.com/${account.facebook_user}`}
										target="_blank"
									>
										<Button
											isIconOnly
											variant="light"
											className="text-white relative md:top-2"
										>
											<i className="ri-facebook-fill ri-xl" />
										</Button>
									</a>
								)}
							</div>

							<div className="text-white text-center max-w-16 md:ml-6">
								<p className="text-sm font-bc">{t('FOLLOWERS')}</p>
								<p className="text-3xl font-bc leading-none font-semibold truncate">
									{numeral(subscriptions).format('0a')}
								</p>
							</div>
						</div>
					</div>
				</div>

				<Image
					removeWrapper
					radius="none"
					src={
						tipster.cover_image
							? `/storage/img/tipsters/covers/${tipster.cover_image}`
							: '/img/profile-picture-blank.jpg'
					}
					className="size-full object-cover object-center top-0 absolute z-10"
				/>
			</div>

			<div className="bg-primary flex justify-center relative">
				<div
					className="w-full max-w-5xl grid grid-cols-2 
					[&>div]:text-white [&>div]:border-primary-500 [&>div]:px-3 [&>div]:py-4 
					md:grid-cols-5 md:[&>div:not(:first-child)]:border-l md:[&>div]:pt-12 md:[&>div]:text-center"
				>
					<div>
						<div className="text-3xl font-bc truncate">
							{tipster_stats?.yield
								? String(tipster_stats.yield).replace('.', ',') + '%'
								: '...'}
						</div>
						<div className="text-primary-200 text-lg font-bc font-semibold uppercase">
							{t('Yield')}
						</div>
					</div>

					<div>
						<div className="text-3xl font-bc truncate">
							{tipster_stats?.profit
								? '+' + String(tipster_stats.profit).replace('.', ',') + ' uds'
								: '...'}
						</div>
						<div className="text-primary-200 text-lg font-bc font-semibold uppercase">
							{t('Beneficio')}
						</div>
					</div>

					<div>
						<div className="text-3xl font-bc truncate">
							{tipster_stats?.total_bet
								? String(tipster_stats.total_bet).replace('.', ',')
								: '...'}
						</div>
						<div className="text-primary-200 text-lg font-bc font-semibold leading-none uppercase truncate">
							{t('Unidades apostadas')}
						</div>
					</div>

					<div>
						<div className="text-3xl font-bc truncate">
							{tipster_stats?.win_rate
								? String(tipster_stats?.win_rate).replace('.', ',') + '%'
								: '...'}
						</div>
						<div className="text-primary-200 text-lg font-bc font-semibold uppercase">
							{t('Win rate')}
						</div>
					</div>

					<div>
						<div className="text-3xl font-bc truncate">
							{tipster_stats?.average_stake
								? String(tipster_stats?.average_stake).replace('.', ',')
								: '...'}
						</div>
						<div className="text-primary-200 text-lg font-bc font-semibold uppercase">
							{t('Stake medio')}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
