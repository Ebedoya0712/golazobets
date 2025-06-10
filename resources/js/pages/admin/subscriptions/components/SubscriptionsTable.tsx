import { TableContent } from '@/components'
import { usePage } from '@inertiajs/react'
import { Cell } from './table/Cell'

import type { PageProps } from '@/types'

type Props = {}

export const SubscriptionsTable = ({}: Props) => {
	const { props } = usePage<PageProps>()
	const { subscriptions } = props
	const { data, links, current_page } = subscriptions

	return (
		<TableContent
			{...{
				reloadOnly: ['subscriptions'],
				data,
				links,
				current_page,
				columns,
				removeWrapper: true,
				cell: (item: any, key: string) =>
					Cell({ ...{ item, key: String(key) } }),
			}}
		/>
	)
}

const columns = [
	{ key: 'id', label: '#', width: 40 },
	{ key: 'type', label: 'Tipo' },
	{ key: 'user', label: 'User' },
	{ key: 'to', label: '' },
	{ key: 'tipster', label: 'Tipster' },
	{ key: 'date', label: 'Fecha' },
	{ key: 'actions', label: '' },
] as {
	id: string
	key: string
	label: string
	width?: number
	classname: string
}[]
