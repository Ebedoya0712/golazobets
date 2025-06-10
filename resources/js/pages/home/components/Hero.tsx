import { Link } from '@inertiajs/react'
import { Button } from '@nextui-org/react'

export const Hero = () => {
	return (
		<section className="bg-black flex justify-center items-center relative h-[80dvh] md:h-[60dvh]">
			<div className="flex-1 max-w-5xl py-20 relative z-10">
				<div className="text-white">
					<div className="text-5xl font-bc leading-none font-semibold text-balance md:text-6xl">
						APUESTA COMO UN PROFESIONAL
					</div>

					<div className="text-xl leading-tight text-pretty max-w-3xl mt-3 md:text-2xl">
						Accede a los mejores consejos de tipsters y maximiza tus ganancias
						en cada apuesta
					</div>

					<div className="mt-8 space-y-3">
						<Button
							color="secondary"
							radius="none"
							size="lg"
							as={Link}
							href={route('register')}
							className="uppercase text-xl font-bc font-medium"
						>
							Únete ahora
						</Button>

						<div className="text-sm md:text-base">
							y comienza a ganar con los mejores del mercado
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-6xl w-full h-full !p-0 absolute overflow-hidden">
				<img
					src="img/home/golazobets-homepage.jpg"
					alt="Imagen de cabecera golazobets"
					className="w-full h-full object-cover object-right opacity-50 md:object-center"
					loading="lazy"
				/>

				<div className="w-40 h-full top-0 left-0 absolute md:bg-gradient-to-r from-black to-transparent"></div>
				<div className="w-40 h-full top-0 right-0 absolute md:bg-gradient-to-l from-black to-transparent"></div>
			</div>
		</section>
	)
}
