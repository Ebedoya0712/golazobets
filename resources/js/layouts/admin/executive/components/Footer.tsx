import { cn, Divider } from '@nextui-org/react'
import { t } from '@/i18n'

export const Footer = () => {
	return (
		<div className="px-5 py-7 md:px-6 md:py-8">
			<div className="flex justify-between select-none">
				<div className="">
					<nav
						className={cn(
							'text-xs font-medium tracking-wide',
							'flex gap-5',
							'[&>a]:text-foreground [&>a:hover]:underline'
						)}
					>
						<a href={`${window.location.origin}:8025`} target="_blank">
							Mailpit
						</a>

						<Divider orientation="vertical" className="bg-foreground-600 h-4" />

						<a href={`${window.location.origin}/telescope`} target="_blank">
							Telescope
						</a>

						<Divider orientation="vertical" className="bg-foreground-600 h-4" />

						<a href={`${window.location.origin}/log-viewer`} target="_blank">
							Log viewer
						</a>
					</nav>
				</div>

				<div className="text-foreground-600 text-xs tracking-wide">
					{t('Made with Laravel, React and Inertia')}
				</div>
			</div>
		</div>
	)
}
