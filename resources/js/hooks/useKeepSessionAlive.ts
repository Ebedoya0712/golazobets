import { useEffect } from 'react'
import axios from 'axios'

export const useKeepSessionAlive = () => {
	useEffect(() => {
		const interval = setInterval(() => {
			axios.get(route('keepAlive'))
		}, parseInt(import.meta.env.VITE_PING_SESSION_LIFETIME ?? '10') * 60 * 1000) // Each 5 minutes

		return () => clearInterval(interval)
	}, [])
}
