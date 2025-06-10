import { t } from '@/i18n'
import { TipsterCard } from '@/pages/tipsters/components/TipsterCard'
import { Link, usePage } from '@inertiajs/react'
import { Button } from '@nextui-org/react'
import { SectionHeader } from './SectionHeader'

import { PageProps } from '@/types'
import type { Tipster } from '@/types/tipsters.d'

export const FeaturedTipsters = () => {
	const props = usePage().props as PageProps
	const { featuredTipsters = [] } = props as unknown as {
		featuredTipsters: Tipster[]
	}

	return (
		<section className="relative z-20">
			<div>
				<SectionHeader
					title="TIPSTERS DESTACADOS"
					classNames={{ wrapper: '-mt-6' }}
				>
					<Button
						color="secondary"
						radius="none"
						as={Link}
						href={route('tipsters.premium')}
					>
						{t('Tipsters Premium')}
					</Button>
				</SectionHeader>

				<div className="pt-10 grid justify-center gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{featuredTipsters &&
						featuredTipsters.map((t) => (
							<div key={t.id} className="flex justify-center">
								<TipsterCard
									tipster={t}
									classNames={{ card: 'w-full', coverWrapper: '!min-w-full' }}
								/>
							</div>
						))}
				</div>
			</div>
		</section>
	)
}
