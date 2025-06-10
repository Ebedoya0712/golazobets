import { t } from '@/i18n'
import { AuthLayout1, AuthLayout2, AuthLayout3 } from '@/layouts/auth'
import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState, type FormEventHandler } from 'react'

const pageTitle = 'Confirm password'

interface Props {
	layout: string
}

const Page = ({ layout }: Props) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		password: '',
	})

	const [pwdVisibility, setPwdVisibility] = useState<boolean>(false)

	useEffect(() => {
		return () => {
			reset('password')
		}
	}, [])

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post(route('password.confirm'))
	}

	return (
		<>
			<div className="w-72 space-y-7">
				<div className="text-sm leading-tight">
					{t('Please confirm your password before continuing.')}
				</div>

				<form onSubmit={submit}>
					<div className="space-y-4">
						<fieldset className="space-y-1">
							<Input
								id="password"
								type={pwdVisibility ? 'text' : 'password'}
								name="password"
								label={t('Password')}
								value={data.password}
								isDisabled={processing}
								errorMessage={errors.password}
								isInvalid={errors.password ? true : false}
								onValueChange={(e) => setData('password', e)}
								autoComplete="off"
								endContent={
									<button
										type="button"
										onClick={() => setPwdVisibility(!pwdVisibility)}
									>
										{pwdVisibility ? (
											<i className="ri-eye-fill ri-lg text-primary" />
										) : (
											<i className="ri-eye-off-fill ri-lg text-zinc-400 dark:text-zinc-600" />
										)}
									</button>
								}
							/>
						</fieldset>

						<Button
							color="primary"
							fullWidth
							type="submit"
							spinner={<i className="ri-loader-line ri-lg animate-spin"></i>}
							isLoading={processing}
						>
							{t('Confirm')}
						</Button>
					</div>
				</form>
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
