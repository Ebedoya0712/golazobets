import { t } from '@/i18n'
import {
	cn,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	type SortDescriptor,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Pager } from './components'
import { useTableSorting } from './hooks/useTableUtilities'
import { useTableStore } from './store/useTableStore'

import type { Props } from './types.d'

export const TableContent = ({
	reloadOnly,
	data,
	columns,
	links,
	cell,
	current_page,
	removeWrapper,
	hideHeader,
	radius = 'none',
	shadow = 'none',
	color,
	classNames = {
		base: 'w-full',
		th: '[&]:first:rounded-none [&]:last:rounded-none [&]:first:before:!rounded-none [&]:last:before:!rounded-none',
		td: '[&]:first:rounded-none [&]:last:rounded-none [&]:first:before:!rounded-none [&]:last:before:!rounded-none',
		tbody: 'rounded-none',
	},
	bottomContent,
	emptyContent,
	tableBody,
	selectionMode,
	allowsSorting,
	selectedKeys,
	onSelectionChange,
	topContent,
	isCompact = false,
}: Props) => {
	const { loading, setLoading } = useTableStore()

	const TableFooter = (
		<div className="flex gap-5 flex-col justify-between items-center lg:flex-row">
			<div className="">{bottomContent}</div>
			{links && current_page && (
				<Pager {...{ links, current_page, reloadOnly }} />
			)}
		</div>
	)

	useEffect(() => setLoading(false), [data])

	const sort = useTableSorting()
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>()

	return (
		<div className={cn(classNames?.tableWrapper)}>
			<Table
				{...{
					removeWrapper,
					hideHeader,
					radius,
					shadow,
					color,
					selectionMode,
					topContent: topContent,
					bottomContent: TableFooter,
					isCompact,
					sortDescriptor,
					selectedKeys,
					onSelectionChange,
					classNames,
				}}
				aria-label="Table"
				onSortChange={(sortDescriptor) => {
					const sd = sort({ sortDescriptor, only: reloadOnly })
					setSortDescriptor(sd)
					setLoading(true)
				}}
			>
				{/* TABLE HEADER */}
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							className={column.className}
							allowsSorting={allowsSorting}
						>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>

				{/* TABLE BODY */}
				{tableBody ? (
					<TableBody
						items={data}
						emptyContent={
							emptyContent ?? t('There are no results for this view')
						}
						loadingContent={<Spinner label={String(t('loading'))} />}
						isLoading={loading}
					>
						{tableBody}
					</TableBody>
				) : (
					<TableBody
						items={data}
						emptyContent={
							emptyContent ?? t('There are no results for this view')
						}
						loadingContent={<Spinner label={String(t('loading'))} />}
						isLoading={loading}
					>
						{(item: any) => (
							<TableRow key={item.id}>
								{(key) => (
									<TableCell>{cell ? cell(item, key) : <></>}</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>
		</div>
	)
}
