import { Toastify } from '@/components'
import { useColorMode, useKeepSessionAlive } from '@/hooks'
import { usePage } from '@inertiajs/react'
import { useRef, type PropsWithChildren } from 'react'
import { LayoutCorporate } from './corporate/Layout'
import { LayoutExecutive } from './executive/Layout'
import { LayoutMobile } from './mobile/Layout'

import type { PageProps } from '@/types'

interface Props extends PropsWithChildren {
	pageTitle: string
}

export const Layout = ({ children, pageTitle }: Props) => {
	const {
		userLayout,
		auth: { user },
	} = usePage<PageProps>().props

	const { colorMode } = useColorMode()
	window.locale = user?.account?.language ?? 'en'

	useKeepSessionAlive()

	const currentRoute = useRef(route().current())

	switch (userLayout) {
		case 'executive':
			return (
				<>
					<main className="bg-background min-h-screen">
						<LayoutExecutive {...{ children, pageTitle }} />
					</main>
					<Toastify {...{ colorMode }} />
				</>
			)

		case 'mobile':
			return (
				<>
					<main className="bg-background min-h-screen">
						<LayoutMobile {...{ children, pageTitle }} />
					</main>
					<Toastify {...{ colorMode }} />
				</>
			)

		default:
			return (
				<>
					<main className="bg-background min-h-screen">
						<LayoutCorporate {...{ children, pageTitle }} />
					</main>
					<Toastify {...{ colorMode }} />
				</>
			)
	}
}
