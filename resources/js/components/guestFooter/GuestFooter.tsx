import { Link } from '@inertiajs/react'

import { AutoProhibition } from './AutoProhibition'
import { BetWell } from './BetWell'
import { Eighteen } from './Eighteen'
import { SecureBet } from './SecureBet'

export const GuestFooter = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className="bg-primary flex justify-center">
			<div
				className="w-full max-w-5xl select-none py-6 grid px-5 
				sm:grid-cols-2 md:grid-cols-1 2xl:px-0"
			>
				<nav
					className="flex flex-col items-center gap-1 
						[&_a]:text-primary-100 [&_a]:text-sm [&_a]:font-medium [&_a]:transition-colors [&_a:hover]:text-primary-50
						sm:items-start md:flex-row md:gap-x-4 md:[&_a]:text-xs"
				>
					<Link href={route('legalConditions')}>Condiciones generales</Link>
					<em className="bg-primary-300 w-px" />
					<Link href={route('privacyPolicy')}>Política de privacidad</Link>
					<em className="bg-primary-300 w-px" />
					<Link href={route('cookiesPolicy')}>Política de cookies</Link>
					<em className="bg-primary-300 w-px" />
					<Link href={route('betResponsibly')}>Juega con responsabilidad</Link>
				</nav>

				<div className="flex flex-col items-center gap-5 mt-10 sm:mt-0 md:mt-1 md:flex-row">
					<p className="text-primary-100 text-xs font-medium">
						golazobets.com promueve el juego responsable
					</p>
					<a
						href="https://www.ordenacionjuego.es/participantes-juego/juego-seguro/rgiaj"
						target="_blank"
					>
						<Eighteen />
					</a>
					<a
						href="https://www.ordenacionjuego.es/participantes-juego/juego-seguro/rgiaj"
						target="_blank"
					>
						<AutoProhibition />
					</a>
					<a href="https://www.jugarbien.es" target="_blank">
						<BetWell />
					</a>
					<a
						href="https://www.ordenacionjuego.es/participantes-juego/juego-seguro"
						target="_blank"
					>
						<SecureBet />
					</a>
				</div>

				<p className="text-primary-100 text-xs text-center font-medium mt-4 sm:col-span-2 sm:text-left md:col-span-1 md:mt-1">
					&copy; {currentYear} golazobets.com todos los derechos reservados
				</p>
			</div>
		</div>
	)
}
