import { cn } from '@nextui-org/react'
import { PropsWithChildren, ReactElement } from 'react'

interface Props extends PropsWithChildren {
	title: string | ReactElement
	classNames?: {
		base?: string
		wrapper?: string
	}
}

export const PageHeader = ({ title, children, classNames }: Props) => {
	return (
		<div
			className={cn(
				'bg-primary-400 w-full px-6 pt-7 pb-4',
				'border-b-4 border-secondary',
				'flex justify-center',
				'md:px-10 xl:gap-20',
				'dark:bg-black',
				classNames && classNames.base
			)}
		>
			<div
				className={cn(
					'w-full grid gap-3 md:gap-6',
					children && 'grid-cols-2',
					classNames && classNames.wrapper
				)}
			>
				{title && (
					<h2 className="text-white font-bc text-3xl font-medium uppercase select-none truncate">
						{title}
					</h2>
				)}

				{children && <div>{children}</div>}
			</div>
		</div>
	)
}
