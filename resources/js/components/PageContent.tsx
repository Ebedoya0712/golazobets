import { cn } from '@nextui-org/react'
import { PropsWithChildren, ReactElement } from 'react'

interface Props extends PropsWithChildren {
	className?: string
	classNames?: {
		content?: string
		wrapper?: string
	}
	aside?: ReactElement
	bottomSpacerClassName?: string
}

export const PageContent = ({
	children,
	classNames,
	aside,
	bottomSpacerClassName,
}: Props) => {
	return (
		<>
			<section className={cn('px-5 py-7 md:px-6 md:py-8', classNames?.wrapper)}>
				<div className={cn('flex gap-20', classNames?.content)}>
					{children}

					{aside && (
						<aside className="hidden sticky top-20 h-32 xl:flex">{aside}</aside>
					)}
				</div>

				<div className={cn('h-20', bottomSpacerClassName)} />
			</section>
		</>
	)
}
