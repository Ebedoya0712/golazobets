import { Layout } from '@/layouts/user/Layout'
import { t } from '@/i18n'
import { PageHeader, PageContent } from '@/components'

const pageTitle = 'Dashboard'

type Props = {
	total_accounts: number
	total_users: number
	total_admins: number
}

const Page = ({ total_accounts, total_users, total_admins }: Props) => {
	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent>
				<div className="space-y-4">
					<p>Total de cuentas creadas {total_accounts}</p>
					<p>Total usuarios {total_users}</p>
					<p>Total administradores {total_admins}</p>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
