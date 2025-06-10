import { t } from '@/i18n'
import { Link } from '@inertiajs/react'
import { cn } from '@nextui-org/react'

type Props = {
	isMenuOpen?: boolean
}

export const MainNavbar = ({ isMenuOpen }: Props) => {
	const currentRoute = route().current()

	return (
		<nav
			className={`bg-primary flex-col flex-1 inset-x-0 top-full absolute pb-7
		lg:bg-transparent lg:h-full lg:relative lg:flex-row lg:top-auto lg:inset-x-auto lg:pb-0
		${isMenuOpen ? 'flex' : 'hidden lg:flex'}`}
		>
			<Link href={route('homePage')} className={cn(itemClassName)}>
				<span>{t('Inicio')}</span>

				{'homePage' === currentRoute && <span className={markerClassName} />}
			</Link>

			<Link href={route('tipsters')} className={itemClassName}>
				<span>{t('Tipsters')}</span>

				{'tipsters' === currentRoute && <span className={markerClassName} />}
				{'tipsters.free' === currentRoute && (
					<span className={markerClassName} />
				)}
				{'tipsters.premium' === currentRoute && (
					<span className={markerClassName} />
				)}
			</Link>

			<a href="https://golazobets.com" className={itemClassName}>
				<span>{t('Blog')}</span>
			</a>

			<Link href={route('free.picks')} className={itemClassName}>
				<span>{t('Apuestas gratis')}</span>

				{'free.picks' === currentRoute && <span className={markerClassName} />}
			</Link>

			<a
				href="https://golazobets.com/base-datos/"
				target="_blank"
				className={itemClassName}
			>
				<span>{t('Servicios')}</span>
			</a>

			<a
				href="https://discord.gg/RvEBY3TyKT"
				target="_blank"
				className={itemClassName}
			>
				{t('Foro')}
			</a>
		</nav>
	)
}

const itemClassName =
	'text-white font-bc font-medium uppercase min-w-20 h-12 px-4 truncate flex justify-center items-center relative select-none hover:text-secondary lg:h-full'

const markerClassName =
	'bg-secondary h-1 inset-x-0 bottom-0 absolute pointer-events-none hidden lg:block'
