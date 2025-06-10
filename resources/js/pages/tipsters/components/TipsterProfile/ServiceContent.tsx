import { alowedTags } from '@/helpers/safelySetInnerHtmlAllowedTags'
import { t } from '@/i18n'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import ReactSafelySetInnerHTML from 'react-safely-set-inner-html'

export const ServiceContent = () => {
	const { props } = usePage<PageProps>()
	const { userTipster } = props
	const { account } = userTipster

	if (!account) return

	return (
		<div className="space-y-5">
			{account.description_service && (
				<div>
					<h3 className="text-primary text-2xl font-bc font-semibold uppercase">
						{t('Servicio')}
					</h3>

					<ReactSafelySetInnerHTML allowedTags={alowedTags}>
						{`<div class="text-sm leading-tight mt-1 space-y-2 [&_p]:min-h-2">${account.description_service}</div>`}
					</ReactSafelySetInnerHTML>
				</div>
			)}

			{account.description_market && (
				<>
					<hr className="bg-gray-200" />

					<div>
						<h3 className="text-primary text-2xl font-bc font-semibold uppercase">
							{t('Mercado')}
						</h3>

						<ReactSafelySetInnerHTML allowedTags={alowedTags}>
							{`<div class="text-sm leading-tight mt-1 space-y-2 [&_p]:min-h-2">${account.description_market}</div>`}
						</ReactSafelySetInnerHTML>
					</div>
				</>
			)}

			{account.description_picks && (
				<>
					<hr className="bg-gray-200" />

					<div>
						<h3 className="text-primary text-2xl font-bc font-semibold uppercase">
							{t('Apuestas')}
						</h3>

						<ReactSafelySetInnerHTML allowedTags={alowedTags}>
							{`<div class="text-sm leading-tight mt-1 space-y-2 [&_p]:min-h-2">${account.description_picks}</div>`}
						</ReactSafelySetInnerHTML>
					</div>
				</>
			)}

			{account.publishing_time && (
				<>
					<hr className="bg-gray-200" />

					<div>
						<h3 className="text-primary text-2xl font-bc font-semibold uppercase">
							{t('Horario de publicación')}
						</h3>

						<ReactSafelySetInnerHTML allowedTags={alowedTags}>
							{`<div class="text-sm leading-tight mt-1 space-y-2 [&_p]:min-h-2">${account.publishing_time}</div>`}
						</ReactSafelySetInnerHTML>
					</div>
				</>
			)}

			{account.stake_preference && (
				<>
					<hr className="bg-gray-200" />

					<div>
						<h3 className="text-primary text-2xl font-bc font-semibold uppercase">
							{t('Stake')}
						</h3>

						<ReactSafelySetInnerHTML allowedTags={alowedTags}>
							{`<div class="text-sm leading-tight mt-1 space-y-2 [&_p]:min-h-2">${account.stake_preference}</div>`}
						</ReactSafelySetInnerHTML>
					</div>
				</>
			)}

			{account.bio && (
				<>
					<hr className="bg-gray-200" />

					<div>
						<h3 className="text-primary text-2xl font-bc font-semibold uppercase">
							{t('Sobre mí')}
						</h3>

						<ReactSafelySetInnerHTML allowedTags={alowedTags}>
							{`<div class="text-sm leading-tight mt-1 space-y-2 [&_p]:min-h-2">${account.bio}</div>`}
						</ReactSafelySetInnerHTML>
					</div>
				</>
			)}
		</div>
	)
}
