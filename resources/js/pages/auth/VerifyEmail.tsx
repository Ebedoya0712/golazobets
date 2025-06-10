import { t } from '@/i18n'
import { AuthLayout1, AuthLayout2, AuthLayout3 } from '@/layouts/auth'
import { Link, useForm } from '@inertiajs/react'
import { Button } from '@nextui-org/react'
import { FormEventHandler } from 'react'
import { StatusMessage } from './components'

interface Props {
	status: string
	layout: string
}

const pageTitle = 'Email Verification'

const Page = ({ status, layout }: Props) => {
	const { post, processing } = useForm({})

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post(route('verification.send'), {
			preserveScroll: true,
		})
	}

	return (
		<>
			<div className="w-72 space-y-7">
				<div className="space-y-3">
					<p className="text-sm">{t('email-verification-message-0')}</p>
					<p className="text-sm">{t('email-verification-message-1')}</p>
					<p className="text-sm">{t('email-verification-message-2')}</p>
				</div>

				{status && <StatusMessage {...{ status }} />}

				<form onSubmit={submit}>
					<Button
						type="submit"
						color="primary"
						fullWidth
						isLoading={processing}
					>
						{t('Resend Verification Email')}
					</Button>
				</form>
			</div>

			<div className="pt-6 flex justify-center">
				<Link
					href={route('logout')}
					className="text-primary font-semibold underline"
				>
					Cerrar sesión
				</Link>
			</div>
		</>
	)
}

Page.layout = (page: JSX.Element) => {
	switch (page.props.layout) {
		case 'layout1':
			return (
				<AuthLayout1
					{...{ children: page, pageTitle: t(pageTitle).toString() }}
				/>
			)
		case 'layout2':
			return (
				<AuthLayout2
					{...{ children: page, pageTitle: t(pageTitle).toString() }}
				/>
			)
		case 'layout3':
			return (
				<AuthLayout3
					{...{ children: page, pageTitle: t(pageTitle).toString() }}
				/>
			)
		default:
			return (
				<AuthLayout1
					{...{ children: page, pageTitle: t(pageTitle).toString() }}
				/>
			)
	}
}

export default Page
