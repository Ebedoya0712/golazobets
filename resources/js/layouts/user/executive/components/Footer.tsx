import { t } from '@/i18n'

export const Footer = () => {
	return (
		<div className="px-5 py-7 md:px-6 md:py-8">
			<div className="flex justify-between select-none">
				<div />

				<div className="text-foreground-600 text-xs tracking-wide">
					{t('Made with Laravel, React and Inertia')}
				</div>
			</div>
		</div>
	)
}
