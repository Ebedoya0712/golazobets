import { type PropsWithChildren, useEffect } from 'react'
import { Head } from '@inertiajs/react'
import { useMainStore } from '@/store'
import { useWindowWidth } from '@/hooks'
import { Header, Sidebar, Footer } from './components'
import { templates } from '@/config'

const { corporate: template } = templates

interface Props extends PropsWithChildren {
	pageTitle: string
}

export const LayoutExecutive = ({ children, pageTitle }: Props) => {
	const { sidebarOpen, setSidebarOpen } = useMainStore()
	const { windowWidth } = useWindowWidth()

	useEffect(() => {
		if (windowWidth > 768 && !sidebarOpen) {
			setSidebarOpen(true)
		}
	}, [windowWidth])

	return (
		<>
			<Head title={pageTitle} />

			<Header />

			<div className="flex justify-center min-h-svh">
				<Sidebar />

				<div className="w-full flex-1">
					{children}

					<Footer />
				</div>
			</div>
		</>
	)
}
