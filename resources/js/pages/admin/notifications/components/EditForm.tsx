import { useContext } from 'react'
import { Input, Button, Divider, Spinner, Snippet, cn } from '@nextui-org/react'
import { t } from '@/i18n'
import { NotificationContext } from '../providers/NotificationProvider'
import { useActions } from '../hooks/useActions'
import { ErrorMessage, Wysiwyg } from '@/components/form'

import type { NotificationTemplateContextProps } from '@/types/notification-templates.d'

export const EditForm = () => {
	const { state, dispatch } = useContext(
		NotificationContext
	) as NotificationTemplateContextProps

	// if (!state.selectedNotification) return null

	const {
		data,
		errors,
		setData,
		processing,
		clearErrors,
		reset,
		inputName,
		submit,
	} = useActions()

	const { shortcodes } = state.selectedNotification ?? {}

	return (
		<div
			className={cn(
				'bg-background border border-divider border-b-none h-full relative overflow-hidden',
				'w-full flex justify-center items-center'
			)}
		>
			<div className="w-full max-w-2xl h-[90%] overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-track-divider scrollbar-thumb-foreground-200 lg:px-10">
				<div className="">
					<div className="text-lg select-none">
						{state.selectedNotification
							? t('Edit notification')
							: t('New notification')}
					</div>

					<Divider className="my-4" />

					<form onSubmit={submit} className="space-y-5">
						<fieldset className="space-y-1">
							<label htmlFor="" className="text-sm">
								{t('Title')}{' '}
								<i className="ri-circle-fill text-danger text-[6px] relative -top-2" />
							</label>

							<Input
								variant="faded"
								ref={inputName}
								value={data.title}
								isInvalid={errors.title ? true : false}
								errorMessage={errors.title}
								onKeyUp={() => clearErrors('title')}
								isDisabled={processing}
								onValueChange={(val) => setData('title', val)}
							/>
						</fieldset>

						{data.content && (
							<fieldset className="space-y-1">
								<label htmlFor="" className="text-sm">
									{t('Content')}{' '}
									<i className="ri-circle-fill text-danger text-[6px] relative -top-2" />
								</label>

								<div className="flex-1 max-w-xl space-y-14">
									<Wysiwyg
										{...{
											charactersLimit: 500,
											headings: true,
											initialContent: String(data.content),
											onUpdate: (val) => setData('content', val),
										}}
									/>
								</div>

								<ErrorMessage {...{ error: errors.content }} />
							</fieldset>
						)}

						<div className="flex justify-end gap-5">
							<Button
								isDisabled={processing}
								onPress={() => {
									dispatch({ type: 'closeDrawer' })
									dispatch({ type: 'setSelectedNotification', payload: null })
									reset()
								}}
								className="w-32"
							>
								{t('Cancel')}
							</Button>

							<Button
								type="submit"
								color="primary"
								className="w-32"
								isLoading={processing}
							>
								{t('Save')}
							</Button>
						</div>

						{shortcodes && (
							<div>
								<h4 className="text-sm font-semibold">{t('Shortcodes')}</h4>

								<div className="mt-3">
									{Object.keys(shortcodes).map((key: string, idx: number) => (
										<div key={key}>
											{idx > 0 && <Divider className="mt-4 mb-2" />}

											<Snippet
												hideSymbol
												radius="none"
												classNames={{
													base: 'bg-transparent w-full p-0',
												}}
											>
												<strong>{key}</strong>
											</Snippet>

											{shortcodes[key] && (
												<div className="text-xs text-foreground-500 font-medium">
													{shortcodes[key]}
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					</form>
				</div>
			</div>

			{processing && (
				<div className="bg-white/70 inset-0 absolute grid place-content-center z-30 dark:bg-black/80">
					<Spinner />
				</div>
			)}
		</div>
	)
}
