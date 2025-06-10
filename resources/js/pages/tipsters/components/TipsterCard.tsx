import config from '@/config'
import { Link } from '@inertiajs/react'
import { cn, Image } from '@nextui-org/react'

import { t } from '@/i18n'
import type { Tipster } from '@/types/tipsters'

type Props = {
	tipster: Tipster
	classNames?: {
		card?: string
		coverWrapper?: string
		coverImage?: string
	}
}

export const TipsterCard = ({ tipster, classNames }: Props) => {
	const { tipster_stats } = tipster

	return (
		<Link
			key={tipster.id}
			href={route('tipster.profile', {
				username: tipster.user.username,
			})}
			className={cn(
				'bg-white border border-gray-100 max-w-xs h-full block select-none shadow-black/5 shadow-lg',
				classNames?.card
			)}
		>
			<Image
				radius="none"
				src={
					tipster.cover_image
						? `/storage/img/tipsters/covers/${tipster.cover_image}`
						: config.coverBlank300
				}
				classNames={{
					wrapper: cn(
						'bg-gray-100 w-full min-h-24 relative',
						classNames?.coverWrapper
					),
					img: cn(classNames?.coverImage),
				}}
			/>

			<div className="flex items-end gap-2 px-2 -mt-8 relative z-20">
				<Image
					radius="none"
					src={
						tipster.user.profile_picture
							? `/storage/img/users/avatars/${tipster.user.profile_picture}`
							: config.userBlank
					}
					classNames={{
						wrapper: 'bg-white p-1',
						img: 'size-14 object-cover',
					}}
				/>
				<span className="text-black text-sm font-semibold truncate flex-1 mb-1">
					{tipster.user.username}
				</span>
			</div>

			<div className="h-[60px] px-2 pt-1 pb-4 grid grid-cols-3 gap-x-1">
				<div className="flex flex-col justify-between text-center leading-none">
					{tipster_stats?.yield && (
						<>
							<p className="text-xl font-bc font-semibold leading-tight truncate">
								{tipster_stats?.yield}%
							</p>
							<span className="text-[.7rem] font-medium truncate">
								{t('Yield')}
							</span>
						</>
					)}
				</div>

				<div className="flex flex-col justify-between text-center leading-none">
					{tipster_stats?.profit && (
						<>
							<p className="text-green-500 text-xl font-bc font-semibold leading-tight truncate">
								+{tipster_stats?.profit}
							</p>
							<span className="text-[.7rem] font-medium truncate">
								{t('Beneficio')}
							</span>
						</>
					)}
				</div>

				<div className="flex flex-col justify-between text-center leading-none">
					{tipster?.picks_count && (
						<>
							<p className="text-green-500 text-xl font-bc font-semibold leading-tight truncate">
								{tipster?.picks_count}
							</p>
							<span className="text-[.7rem] font-medium truncate">
								{t('Picks')}
							</span>
						</>
					)}
				</div>
			</div>
		</Link>
	)
}
