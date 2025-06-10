import { ReactElement, ReactNode } from 'react'

export type Props = {
	/**
	 * REQUIRED
	 */
	// A string with the refference name of the data
	reloadOnly: string[]
	// Data
	data: any
	// Array of column configurations for the table
	columns: {
		key: string
		label: string
		width?: number
		className?: string
	}[]
	// Array of row data for the table
	links?: {
		url: string
		label: string
		active: boolean
	}[]
	// Array of row data for the table
	current_page?: number
	// Array of row data for the table
	cell: any

	/**
	 * OPTIONAL
	 */
	// Remove the wrapper around the table
	removeWrapper?: boolean
	// Hide the header of the table
	hideHeader?: boolean
	// Hide the border around the table
	hideBorder?: boolean
	// Set border radius for the table
	radius?: 'none' | 'sm' | 'md' | 'lg' | undefined
	// Set shadow for the table
	shadow?: 'none' | 'sm' | 'md' | 'lg' | undefined
	// Color variant for the table styling
	color?:
		| 'primary'
		| 'default'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| undefined
	// Custom class names for the table components
	classNames?: {
		tableWrapper?: string
		base?: string
		th?: string
		tr?: string
		td?: string
		thead?: string
		tbody?: string
		tfoot?: string
		table?: string
		wrapper?: string
		sortIcon?: string
		emptyWrapper?: string
		loadingWrapper?: string
	}
	// Bottom content for the table
	topContent?: ReactElement | null
	bottomContent?: React.ReactNode
	// Empty content element or text to display when the table is empty
	emptyContent?: React.ReactNode
	// Table body element
	tableBody?: ReactElement | null
	// Selection mode for the table
	selectionMode?: 'single' | 'multiple' | 'none'
	// Define if the table allows sorting
	allowsSorting?: boolean

	selectedKeys?: any
	onSelectionChange?: (arr: any) => void
	isCompact?: boolean
}
