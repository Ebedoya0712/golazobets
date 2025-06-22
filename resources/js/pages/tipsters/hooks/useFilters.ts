import { useEffect, useRef, useState } from 'react'
import { router, usePage } from '@inertiajs/react'

import type { PageProps } from '@/types'
import type { FilterProps } from '@/types/tipsters'

export const useFilters = () => {
	const { props } = usePage<PageProps>()
const { filters: requestFilters } = props

const normalizedFilters: FilterProps = {
	username: requestFilters?.username ?? '',
	order_by: requestFilters?.order_by ?? '',
	sport_id: requestFilters?.sport_id ?? '0',
	profit: requestFilters?.profit ?? 0,
	picks: requestFilters?.picks ?? 0,
	yield: requestFilters?.yield ?? 0,
}

const [filters, setFilters] = useState<FilterProps>(normalizedFilters)
	const firstRender = useRef(true)

	const filterResults = () => {
		router.reload({
			data: { filters },
			only: ['tipsters'],
			// onFinish: () => console.log('RELOAD'),
		})
	}

	const clearFilters = () => {
		router.visit(props.ziggy.location, { preserveScroll: true })
	}

	// Filter by username
	useEffect(() => {
		if (!firstRender.current) {
			if (filters.username.length > 3) filterResults()
			if (filters.username.length === 0) filterResults()
		}
	}, [filters.username])

	useEffect(() => {
		if (!firstRender.current) filters.order_by && filterResults()
	}, [filters.order_by])

	// Filter by sport
	useEffect(() => {
		if (!firstRender.current) filters.sport_id && filterResults()
	}, [filters.sport_id])

	useEffect(() => {
		if (!firstRender.current) filterResults()
	}, [filters.profit, filters.picks, filters.yield])

	useEffect(() => {
		firstRender.current = false
	}, [])

	return { filters, setFilters, clearFilters, order }
}

const order = [
	{ key: 'profit', label: 'Beneficio' },
	{ key: 'picks', label: 'Apuestas' },
	{ key: 'yield', label: 'Yield' },
]
