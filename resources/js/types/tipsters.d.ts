import { User } from '.'

export type Tipster = {
	id: number
	cover_image?: string
	user_id: number
	type: 'free' | 'premium'
	sport_id?: number
	stripe_subscription_price_id?: string
	user: User
	sport: {
		name: string
		color: string
		id: number
	}
	picks_count: number
	tipster_stats: {
		profit: number
		yield: number
		total_bet: number
		average_stake: number
		win_rate: number
	}
}

export interface PageData {
	linkToOtherTypeOfTipsters: {
		label: string
		link: string
	}
	title: string
}

export type FilterProps = {
	username: string
	order_by: 'profit' | 'picks' | 'yield' | null
	sport_id: number | null
	profit: number
	picks: number
	yield: number
}
