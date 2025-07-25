import { cn } from '@nextui-org/react'

export const template = {
	/**
	 *
	 *
	 * Sidebar settings
	 * ........................................................................
	 */
	sidebar: {
		width: '230px',
		collapsedWidth: '0px',

		breakpoint: 1024,

		item: {
			hover: {
				backgroundColor: '#374151',
				color: 'white',
			},
		},

		cn: {
			base: cn('bg-gray-200 !border-divider', '[&>div]:bg-transparent'),
			menuTitle: 'text-foreground-600',
			menuItem: cn(
				'font-medium select-none',
				'has-[.ps-menu-button]:text-sm',
				'[&>*]:transition-colors',

				'[&>*>li>.ps-menu-button]:h-9',
				'[&>ul>li>.ps-submenu-content>ul>li>.ps-menu-button]:h-9',

				// Default color
				'text-foreground-800',

				// Active item color:
				'[&>ul>li>.ps-active]:text-black',
				'[&>ul>li>.ps-submenu-content>ul>.ps-active]:text-black',

				// Hover colors
				'[&>*>li>.ps-menu-button:hover]:bg-content3',
				'[&>ul>li>.ps-submenu-content>ul>li>.ps-menu-button:hover]:bg-content3'
			),
			menuIcon: 'text-base',
			subMenu: 'bg-content2',
			topSpacer: 'h-4',
		},
	},

	/**
	 *
	 *
	 * Application topbar
	 * ........................................................................
	 */
	topbar: {},
}
