import { t } from '@/i18n'
import { cn } from '@nextui-org/react'

type Props = {
	selected: (selection: any) => void
	type: string
}

export const RegisterProfileTypeSelector = ({ selected, type }: Props) => {
	return (
		<div className="flex gap-6">
			<button
				onClick={() => {
					selected('tipster')
				}}
				className={cn(
					'bg-white border border-gray-200 w-full h-28',
					type === 'tipster' && 'bg-primary-50 text-primary border-primary'
				)}
			>
				{t('Soy tipster')}
			</button>
			<button
				onClick={() => {
					selected('gambler')
				}}
				className={cn(
					'bg-white border border-gray-200 w-full h-28',
					type === 'gambler' && 'bg-primary-50 text-primary border-primary'
				)}
			>
				{t('Quiero apostar')}
			</button>
		</div>
	)
}
