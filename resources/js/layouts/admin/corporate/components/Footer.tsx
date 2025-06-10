import { t } from '@/i18n'

export const Footer = () => {
	return (
		<div className="border-t border-gray-200 px-5 py-7 md:px-6 md:py-8">
			<div className="flex justify-between select-none">
				<div className=""></div>

				<div className="text-foreground-600 text-sm tracking-wide">
					{t('Made with Laravel, React and Inertia')} - &copy; 2025
				</div>
			</div>
		</div>
	)
}
