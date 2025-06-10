import { useCallback } from 'react'
import { usePage } from '@inertiajs/react'
import { Cell } from './table/Cell'
import { TableFilters } from './table/TableFilters'
import { Pager } from '@/components'
import { t } from '@/i18n'
import { TableContent } from '@/components'

import type { PageProps } from '@/types'
import type { Tipster } from '@/types/tipsters'

type Props = {}

export const TipstersTable = ({}: Props) => {
	const { tipsters, total } = usePage<PageProps>().props
	const { data, links, current_page } = tipsters

	return (
		<TableContent
			{...{
				reloadOnly: ['tipsters'],
				data: data,
				links,
				current_page,
				columns,
				removeWrapper: true,
				topContent: <TableFilters />,
				cell: (item: any, key: string) =>
					Cell({ ...{ item, key: String(key) } }),
			}}
		/>
	)
}

const columns = [
	{ key: 'id', label: '#' },
	{ key: 'username', label: 'Nombre' },
	{ key: 'type', label: 'Tipo' },
	{ key: 'sport', label: 'Deporte' },
	{ key: 'picks', label: 'Picks' },
	{ key: 'actions', label: '' },
] as {
	id: string
	key: string
	label: string
}[]
