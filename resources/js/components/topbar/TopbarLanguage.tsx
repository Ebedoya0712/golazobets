import { useEffect, useState } from 'react'
import { usePage, Link } from '@inertiajs/react'
import type { PageProps } from '@/types'

export const TopbarLanguage = () => {
	const { props } = usePage<PageProps>()
	const {
		auth: { user },
	} = props

	const [language, setLanguage] = useState(user?.account?.language ?? 'en')

	useEffect(() => {
		setLanguage(user?.account?.language ?? 'en')
	}, [props])

	return (
		<Link href={route('account.edit')}>
			<img
				src={`/img/flags/${language}.svg`}
				alt={language}
				className="w-5 h-5"
			/>
		</Link>
	)
}
