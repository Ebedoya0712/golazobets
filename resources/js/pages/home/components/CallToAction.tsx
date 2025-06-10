import { t } from '@/i18n'
import { Link } from '@inertiajs/react'
import { SectionHeader } from './SectionHeader'

export const CallToAction = () => {
	return (
		<section className="relative overflow-x-hidden-">
			<div className="relative z-10">
				<SectionHeader title="SE PARTE DE GOLAZOBETS"></SectionHeader>

				<div className="pt-10 pb-16 flex">
					<div className="md:pr-5 md:w-3/4 lg:w-2/3">
						<h3 className="text-black font-bc text-3xl font-medium leading-tight tracking-tight uppercase pl-5">
							{t('¿Eres Tipster?')}
						</h3>
						<p className="leading-tight max-w-sm mt-3 pl-5">
							{t(
								'Únete a una comunidad de apostadores que comparten tus mismas metas y pasión.'
							)}
						</p>

						<div
							className="flex flex-col mt-7 
							[&>div]:transition-color [&>div]:duration-300
							[&>div>div]:transition-color [&>div>div]:duration-300
							[&>div>div>*]:transition-color [&>div>div>*]:duration-300"
						>
							<Link
								href={route('register')}
								className="group flex gap-6 px-5 py-2.5 md:items-center hover:bg-secondary-50"
							>
								<div className="bg-white border border-stone-100 size-14 mt-1 grid place-content-center shrink-0 shadow-[0_3px_13px_#00000035] transition-all duration-300 md:size-16 group-hover:bg-secondary group-hover:border-secondary">
									<img
										src="img/750583-200.png"
										alt="user"
										className="size-12 transition-all duration-300 group-hover:invert"
									/>
								</div>
								<div className="">
									<p className="text-xl font-bc font-medium uppercase truncate group-hover:text-primary">
										{t('Registro gratuito')}
									</p>
									<p className="text-xs leading-tight group-hover:text-primary">
										{t('El registro es 100% GRATIS para tipsters free')}
									</p>
								</div>
							</Link>

							<Link
								href={route('register')}
								className="group flex gap-6 px-5 py-2.5 md:items-center hover:bg-secondary-50"
							>
								<div className="bg-white border border-stone-100 size-14 mt-1 grid place-content-center shrink-0 shadow-[0_3px_13px_#00000035] transition-all duration-300 md:size-16 group-hover:bg-secondary group-hover:border-secondary">
									<img
										src="img/7433578-200.png"
										alt="user"
										className="size-12 transition-all duration-300 group-hover:invert"
									/>
								</div>
								<div className="">
									<p className="text-xl font-bc font-medium uppercase truncate group-hover:text-primary">
										{t('Comodidad')}
									</p>
									<p className="text-xs leading-tight group-hover:text-primary">
										{t(
											'Posteo y reenvío rápido de tus picks a un canal en la app para ahorrarte tiempo'
										)}
									</p>
								</div>
							</Link>

							<Link
								href={route('register')}
								className="group flex gap-6 px-5 py-2.5 md:items-center hover:bg-secondary-50"
							>
								<div className="bg-white border border-stone-100 size-14 mt-1 grid place-content-center shrink-0 shadow-[0_3px_13px_#00000035] transition-all duration-300 md:size-16 group-hover:bg-secondary group-hover:border-secondary">
									<img
										src="img/3352243-200.png"
										alt="user"
										className="size-12 transition-all duration-300 group-hover:invert"
									/>
								</div>
								<div className="">
									<p className="text-xl font-bc font-medium uppercase truncate group-hover:text-primary">
										{t('Aumentan tus seguidores')}
									</p>
									<p className="text-xs leading-tight group-hover:text-primary">
										{t(
											'Trabaja con transparencia y constancia para aumentar tus followers sin invertir dinero'
										)}
									</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-black w-[26vw] !p-0 right-0 top-7 bottom-0 absolute hidden md:block lg:w-[35vw] 2xl:w-[40vw]">
				<div className="h-full relative 2xl:w-96">
					<img
						src="img/4711786.jpg"
						alt="Se parte de golazobets"
						className="w-full h-full object-cover object-top opacity-60"
					/>
					<div className="bg-gradient-to-r from-transparent to-black w-1/3 h-full right-0 top-0 absolute" />

					<div className="text-white flex items-center left-1 top-1/2 absolute">
						<i className="ri-arrow-left-line ri-2x" />
						<p className="leading-none font-bc font-semibold uppercase flex flex-col ml-3">
							<span className="text-3xl">{t('¿Quieres')}</span>
							<span className="text-4xl -mt-1">{t('apostar?')}</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
