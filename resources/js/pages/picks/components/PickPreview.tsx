import { theme } from '@/config'
import { usePage } from '@inertiajs/react'
import { Avatar, Image } from '@nextui-org/react'
import dayjs from 'dayjs'
import ReactSafelySetInnerHTML from 'react-safely-set-inner-html'

import type { PickPreview as PickPreviewProps } from '@/types/picks'

type Props = {
	data: PickPreviewProps
}

export const PickPreview = ({ data }: Props) => {
	const { props } = usePage()
	const { sports, bookies } = props
	const { blankUser } = theme

	const sport = Array.isArray(sports)
		? sports.find((sport: any) => sport.id === data.sport_id)
		: null

	const bookie = Array.isArray(bookies)
		? bookies.find((bookie: any) => bookie.id === data.bookie_id)
		: null

	const type = {
		pre_match: 'PRE',
		live: 'LIVE',
		long_term: 'LONG',
	}[data.bet_type]

	return (
		<div className="bg-white min-h-60 p-6 space-y-4">
			<div className="flex items-center gap-3">
				<Avatar
					src={
						!!data.profile_picture
							? `/storage/img/users/avatars/${data.profile_picture}`
							: blankUser.avatar.path
					}
				/>

				{!!data.tipster_name && (
					<p className="text-sm font-semibold">{data.tipster_name}</p>
				)}
			</div>

			<hr className="border-gray-200" />

			<div className="">
				<p className="text-lg font-bold">{data.competition}</p>
				<p className="text-sm">{data.event}</p>
			</div>

			<div className="bg-sky-50 text-sky-600 p-3 rounded">
				<p className="text-sm">{data.pick}</p>
			</div>

			<div className="text-sm leading-tight flex items-center justify-center gap-3">
				<div className="flex flex-col items-center">
					<span className="text-xs">Deporte</span>
					<span>{data.sport && data.sport?.name}</span>
				</div>

				<span className="bg-gray-200 w-px h-10" />

				<div className="flex flex-col items-center">
					<span className="text-xs">Stake</span>
					<span>{data.stake}</span>
				</div>

				<span className="bg-gray-200 w-px h-10" />

				<div className="flex flex-col items-center">
					<span className="text-xs">Odds</span>
					<span>{data.odds}</span>
				</div>

				<span className="bg-gray-200 w-px h-10" />

				<div className="flex flex-col items-center">
					<span className="text-xs">Casa</span>
					<span>{data.bookie?.name}</span>
				</div>
			</div>

			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<i className="ri-time-line ri-lg text-sky-300" />
					<span className="capitalize text-sm">
						{dayjs(data.event_date).format('DD MMM YYYY')}
					</span>
					<span className="ml-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-lg">
						{type}
					</span>
				</div>
			</div>

			{!!data.analysis && (
				<div className="text-xs pt-3 [&_p]:min-h-2">
					<ReactSafelySetInnerHTML>{data.analysis}</ReactSafelySetInnerHTML>
				</div>
			)}

			{data.screenshot_path ? (
				<>
					<Image
						src={`/storage/img/${data.screenshot_path}`}
						fallbackSrc="https://via.placeholder.com/300x200"
						alt="Pick screenshot"
						className="rounded h-56 object-cover"
						width="100%"
					/>
				</>
			) : (
				<>
					{data.screenshot ? (
						<Image
							src={URL.createObjectURL(
								new Blob([data.screenshot], { type: 'image/jpeg' })
							)}
							alt="Pick screenshot"
							className="rounded h-52 object-cover"
							width="100%"
						/>
					) : (
						<div className="bg-gray-100 text-white w-full h-[170px] grid place-content-center rounded-lg">
							{/* <i className="ri-camera-off-line ri-2x" /> */}
						</div>
					)}
				</>
			)}
		</div>
	)
}
