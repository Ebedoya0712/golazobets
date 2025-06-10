import { useEffect, useRef, useState } from 'react'
import { router, usePage } from '@inertiajs/react'

import type { PageProps } from '@/types'
import type { FilterProps } from '@/types/tipsters'

export const useFilters = () => {
	const { props } = usePage<PageProps>()
	const { filters: requestFilters } = props

	const [filters, setFilters] = useState<FilterProps>(
		requestFilters ?? {
			username: '',
			order_by: null,
			sport_id: null,
			profit: 0,
			picks: 0,
			yield: 0,
		}
	)
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
