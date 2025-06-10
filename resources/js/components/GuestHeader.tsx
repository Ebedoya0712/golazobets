import config, { templates, theme } from '@/config'
import { useColorMode } from '@/hooks'
import { t } from '@/i18n'
import { Link, router, usePage } from '@inertiajs/react'
import { Button, Navbar, NavbarMenuToggle, User } from '@nextui-org/react'
import { MainNavbar } from './MainNavbar'

import type { PageProps } from '@/types'
import { useEffect, useState } from 'react'

const { corporate: template } = templates

export const GuestHeader = () => {
	const { colorMode } = useColorMode()
	const { auth } = usePage<PageProps>().props
	const { user } = auth
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			const isLargeScreen = window.innerWidth > 1024
			setIsMenuOpen(isLargeScreen)
		}

		// Set initial state
		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<Navbar
			maxWidth="full"
			className="bg-primary"
			height="auto"
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<div className="flex-1">
				<div className="flex justify-between items-center gap-10">
					<div className="flex items-center gap-x-5 h-14">
						<img
							src={theme[colorMode].logo}
							alt="Logo"
							className="h-5 mt-1 md:h-6 md:mt-0"
						/>

						<NavbarMenuToggle
							aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
							icon={<i className="ri-menu-2-line ri-lg text-white" />}
							className="lg:hidden"
						/>

						<MainNavbar {...{ isMenuOpen }} />
					</div>

					<div className="">
						{user ? (
							<div className="flex justify-center gap-5">
								<Link href={route('account.edit')}>
									<User
										avatarProps={{
											src: user.profile_picture
												? `/storage/img/users/avatars/${user.profile_picture}`
												: config.userBlank,
											className: '!size-8',
										}}
										name={user.username}
										classNames={{
											wrapper: '',
											name: 'text-white font-medium max-w-28 truncate',
										}}
									/>
								</Link>
							</div>
						) : (
							<div className="flex justify-center gap-x-2 md:gap-x-5">
								<Button
									color="secondary"
									variant="light"
									radius="none"
									className="hidden md:flex"
									onPress={() => router.visit(route('login'))}
								>
									{t('Ingresar')}
								</Button>

								<Button
									color="secondary"
									variant="bordered"
									radius="none"
									className="hidden md:flex"
									onPress={() => router.visit(route('register'))}
								>
									{t('Registrarse')}
								</Button>

								<Button
									isIconOnly
									color="secondary"
									variant="light"
									radius="none"
									className="md:hidden"
									onPress={() => router.visit(route('login'))}
								>
									<i className="ri-user-line ri-lg" />
								</Button>

								<Button
									isIconOnly
									color="secondary"
									variant="bordered"
									radius="none"
									className="md:hidden"
									onPress={() => router.visit(route('register'))}
								>
									<i className="ri-git-repository-private-line ri-lg" />
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Navbar>
	)
}
