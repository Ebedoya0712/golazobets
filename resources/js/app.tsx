import 'react-toastify/dist/ReactToastify.css'
import 'remixicon/fonts/remixicon.css'
import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { NextUIProvider } from '@nextui-org/react'
import { semanticColors } from '@nextui-org/theme'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot, hydrateRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'
window.locale = import.meta.env.VITE_APP_LOCALE || 'en'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale(window.locale)

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) =>
		resolvePageComponent(
			`./pages/${name}.tsx`,
			import.meta.glob('./pages/**/*.tsx')
		),
	setup({ el, App, props }) {
		if (import.meta.env.DEV) {
			createRoot(el).render(
				<NextUIProvider>
					<App {...props} />
				</NextUIProvider>
			)
			return
		}

		hydrateRoot(el, 
			<NextUIProvider>
				<App {...props} />
			</NextUIProvider>
		)
	},
	progress: {
		delay: 0,
		color: semanticColors.dark.primary[500],
		includeCSS: true,
		showSpinner: true,
	},
}).then(() => {
	document.getElementById('app')?.removeAttribute('data-page')
})
