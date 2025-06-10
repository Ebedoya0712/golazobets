import { useMainStore } from '@/store'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	title: string | JSX.Element
}

export const UserPageHeader = ({ children, title }: Props) => {
	const { sidebarOpen, setSidebarOpen } = useMainStore()

	return (
		<div className="flex justify-center px-6 py-4 2xl:px-0">
			<div className="max-w-7xl flex flex-1 justify-between items-center">
				<h1 className="text-primary text-2xl font-bc font-semibold uppercase truncate md:text-3xl">
					{title}
				</h1>

				{children}
			</div>
		</div>
	)
}
