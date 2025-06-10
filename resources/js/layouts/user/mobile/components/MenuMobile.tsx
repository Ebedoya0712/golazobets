import { cn } from '@nextui-org/react'
import { Link } from '@inertiajs/react'
import { t } from '@/i18n'
import { templates } from '@/config'

const { mobile: template } = templates

export const MenuMobile = () => {
	return (
		<div
			className={cn(
				'bg-content1 border-t border-content3',
				'inset-x-0 bottom-0 fixed shadow-xl z-20'
			)}
		>
			<nav className="flex justify-between">
				<Link 
					href={route('homePage')} 
					className="flex-1 flex flex-col items-center justify-center h-14 text-foreground hover:bg-content2 transition-colors">
					<i className="ri-home-line ri-lg mt-1" />
					<span className="text-xs mt-1">{t('Dashboard')}</span>
				</Link>

				<Link 
					href={route('homePage')} 
					className="flex-1 flex flex-col items-center justify-center h-14 text-foreground hover:bg-content2 transition-colors">
					<i className="ri-book-open-line ri-lg mt-1" />
					<span className="text-xs mt-1">{t('Menu')}</span>
				</Link>

				<Link 
					href={route('homePage')} 
					className="flex-1 flex flex-col items-center justify-center h-14 text-foreground hover:bg-content2 transition-colors">
					<i className="ri-store-3-line ri-lg mt-1" />
					<span className="text-xs mt-1">{t('Stores')}</span>
				</Link>

				<Link 
					href={route('profile.edit')} 
					className="flex-1 flex flex-col items-center justify-center h-14 text-foreground hover:bg-content2 transition-colors">
					<i className="ri-user-line ri-lg mt-1" />
					<span className="text-xs mt-1">{t('Profile')}</span>
				</Link>
			</nav>
		</div>
	)
}
