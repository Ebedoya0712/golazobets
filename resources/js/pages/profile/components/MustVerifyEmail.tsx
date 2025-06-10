import { t } from '@/i18n'
import { router } from '@inertiajs/react'
import { Button, Card, CardBody } from '@nextui-org/react'

interface Props {
	status: any
}

export const MustVerifyEmail = ({ status }: Props) => {
	if (status !== 'verification-link-sent')
		return (
			<Card
				shadow="none"
				className="bg-danger-50 text-danger-500 pl-14 pr-6 py-6"
			>
				<i className="ri-mail-unread-line ri-2x left-3 top-4 absolute" />
				<CardBody className="p-0">
					<div className="flex justify-between items-center">
						<p className="text-danger font-light">
							{t('Your email address is unverified')}
						</p>

						<div>
							<Button
								size="sm"
								color="danger"
								onPress={() => router.post(route('verification.send'))}
							>
								{t('email-verify-link')}
							</Button>
						</div>
					</div>
				</CardBody>
			</Card>
		)

	return (
		<Card
			shadow="none"
			className="bg-success-50 text-success-500 pl-14 pr-6 py-6"
		>
			<i className="ri-mail-check-line ri-2x left-3 top-3 absolute" />
			<CardBody className="text-sm font-light p-0">
				{t('verification-link-sent-notice')}
			</CardBody>
		</Card>
	)
}
