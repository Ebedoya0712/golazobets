export type NotificationTemplate = {
	id: number
	title: string
	content: string
	type: string
}

export type NotificationTemplateTable = {
	current_page: number
	data: NotificationTemplate[]
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

export type EmailTemplate = {
	id: number
	name: string
	subject: string
	body: string
	type: string
	shortcodes: { [key: string]: string }[] | string[]
}

export type EmailTemplateTable = {
	current_page: number
	data: EmailTemplate[]
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

export type EmailTemplateContextProps = {
	state: State
	dispatch: Dispatch<any>
	isOpen: boolean
	onOpen: () => void
	onOpenChange: () => void
}
