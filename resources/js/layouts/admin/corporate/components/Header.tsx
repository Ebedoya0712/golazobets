import { ProfileDropdown, TopbarLanguage } from '@/components'
import { templates, theme } from '@/config'
import { useColorMode } from '@/hooks'
import { useMainStore } from '@/store'
import { Button, cn, Divider, Navbar } from '@nextui-org/react'

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
				base: 'bg-primary border-primary-600',
			}}
		>
			<div className="flex-1">
				<div className={cn('flex justify-between items-center')}>
					<div>
						<img src={theme[colorMode].logo} alt="Logo" className="w-36" />
					</div>

					<div className="flex items-center gap-x-3 h-full">
						{/* <TopbarNotifications />

						<Divider orientation="vertical" className="h-5" /> */}

						<TopbarLanguage />

						<Divider orientation="vertical" className="h-5" />

						<ProfileDropdown />

						<Button
							isIconOnly
							size="sm"
							radius="lg"
							variant="light"
							className="md:hidden"
							onPress={() => setSidebarOpen(!sidebarOpen)}
						>
							<i
								className={cn(
									'text-white ri-2x',
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
