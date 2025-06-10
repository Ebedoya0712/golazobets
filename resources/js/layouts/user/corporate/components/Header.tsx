import { MainNavbar, ProfileDropdown } from '@/components'
import { templates, theme } from '@/config'
import { useColorMode } from '@/hooks'
import { useMainStore } from '@/store'
import { Button, cn, Link, Navbar } from '@nextui-org/react'

const { corporate: template } = templates

export const Header = () => {
	const { sidebarOpen, setSidebarOpen } = useMainStore()
	const { colorMode } = useColorMode()

	return (
		<Navbar
			isBordered
			maxWidth="full"
			height="56px"
			classNames={{
				base: 'bg-primary',
			}}
		>
			<div className="flex-1">
				<div className={cn('flex justify-between items-center')}>
					<div className="flex gap-10">
						<Link href={route('homePage')}>
							<img src={theme[colorMode].logo} alt="Logo" className="w-32" />
						</Link>
						<MainNavbar />
					</div>

					<div className="flex items-center gap-x-3 h-full">
						<ProfileDropdown />

						<Button
							isIconOnly
							size="sm"
							radius="lg"
							variant="light"
							className="text-white md:hidden"
							onPress={() => setSidebarOpen(!sidebarOpen)}
						>
							<i
								className={cn(
									'ri-2x',
									sidebarOpen ? 'ri-close-large-line' : 'ri-menu-line'
								)}
							/>
						</Button>
					</div>
				</div>
			</div>
		</Navbar>
	)
}
