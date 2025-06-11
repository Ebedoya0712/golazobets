import { useEffect, useState, FormEventHandler } from 'react'
import { t } from '@/i18n'
import { Link, useForm } from '@inertiajs/react'
import { Input, Select, SelectItem, Checkbox, Button } from '@nextui-org/react'
import { AuthLayout1, AuthLayout2, AuthLayout3 } from '@/layouts/auth'
import { FormLoading } from '@/components/form'

const pageTitle = 'Register'

interface Props {
	layout: string
	sports: {
		key: string
		label: string
	}[]
}

const Page = ({ layout, sports }: Props) => {
	const [loading, setLoading] = useState(false)

	const { data, setData, post, processing, errors, reset } = useForm({
		username: '',
		email: '',
		password: '',
		password_confirmation: '',
		sport_id: null as number | null,
		communications_consent: true,
		policy_acceptance: false,
		user_type: 'tipster', // valor por defecto
	})

	const [pwdVisibility, setPwdVisibility] = useState<boolean>(false)

	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation')
		}
	}, [])

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post(route('register'), {
			onStart: () => setLoading(true),
			onFinish: () => setLoading(false),
		})
	}

	return (
		<>
			<div className="w-96 space-y-7">
				<form onSubmit={submit}>
					<div className="space-y-4">
						<fieldset className="space-y-1">
							<Input
								id="username"
								name="username"
								type="text"
								label={t('Username')}
								value={data.username}
								isDisabled={processing}
								isInvalid={errors.username ? true : false}
								errorMessage={errors.username && String(t(errors.username))}
								onValueChange={(e) => setData('username', e)}
								autoComplete="off"
							/>
						</fieldset>

						<fieldset className="space-y-1">
							<Input
								id="email"
								name="email"
								type="email"
								label="Email"
								value={data.email}
								isDisabled={processing}
								isInvalid={errors.email ? true : false}
								errorMessage={errors.email && String(t(errors.email))}
								onValueChange={(e) => setData('email', e)}
								autoComplete="off"
							/>
						</fieldset>

						<fieldset className="space-y-1">
							<Input
								id="password"
								type={pwdVisibility ? 'text' : 'password'}
								name="password"
								label={t('Password')}
								value={data.password}
								isDisabled={processing}
								isInvalid={errors.password ? true : false}
								errorMessage={errors.password && String(t(errors.password))}
								onValueChange={(e) => setData('password', e)}
								autoComplete="off"
								endContent={
									<button
										type="button"
										tabIndex={-1}
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

						<fieldset className="space-y-1">
							<Input
								id="password_confirmation"
								name="password_confirmation"
								type={pwdVisibility ? 'text' : 'password'}
								label={t('Confirm password')}
								value={data.password_confirmation}
								isDisabled={processing}
								errorMessage={
									errors.password_confirmation &&
									String(t(errors.password_confirmation))
								}
								isInvalid={errors.password_confirmation ? true : false}
								onValueChange={(e) => setData('password_confirmation', e)}
								autoComplete="off"
								endContent={
									<button
										type="button"
										tabIndex={-1}
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

						{data.user_type === 'tipster' && (
							<fieldset className="space-y-1">
								<Select
									items={sports.map((sport) => ({
										key: sport.key,
										label: sport.label,
									}))}
									isDisabled={processing}
									label={t('Elige tu deporte principal')}
									onSelectionChange={(keys) => {
										if (keys.anchorKey) {
											setData('sport_id', Number(keys.anchorKey))
										}
									}}
									autoComplete="off"
									isInvalid={errors.sport_id ? true : false}
									errorMessage={errors.sport_id && String(t(errors.sport_id))}
									disallowEmptySelection
								>
									{sports.map((sport) => (
										<SelectItem key={sport.key}>{sport.label}</SelectItem>
									))}
								</Select>
							</fieldset>
						)}

						<fieldset className="space-y-3">
							<Checkbox
								size="sm"
								isSelected={data.communications_consent}
								onValueChange={(val) =>
									setData('communications_consent', val)
								}
							>
								{t('Acepto recibir ofertas y comunicaciones comerciales.')}
							</Checkbox>

							<Checkbox
								size="sm"
								isSelected={data.policy_acceptance}
								className="items-start [&>span+span+span]:relative [&>span+span+span]:-top-0.5"
								onValueChange={(val) => setData('policy_acceptance', val)}
							>
								Acepto las{' '}
								<a
									href="/"
									className="text-primary hover:underline"
									target="_blank"
								>
									condiciones de uso
								</a>
								,{' '}
								<a
									href="/"
									className="text-primary hover:underline"
									target="_blank"
								>
									política de privacidad
								</a>{' '}
								y{' '}
								<a
									href="/"
									className="text-primary hover:underline"
									target="_blank"
								>
									normas generales
								</a>
								.
							</Checkbox>
						</fieldset>

						<Button
							color="primary"
							fullWidth
							type="submit"
							spinner={<i className="ri-loader-line ri-lg animate-spin"></i>}
							isLoading={processing}
							isDisabled={!data.policy_acceptance}
						>
							{t('Register me')}
						</Button>

						<div className="text-center">
							<Button
								as={Link}
								disableRipple
								color="primary"
								variant="light"
								className="p-0 h-auto hover:!bg-transparent"
								href={route('login')}
							>
								{t('Already registered?')}
							</Button>
						</div>
					</div>
				</form>

				<div className="h-20" />
			</div>

			{loading && <FormLoading />}
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
