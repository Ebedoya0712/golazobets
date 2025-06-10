import { PageContent, PageHeader } from '@/components'
import { t } from '@/i18n'
import { Layout } from '@/layouts/admin/Layout'
import { useForm } from '@inertiajs/react'
import { Button, Input } from '@nextui-org/react'

const pageTitle = 'Página de inicio'

type Props = {
	// posts: {
	// 	data: Post[]
	// 	last_page: number
	// 	current_page: number
	// }
}

const Page = ({}: // posts
Props) => {
	const { data: tipsters } = useForm({})
	const { data: picks } = useForm({})

	const saveTipsters = () => {}

	const savePicks = () => {}

	return (
		<>
			<PageHeader title={t(pageTitle)} />

			<PageContent>
				<div className="flex-1">
					<h3 className="">Tipsters destacados</h3>

					<form
						onSubmit={saveTipsters}
						className="grid grid-cols-3 gap-8 mt-4 pb-16 md:grid-cols-4 lg:grid-cols-8"
					>
						{Array.from({ length: 8 }).map((e, idx) => {
							return (
								<div className="" key={idx}>
									<Input
										type="number"
										label="id"
										labelPlacement="outside"
										startContent={<></>}
										className=""
									/>
								</div>
							)
						})}

						<div className="flex justify-end col-span-3 md:col-span-4 lg:col-span-8">
							<Button type="submit" color="primary" className="px-12">
								Guardar
							</Button>
						</div>
					</form>

					<hr className="" />

					<h3 className="mt-10">Pronósticos destacados</h3>

					<form
						onSubmit={savePicks}
						className="grid grid-cols-3 gap-8 mt-4 pb-16 md:grid-cols-4 lg:grid-cols-8"
					>
						{Array.from({ length: 8 }).map((e, idx) => {
							return (
								<div className="" key={idx}>
									<Input
										type="number"
										label="id"
										labelPlacement="outside"
										startContent={<></>}
										className=""
									/>
								</div>
							)
						})}

						<div className="flex justify-end col-span-3 md:col-span-4 lg:col-span-8">
							<Button type="submit" color="primary" className="px-12">
								Guardar
							</Button>
						</div>
					</form>
				</div>
			</PageContent>
		</>
	)
}

Page.layout = (page: JSX.Element) => (
	<Layout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page
