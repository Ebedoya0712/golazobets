import { Card, CardBody, CardHeader } from '@nextui-org/react'

export const Warning = () => {
	return (
		<div className="bg-yellow-50 flex justify-center">
			<div className="w-full max-w-5xl">
				<Card shadow="none" className="bg-warning-50 text-warning-500 pl-12">
					<i className="ri-error-warning-fill ri-2x left-3 top-1 absolute" />
					<CardHeader className="pb-0 text-xs">Advertencia</CardHeader>
					<CardBody className="text-xs font-light pt-0">
						Los tipsters free no son verificados exhaustivamente por Golazobets
						y sus estadísticas podrían ser manipuladas. Recomendamos no asumir
						demasiado riesgo ni contactar con ellos a través de otros medios.
					</CardBody>
				</Card>
			</div>
		</div>
	)
}
