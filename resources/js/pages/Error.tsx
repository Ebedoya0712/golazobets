import { useColorMode } from '@/hooks'
import { t } from '@/i18n'
import { Button } from '@nextui-org/react'
import { Link, Head } from '@inertiajs/react'

interface Props {
	status: number
}

type Messages =
	| {
			[key: number]: {
				pageTitle: string
				description: string
			}
	  }
	| any

const Page = ({ status }: Props) => {
	const { colorMode } = useColorMode()

	const messages: Messages = {
		403: {
			pageTitle: t('403 page title'),
			description: t('403 page description'),
		},
		404: {
			pageTitle: t('404 page title'),
			description: t('404 page description'),
		},
		500: {
			pageTitle: t('500 page title'),
			description: t('500 page description'),
		},
		503: {
			pageTitle: t('503 page title'),
			description: t('503 page description'),
		},
	}[status]

	return (
		<>
			<Head title={`${t(messages?.pageTitle ?? '')}`} />

			<div className="bg-gray-100 w-screen h-screen dark:bg-gray-900">
				<div className="grid place-content-center w-full h-full p-10">
					<div className="flex flex-col gap-3 text-center max-w-2xl select-none">
						<div className="text-6xl">{status}</div>

						<div className="text-2xl tracking-tight">
							{t(messages?.description)}
						</div>

						<div className="tracking-tight">
							{t('This page you are looking for does not exsist', {
								link: (
									<Link
										key="report-link"
										href={route('homePage')}
										className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
									>
										{t('Report this?')}
									</Link>
								),
							})}
						</div>

						<div className="pt-6 flex justify-center gap-x-5">
							<Button
								size="sm"
								color="primary"
								variant="light"
								startContent={<i className="ri-arrow-left-line" />}
								onPress={() => window.history.back()}
							>
								{t('Back previous page')}
							</Button>

							<Button
								size="sm"
								as={Link}
								color="primary"
								variant="flat"
								href={route('homePage')}
							>
								{t('Go home')}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
