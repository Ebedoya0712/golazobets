export const useColorMode = () => {
	// const { props } = usePage<PageProps>()
	// const { auth, colorMode: defaultColorMode } = props

	// Default color mode if auth is not available
	// const finalColorMode = auth?.user?.account?.colorMode ?? defaultColorMode
	const finalColorMode = 'light'

	// useEffect(() => {
	// 	finalColorMode === 'dark'
	// 		? document.querySelector('html')?.classList.add('dark')
	// 		: document.querySelector('html')?.classList.remove('dark')
	// }, [finalColorMode])

	return { colorMode: finalColorMode }
}
