const setCookie = (name: string, value: string, days: number = 365): void => {
	console.log('setCookie')
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	const expires = `expires=${date.toUTCString()}`
	document.cookie = `${name}=${value};${expires};path=/`
}

const getCookie = (name: string): string | null => {
	const cookieName = `${name}=`
	const cookies = document.cookie.split(';')

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i].trim()
		if (cookie.indexOf(cookieName) === 0) {
			return cookie.substring(cookieName.length, cookie.length)
		}
	}
	return null
}

export const useCookies = () => {
	return { setCookie, getCookie }
}
