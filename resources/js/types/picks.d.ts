import { Bookie } from './bookies.d'
import { Sport } from './sports.d'
import { Tipster } from './tipsters.d'

export interface Pick {
	id: number
	tipster_id: number | null
	sport_id: number | null
	bookie_id: number | null
	bet_type: 'pre_match' | 'live' | 'long_term'
	sub_type: 'simple' | 'combined'
	competition: string
	event: string
	pick: string
	stake: number | null
	odds: number | string | null
	event_date: string | null
	analysis: string
	screenshot_path: string | null
	screenshot: any | null
	status: 'pending' | 'won' | 'lost' | 'void' | 'cancelled'
	result: number | null
	profit: string | null
	tipster_name: string
	tipster: Tipster
	sport: Sport
	bookie: Bookie
	screenshot_path: string
	blocked?: boolean
}

export interface PickPreview extends Pick {
	tipster_name: string
	profile_picture?: string
}
