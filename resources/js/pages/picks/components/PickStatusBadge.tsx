import { t } from '@/i18n'
import { Chip } from '@nextui-org/react'

export const PickStatusBadge = ({ status }: { status: string }) => {
	switch (status) {
		case 'pending':
			return (
				<Chip
					size="sm"
					color="warning"
					radius="none"
					className="[&>span]:!font-bold uppercase"
				>
					{t('Pendiente')}
				</Chip>
			)
		case 'won':
			return (
				<Chip
					size="sm"
					color="success"
					radius="none"
					className="[&>span]:!font-bold uppercase"
				>
					{t('Ganado')}
				</Chip>
			)
		case 'lost':
			return (
				<Chip
					size="sm"
					color="danger"
					radius="none"
					className="bg-red-600 [&>span]:!font-bold uppercase"
				>
					{t('Fallado')}
				</Chip>
			)
		case 'cancelled':
			return (
				<Chip
					size="sm"
					color="default"
					radius="none"
					className="[&>span]:!font-bold uppercase"
				>
					{t('Cancelado')}
				</Chip>
			)
		default:
			return (
				<Chip
					size="sm"
					radius="none"
					className="bg-sky-500 text-white [&>span]:!font-bold uppercase"
				>
					{t('Nulo')}
				</Chip>
			)
	}
}
