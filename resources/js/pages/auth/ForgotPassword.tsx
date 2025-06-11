import { useRef, useEffect, FormEventHandler } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { t } from '@/i18n'
import { Input, Button } from '@nextui-org/react'
import { AuthLayout1, AuthLayout2, AuthLayout3 } from '@/layouts/auth'
import { StatusMessage } from './components'

interface Props {
	status: string
	layout: string
}

const pageTitle = 'Forgot your password?'

const mensajesStatus = {
  "We have emailed your password reset link.": "Te hemos enviado un enlace para restablecer tu contraseña.",
  // más traducciones si quieres
}

const mensajesErrores = {
  "The email field is required.": "El campo email es obligatorio.",
  "The email must be a valid email address.": "El email debe ser una dirección válida.",
  // agrega aquí más errores que quieras traducir
}

const Page = ({ status, layout }: Props) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: '',
	})

	const inputEmail = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputEmail.current?.focus()
	}, [])

	const submit: FormEventHandler = (e) => {
		e.preventDefault()

		post(route('password.email'), {
			onSuccess: () => reset(),
		})
	}

  // Función para traducir mensajes de error si existen
  const traducirError = (errorMsg: string) => {
    return mensajesErrores[errorMsg] ?? errorMsg
  }

	return (
		<>
			<div className="w-72 space-y-7">
				<div className="text-sm leading-tight">
					{t('forgot-password-message')}
				</div>

				{status && <StatusMessage status={mensajesStatus[status] ?? status} />}

				<form onSubmit={submit}>
					<div className="space-y-4">
						<fieldset className="space-y-1">
							<Input
								id="email"
								type="email"
								name="email"
								label="Email"
								value={data.email}
								isDisabled={processing}
								ref={inputEmail}
								isInvalid={errors.email ? true : false}
								errorMessage={errors.email ? traducirError(errors.email) : undefined}
								onValueChange={(e) => setData('email', e)}
								autoComplete="off"
							/>
						</fieldset>

						<Button
							color="primary"
							fullWidth
							type="submit"
							spinner={<i className="ri-loader-line ri-lg animate-spin"></i>}
							isLoading={processing}
						>
							{t('Email password reset link')}
						</Button>
					</div>
				</form>

				<div className="space-y-3">
					<div>
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

					<div>
						<Button
							as={Link}
							disableRipple
							color="primary"
							variant="light"
							className="p-0 h-auto hover:!bg-transparent"
							href={route('register')}
						>
							{t("Don't have an Account?")}
						</Button>
					</div>
				</div>
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
