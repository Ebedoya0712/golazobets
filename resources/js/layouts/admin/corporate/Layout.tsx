import { useWindowWidth } from '@/hooks'
import { useMainStore } from '@/store'
import { Head, router } from '@inertiajs/react'
import { useVisibilityChange } from '@uidotdev/usehooks'
import { type PropsWithChildren, useEffect, useRef } from 'react'
import { Footer, Header, Sidebar } from './components'

interface Props extends PropsWithChildren {
	pageTitle: string
}

export const LayoutCorporate = ({ children, pageTitle }: Props) => {
	const { sidebarOpen, setSidebarOpen } = useMainStore()
	const { windowWidth } = useWindowWidth()

	const currentRoute = useRef(route().current())
	
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

				<div className="flex-1">
					{children}
					<Footer />
				</div>
			</div>
		</>
	)
}
