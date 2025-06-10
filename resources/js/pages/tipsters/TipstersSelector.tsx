import { PageContent, PageHeader } from '@/components'
import { t } from '@/i18n'
import { GuestLayout } from '@/layouts'
import { Link } from '@inertiajs/react'

const pageTitle = 'Tipsters'

const pClassName =
	'bg-gradient-to-t from-black text-white text-xl font-bold text-center uppercase w-full p-6 pt-40'

const Page = () => {
	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent classNames={{ content: 'justify-center' }}>
				<div className="w-full max-w-4xl flex flex-col items-center justify-center gap-4 select-none md:flex-row">
					<Link
						href={route('tipsters.free')}
						className="bg-[url('/img/tipsters-free.jpg')] bg-cover bg-no-repeat bg-center w-[300px] h-[450px] flex items-end transition-all duration-400 hover:shadow-black/30 hover:shadow-xl"
					>
						<p className={pClassName}>{t('Tipsters free')}</p>
					</Link>

					<Link
						href={route('tipsters.premium')}
						className="bg-[url('/img/tipsters-premium.jpg')] bg-cover bg-no-repeat bg-center w-[300px] h-[450px] flex items-end transition-all duration-400 hover:shadow-black/30 hover:shadow-xl"
					>
						<p className={pClassName}>{t('Tipsters premium')}</p>
					</Link>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
