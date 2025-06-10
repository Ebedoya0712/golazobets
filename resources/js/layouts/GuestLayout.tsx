import {
	AgeConfirmationModal,
	GuestFooter,
	GuestHeader,
	Toastify,
} from '@/components'
import { useColorMode, useCookies } from '@/hooks'
import { Head } from '@inertiajs/react'
import { PropsWithChildren, useRef } from 'react'

type PropsLayout = {
	pageTitle: string
} & PropsWithChildren

export const GuestLayout = ({ children, pageTitle }: PropsLayout) => {
	const { colorMode } = useColorMode()
	const { getCookie } = useCookies()

	const currentRoute = useRef(route().current())

	return (
		<>
			<Head title={pageTitle} />

			<main className="bg-background w-full min-h-svh">
				<GuestHeader />
				{children}
			</main>

			<GuestFooter />

			{!getCookie('ageConfirmation') && <AgeConfirmationModal />}
			<Toastify {...{ colorMode }} />
		</>
	)
}
