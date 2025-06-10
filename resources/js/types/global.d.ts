import { AxiosInstance } from 'axios'
import { route as ziggyRoute } from 'ziggy-js'

declare global {
	interface Window {
		axios: AxiosInstance
		locale: string
	}

	var route: typeof ziggyRoute
}
