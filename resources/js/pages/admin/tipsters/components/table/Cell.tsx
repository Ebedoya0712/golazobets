import {
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react'
import { t } from '@/i18n'
import { Link, router } from '@inertiajs/react'

interface Props {
	item: any
	key: string
}

export const Cell = ({ item, key }: Props) => {
	switch (key) {
		case 'id':
			return item.id
		case 'username':
			return (
				<Link
					className="font-semibold"
					href={route('admin.tipsters.edit', { tipster: item })}
				>
					{item.user.username}
				</Link>
			)
		case 'type':
			return <span className="font-semibold">{item.type}</span>
		case 'picks':
			return <span className="font-semibold">{item.picks_count}</span>
		case 'sport':
			return (
				<span className="font-semibold" style={{ color: item.sport.color }}>
					{item.sport.name}
				</span>
			)
		case 'actions':
			return (
				<div className="flex justify-end">
					<div className="space-x-2">
						<Button
							size="sm"
							color="primary"
							variant="flat"
							as={Link}
							href={route('admin.tipsters.edit', { tipster: item })}
						>
							{t('Edit')}
						</Button>
					</div>
				</div>
			)

		default:
			return null
	}
}
