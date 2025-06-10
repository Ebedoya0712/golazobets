import { type PropsWithChildren } from 'react'
import { Head } from '@inertiajs/react'
import { MenuMobile } from './components'

interface Props extends PropsWithChildren {
	pageTitle: string
}

export const LayoutMobile = ({ children, pageTitle }: Props) => {
	return (
		<>
			<Head title={pageTitle} />

			<main className="min-h-dvh flex justify-center">
				<div className="flex-1 h-screen max-w-md relative overflow-hidden">
					<div className="h-full overflow-y-scroll">{children}</div>

					<MenuMobile />
				</div>
			</main>
		</>
	)
}
