import { templates } from '@/config'
import { useWindowWidth } from '@/hooks'
import { t } from '@/i18n'
import { useMainStore } from '@/store'
import { Link, usePage } from '@inertiajs/react'
import { cn } from '@nextui-org/react'
import { motion } from 'framer-motion'
import {
	Menu,
	MenuItem,
	Sidebar as SidebarNav,
	SubMenu,
} from 'react-pro-sidebar'
import { Fragment } from 'react/jsx-runtime'

import { PageProps } from '@/types'

const { corporate: template } = templates

export const Sidebar = () => {
	const { sidebarOpen, setSidebarOpen } = useMainStore()
	const { windowWidth } = useWindowWidth()
	const { dashboardNavbar } = usePage<PageProps>().props

	return (
		<>
			<div className="left-0 inset-y-0 mt-px fixed overflow-hidden z-30">
				<SidebarNav
					transitionDuration={400}
					id="navbar"
					width={template.sidebar.width}
					collapsedWidth={template.sidebar.collapsedWidth}
					collapsed={windowWidth <= template.sidebar.breakpoint && !sidebarOpen}
					rootStyles={{ height: '100%' }}
					className={cn(
						template.sidebar.cn.base,
						'[&.ps-collapsed_.ps-submenu-content]:!hidden'
					)}
					style={{ paddingTop: '56px' }}
				>
					{/* Top spacer */}
					<div className={template.sidebar.cn.topSpacer}></div>

					{dashboardNavbar &&
						dashboardNavbar.map((nav) => (
							<Fragment key={nav.key}>
								{nav.title && nav.menu.length > 0 && (
									<div
										className={cn(
											'text-xs font-medium px-7 mb-1 mt-2 whitespace-nowrap',
											template.sidebar.cn.menuTitle
										)}
									>
										{nav.title}
									</div>
								)}

								<Menu closeOnClick className={template.sidebar.cn.menuItem}>
									{nav.menu.map(({ label, route: path, icon, submenu }) => {
										if (submenu) {
											return (
												<SubMenu
													key={label + path}
													label={t(label)}
													icon={
														<i
															className={cn(icon, template.sidebar.cn.menuIcon)}
														/>
													}
													className="[&>a>.ps-submenu-expand-icon>span]:relative [&>a>.ps-submenu-expand-icon>span]:top-[-2px]"
												>
													{submenu.map(({ label, route: path }) => (
														<Fragment key={path}>
															<MenuItem
																component={<Link href={route(path || '')} />}
																active={location.href === route(path || '')}
																className={template.sidebar.cn.subMenu}
															>
																{t(label)}
															</MenuItem>
														</Fragment>
													))}
												</SubMenu>
											)
										}

										return (
											<Fragment key={path}>
												<MenuItem
													component={<Link href={route(path || '')} />}
													icon={
														<i
															className={cn(icon, template.sidebar.cn.menuIcon)}
														/>
													}
													active={location.href === route(path || '')}
												>
													{t(label)}
												</MenuItem>
											</Fragment>
										)
									})}
								</Menu>
							</Fragment>
						))}
				</SidebarNav>

				{sidebarOpen && windowWidth <= template.sidebar.breakpoint && (
					<motion.div
						className="bg-black/10 inset-0 fixed"
						animate={{ opacity: sidebarOpen ? 1 : 0 }}
						onClick={() => setSidebarOpen(false)}
					/>
				)}
			</div>

			<div
				className="hidden flex-[0_0_auto] lg:block"
				style={{ width: template.sidebar.width }}
			/>
		</>
	)
}
