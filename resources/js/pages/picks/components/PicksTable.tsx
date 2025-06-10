import { t } from '@/i18n'
import { useState } from 'react'

import { TableContent } from '@/components'
import { usePage } from '@inertiajs/react'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
} from '@nextui-org/react'
import dayjs from 'dayjs'
import { FormCorrectPick } from './FormCorrectPick'
import { PickPreview } from './PickPreview'
import { PickStatusBadge } from './PickStatusBadge'

import type { PageProps } from '@/types'
import type { Pick } from '@/types/picks'

export const PicksTable = () => {
	const { props } = usePage<PageProps>()
	const { picks, auth } = props
	const { data, links, current_page } = picks

	const {
		isOpen: previewIsOpen,
		onOpen: previewOnOpen,
		onOpenChange: previewOnOpenChange,
	} = useDisclosure()
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const { user } = auth
	const [selectedPick, setSelectedPick] = useState<Pick | null>(null)

	return (
		<>
			<TableContent
				{...{
					data,
					links,
					current_page,
					reloadOnly: ['picks'],
					columns,
					rounded: 'none',
					emptyContent: t('Aún no tienes picks.'),
					cell: (item: any, key: any) => {
						switch (key) {
							case 'id':
								return <span className="text-gray-400">{item.id}</span>

							case 'publishing_date':
								return (
									<p className="flex flex-col">
										<span className="text-sm">
											{dayjs(item.event_date).format('DD/MM/YYYY')}
										</span>
									</p>
								)

							case 'status':
								return <PickStatusBadge status={item.status} />

							case 'event':
								return (
									<p className="flex flex-col">
										<span className="truncate block">{item.event}</span>
										<span className="text-xs">{item.competiton}</span>
									</p>
								)

							case 'pick':
								return <span className="truncate block">{item.pick}</span>

							case 'stake':
								return <span className="truncate block">{item.stake}</span>

							case 'odds':
								return <span className="truncate block">{item.odds}</span>

							case 'profit':
								return (
									<span className="truncate block">
										{item.profit || '0,00'} usd
									</span>
								)

							case 'actions':
								return (
									<>
										<div className="flex justify-end">
											<Dropdown placement="bottom-end">
												<DropdownTrigger>
													<Button
														isIconOnly
														size="sm"
														radius="lg"
														variant="light"
													>
														<i className="ri-more-2-line ri-xl" />
													</Button>
												</DropdownTrigger>

												<DropdownMenu
													aria-label="Static Actions"
													onAction={(key) => {
														switch (key) {
															case 'see':
																;(() => {
																	setSelectedPick(item)
																	previewOnOpen()
																})()
																break
															case 'correct':
																;(() => {
																	setSelectedPick(item)
																	onOpen()
																})()
																break
														}
													}}
													disabledKeys={
														'pending' !== item.status ? ['correct'] : []
													}
												>
													<DropdownItem
														key="see"
														startContent={<i className="ri-eye-line ri-lg" />}
													>
														{t('Ver')}
													</DropdownItem>

													<DropdownItem
														key="correct"
														startContent={
															'pending' === item.status && (
																<i className="ri-list-check-3 ri-lg" />
															)
														}
														className={
															'pending' !== item.status ? 'hidden h-0' : ''
														}
													>
														{'pending' === item.status && t('Corregir')}
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</div>
									</>
								)

							default:
								return null
						}
					},
					classNames: {
						th: '!rounded-none',
						tr: 'data-[middle]:border-t data-[last]:border-t border-divider',
					},
				}}
			/>

			<FormCorrectPick
				{...{ isOpen, onOpenChange, selectedPick, setSelectedPick }}
			/>

			<Modal
				isOpen={previewIsOpen}
				onOpenChange={previewOnOpenChange}
				radius="none"
				size="lg"
			>
				<ModalContent>
					{(onClose) => {
						return (
							<>
								<ModalBody className="p-0">
									{selectedPick && (
										<PickPreview
											{...{
												data: {
													...selectedPick,
													tipster_name: user ? user.username : '',
													profile_picture: user ? user.profile_picture : '',
												},
											}}
										/>
									)}
								</ModalBody>
							</>
						)
					}}
				</ModalContent>
			</Modal>
		</>
	)
}

const columns = [
	{ key: 'publishing_date', label: 'Publicación' },
	{ key: 'status', label: 'Estado' },
	{ key: 'event', label: 'Evento' },
	{ key: 'pick', label: 'Pronóstico' },
	{ key: 'stake', label: 'Stake' },
	{ key: 'odds', label: 'Cuota' },
	{ key: 'profit', label: 'Beneficio' },
	{ key: 'actions', label: '' },
] as {
	id: string
	key: string
	label: string
	// allowsSorting?: boolean
	width?: number
	classname: string
}[]
