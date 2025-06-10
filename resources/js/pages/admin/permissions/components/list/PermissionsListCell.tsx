import { type Dispatch } from 'react'
import {
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	cn,
} from '@nextui-org/react'
import { t } from '@/i18n'

import type { Permission } from '@/types/permissions'

interface Props {
	item: Permission
	key: string
	dispatch: Dispatch<any>
	onOpen: () => void
	protected_permissions: string[]
}

export const PermissionsListCell = ({
	item,
	key,
	dispatch,
	onOpen,
	protected_permissions,
}: Props) => {
	const role = item.roles.find((e) => e.name === key)

	switch (key) {
		case 'name':
			return (
				<>
					<span
						className={cn(
							'font-medium',
							protected_permissions.includes(item.name) && 'opacity-50'
						)}
					>
						{item.name}
					</span>
					{protected_permissions.includes(item.name) && (
						<small className="text-xs text-danger pl-1">{t('Protected')}</small>
					)}
				</>
			)
		case 'actions':
			return !protected_permissions.includes(item.name) ? (
				<div className="flex justify-end">
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Button isIconOnly size="sm" radius="lg" variant="light">
								<i className="ri-more-2-line ri-xl" />
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Static Actions"
							onAction={(key) => {
								switch (key) {
									case 'edit': {
										dispatch({ type: 'setSelectedPermission', payload: item })
										dispatch({ type: 'openDrawer' })
										break
									}
									case 'delete': {
										dispatch({ type: 'setSelectedPermission', payload: item })
										onOpen()
										break
									}
								}
							}}
						>
							<DropdownItem key="edit">{t('Edit')}</DropdownItem>
							<DropdownItem key="delete" className="text-danger" color="danger">
								{t('Delete')}
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			) : (
				<div className="h-7" />
			)

		default:
			if (role) {
				return <i className="ri-check-line ri-lg text-primary" />
			} else {
				return <i className="ri-subtract-line ri-lg text-foreground-400" />
			}
	}
}
