import { cn } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	title: string
	classNames?: {
		wrapper?: string
	}
}

export const SectionHeader = ({ children, title, classNames }: Props) => {
	return (
		<div
			className={cn(
				'bg-white p-3 pl-5 shadow-black- shadow-2xl',
				classNames?.wrapper
			)}
		>
			<div className="flex justify-between items-center gap-x-10">
				<h3 className="text-xl font-bc font-semibold tracking-tight uppercase lg:text-2xl">
					{title}
				</h3>
				{children}
			</div>
		</div>
	)
}
