import { templates } from '@/config'
import { useWindowWidth } from '@/hooks'
import { useMainStore } from '@/store'
import { Head } from '@inertiajs/react'
import { type PropsWithChildren, useEffect } from 'react'
import { Footer, Header, Sidebar } from './components'

const { corporate: template } = templates

interface Props extends PropsWithChildren {
	pageTitle: string
}

export const LayoutCorporate = ({ children, pageTitle }: Props) => {
	const { sidebarOpen, setSidebarOpen } = useMainStore()
	const { windowWidth } = useWindowWidth()

	useEffect(() => {
		if (windowWidth > 768 && !sidebarOpen) {
			setSidebarOpen(true)
		} else {
			setSidebarOpen(false)
		}
	}, [windowWidth])

	return (
		<>
			<Head title={pageTitle} />

			<Header />

			<div className="flex min-h-svh">
				<Sidebar />

				<div
					className={`w-full flex-1 lg:w-[calc(100%-${template.sidebar.width})]`}
				>
					{children}
					<Footer />
				</div>
			</div>
		</>
	)
}
