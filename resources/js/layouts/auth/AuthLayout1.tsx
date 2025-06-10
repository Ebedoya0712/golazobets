import { PropsWithChildren } from 'react'
import { Head } from '@inertiajs/react'
import { useColorMode } from '@/hooks'
import { theme } from '@/config'

interface PropsLayout extends PropsWithChildren {
	pageTitle: string
}

export const AuthLayout1 = ({ children, pageTitle }: PropsLayout) => {
	const { colorMode } = useColorMode()

	return (
		<>
			<Head title={pageTitle} />

			<main className="bg-background w-full min-h-screen flex justify-center items-center">
				<section className="max-w-lg">
					<img
						src={theme[colorMode].logo}
						alt="Logo"
						className="w-72 mx-auto"
					/>

					<div className="space-y-2 mt-10">
						<h2 className="font-bold">{pageTitle}</h2>
						{children}
					</div>
				</section>
			</main>
		</>
	)
}
