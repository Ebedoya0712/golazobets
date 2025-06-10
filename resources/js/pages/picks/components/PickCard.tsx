import { theme } from '@/config'
import { PickStatusBadge } from '@/pages/picks/components/PickStatusBadge'
import { Link } from '@inertiajs/react'
import { Avatar, Chip, Image } from '@nextui-org/react'
import dayjs from 'dayjs'
import ReactSafelySetInnerHTML from 'react-safely-set-inner-html'

import type { Pick } from '@/types/picks.d'
import { useRef } from 'react'

type Props = {
	data: Pick
}

export const PickCard = ({ data }: Props) => {
	const type = useRef(
		{
			pre_match: 'PRE',
			live: 'LIVE',
			long_term: 'LONG',
		}[data.bet_type]
	)

	return (
		<div className="bg-white max-w-sm min-h-60 shadow-md select-none md:max-w-full">
			<div className="p-5 pb-3 space-y-2">
				<div className="flex justify-between items-center gap-x-6 pb-1">
					<TipsterProfile data={data} />

					<PickStatusBadge status={data.status} />
				</div>

				<hr className="border-gray-200" />

				<div>
					<p className="text-lg font-bold">{data.competition}</p>
					<p className="text-sm">{data.event}</p>
				</div>
			</div>

			<div className="bg-blue-50 text-primary px-5 py-2">
				<p className="text-sm font-medium truncate">{data.pick}</p>
			</div>

			<div className="p-5 pt-3 space-y-3">
				<div className="text-sm leading-tight flex items-center justify-center gap-3">
					<div className="flex flex-col items-center">
						<span className="text-gray-500 text-xs font-medium">Deporte</span>
						<span className="text-lg font-bc font-semibold truncate">
							{data.sport?.name}
						</span>
					</div>

					<span className="bg-gray-200 w-px h-10" />

					<div className="flex flex-col items-center">
						<span className="text-gray-500 text-xs font-medium">Stake</span>
						<span className="text-lg font-bc font-semibold truncate">
							{data.stake}
						</span>
					</div>

					<span className="bg-gray-200 w-px h-10" />

					<div className="flex flex-col items-center">
						<span className="text-gray-500 text-xs font-medium">Odds</span>
						<span className="text-lg font-bc font-semibold truncate">
							{data.odds}
						</span>
					</div>

					<span className="bg-gray-200 w-px h-10" />

					<div className="flex flex-col items-center">
						<span className="text-gray-500 text-xs font-medium">Casa</span>
						<span className="text-lg font-bc font-semibold truncate max-w-24">
							{data.bookie?.name}
						</span>
					</div>
				</div>

				<div className="space-y-1">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-x-1">
							<i className="ri-time-line text-sky-400" />

							<span className="capitalize text-sm">
								{dayjs(data.event_date).format('DD MMM. YYYY')}
							</span>
						</div>

						<Chip
							color="primary"
							radius="none"
							size="sm"
							className="!bg-primary-300 [&>span]:text-[.7rem] [&>span]:font-bold"
						>
							{type.current}
						</Chip>
					</div>
				</div>

				{!!data.analysis && (
					<div className="text-sm pt-2 [&_p]:min-h-2">
						<ReactSafelySetInnerHTML>{data.analysis}</ReactSafelySetInnerHTML>
					</div>
				)}

				{data.screenshot_path && (
					<Image
						src={`/storage/img/${data.screenshot_path}`}
						fallbackSrc="https://via.placeholder.com/300x200"
						alt="Pick screenshot"
						className="h-56 object-cover rounded-none"
						width="100%"
						classNames={{
							wrapper: 'bg-gray-50 rounded-none',
						}}
					/>
				)}
			</div>
		</div>
	)
}

const TipsterProfile = ({ data }: { data: any }) => {
	const { blankUser } = theme

	return (
		<div className="flex items-center gap-3 flex-1">
			{data.tipster_name ? (
				<Link
					href={route('tipster.profile', { username: data.tipster_name })}
					className="flex items-center gap-3"
				>
					<Avatar
						size="sm"
						src={
							!!data?.tipster?.user?.profile_picture
								? `/storage/img/users/avatars/${data?.tipster?.user?.profile_picture}`
								: blankUser.avatar.path
						}
					/>

					<p className="text-sm font-semibold truncate">{data?.tipster_name}</p>
				</Link>
			) : (
				<>
					<Avatar
						size="sm"
						src={
							!!data?.tipster?.user?.profile_picture
								? `/storage/img/users/avatars/${data?.tipster?.user?.profile_picture}`
								: blankUser.avatar.path
						}
					/>

					<p className="text-sm font-semibold truncate">
						{data?.tipster?.user?.username}
					</p>
				</>
			)}
		</div>
	)
}
