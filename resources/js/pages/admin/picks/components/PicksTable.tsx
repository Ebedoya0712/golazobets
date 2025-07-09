	import { TableContent } from '@/components'
	import { t } from '@/i18n'
	import { PickPreview, PickStatusBadge } from '@/pages/picks/components'
	import { Link, router, usePage } from '@inertiajs/react'
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
	import utc from 'dayjs/plugin/utc'
	import { useState } from 'react'
	import { FormCorrectPick } from './FormCorrectPick'
	import { TableFilters } from './TableFilters'

	dayjs.extend(utc)

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
						reloadOnly: ['picks'],
						data: data,
						links,
						current_page,
						columns,
						removeWrapper: true,
						topContent: <TableFilters />,
						cell: (item: any, key: any) => {
							switch (key) {
								case 'id':
									return item.id

								case 'publishing_date':
									return (
										<p className="flex flex-col">
											<span className="text-sm">
												{dayjs(item.event_date).format('DD/MM/YYYY')}
											</span>
											<span className="text-xs">
												{dayjs.utc(item.event_date).format('H:mm')}
											</span>
										</p>
									)

								case 'status':
									return item.status ? (
										<PickStatusBadge status={item.status} />
									) : (
										''
									)

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
											{item.profit || '0,00uds'}
										</span>
									)
								case 'tipster':
									return (
										<Link
											className="truncate block font-semibold"
											href={route('admin.tipsters.edit', {
												tipster: item.tipster,
											})}
										>
											{item.tipster.user.username}
										</Link>
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
																case 'edit':
																	;(() => {
																		router.visit(
																			route('admin.picks.edit', { pick: item })
																		)
																	})()
																	break
															}
														}}
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
																<i className="ri-list-check-3 ri-lg" />
															}
														>
															{t('Corregir')}
														</DropdownItem>

														<DropdownItem
															key="edit"
															startContent={
																<i className="ri-edit-2-line ri-lg" />
															}
														>
															{t('Editar')}
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
		{ key: 'id', label: '#', width: 40 },
		{ key: 'tipster', label: 'Tipster' },
		{ key: 'publishing_date', label: 'Publicación' },
		{ key: 'status', label: 'Estado', width: 100 },
		{ key: 'event', label: 'Evento', classname: 'w-[20%]' },
		{ key: 'pick', label: 'Pronóstico', classname: 'w-[20%]' },
		{ key: 'actions', label: '' },
	] as {
		id: string
		key: string
		label: string
		width?: number
		classname: string
	}[]
