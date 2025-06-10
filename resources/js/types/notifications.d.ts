import type { Dispatch } from 'react'

export type NotificationContextProps = {
	state: State
	dispatch: Dispatch<any>
	isOpen?: boolean
	onOpen?: () => void
	onOpenChange?: () => void
}

export type Notification = {
	id: string
	data?: {
		title: string
		content: string
	}
	used_dates?: string[]
	created_at?: string
	updated_at?: string
}

export type NotificationsTable = {
	current_page: number
	data: Notification[]
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	next_page_url: string
	path: string
	per_page: number
	prev_page_url: string
	to: number
	total: number
	links: {
		url: string
		label: string
		active: boolean
	}[]
}

export type NotificationTemplateContextProps = {
	state: State
	dispatch: Dispatch<any>
	isOpen: boolean
	onOpen: () => void
	onOpenChange: () => void
}
