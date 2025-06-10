import { Content } from '@/components/staticPage'
import { t } from '@/i18n'
import { GuestLayout } from '@/layouts'

const pageTitle = 'Condiciones generales'

const Page = () => {
	return <Content>{pageTitle}</Content>
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
