import { GuestLayout } from '@/layouts'
import { t } from '@/i18n'
import { Content } from '@/components/staticPage'

const pageTitle = 'Cookies'

const Page = () => {
	return <Content>{pageTitle}</Content>
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
