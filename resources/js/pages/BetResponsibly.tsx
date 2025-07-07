import { GuestLayout } from '@/layouts'
import { t } from '@/i18n'

const pageTitle = 'Normas y Buenas Prácticas'

const Page = () => {
	return (
		<div className="max-w-4xl mx-auto px-6 py-10 bg-white text-gray-800 rounded shadow">
			<h1 className="text-3xl font-bold mb-6 border-b pb-2">{pageTitle}</h1>

			<p className="mb-4 text-gray-700">
  En GOLAZOBETS trabajamos cada día para construir una comunidad segura, honesta y profesional, donde tanto tipsters como usuarios puedan confiar plenamente en el contenido compartido.
</p>
<p className="mb-4 text-gray-700">
  Para lograrlo, es fundamental establecer unas normas claras que garanticen la transparencia, el respeto y el juego responsable.
</p>
<p className="mb-4 text-gray-700">
  Estas normas aplican a todos los miembros de la plataforma y buscan proteger la integridad del ecosistema y fomentar un entorno confiable y transparente para todos.
</p>
<p className="mb-4 text-gray-700">
  Cumplir con estas reglas no solo es una obligación, sino también una muestra de compromiso con la comunidad que entre todos estamos construyendo.
</p>
<p className="mb-4 text-gray-700 font-semibold">
  ¡Juega con cabeza, comparte con responsabilidad y apuesta con inteligencia!
</p>

<p className="mb-4 text-gray-700 font-bold">Plagio</p>
<p className="mb-4 text-gray-700">
  En GOLAZOBETS no toleramos el plagio ni copia de pronósticos de otros tipsters. En caso de que veamos un caso claro de plagio, nos veremos obligados a eliminar la cuenta de la persona que ha plagiado.
</p>

<p className="mb-4 text-gray-700 font-bold">Transparencia en los resultados</p>
<p className="mb-4 text-gray-700">
  A pesar de que en GOLAZOBETS verificamos y revisamos todas las apuestas subidas a la web, la corrección de estas es función del Tipster. Es por eso que apelamos a la buena fe del Tipster y confiamos en que todas las apuestas sean corregidas de manera correcta.
</p>

<p className="mb-4 text-gray-700 font-bold">Prohibida la manipulación de estadísticas</p>
<p className="mb-4 text-gray-700">
  No se deben alterar datos para inflar artificialmente el rendimiento. Por ejemplo, si tu stake habitual es Stake 1, deberás seguir ese patrón y no cambiar repentinamente a un stake mucho más alto con el objetivo de mejorar tus estadísticas.
</p>

<p className="mb-4 text-gray-700 font-bold">Indicar la casa de apuestas y la cuota exacta</p>
<p className="mb-4 text-gray-700">
  Para mayor transparencia en el seguimiento de resultados. Confiamos en que el Tipster comparta sus apuestas con la cuota real en el momento de su publicación.
</p>

<p className="mb-4 text-gray-700 font-bold">No hacer spam ni autopromoción excesiva</p>
<p className="mb-4 text-gray-700">
  No se permite promocionar servicios externos sin autorización.
</p>

<p className="mb-4 text-gray-700 font-bold">No incentivar el juego irresponsable</p>
<p className="mb-4 text-gray-700">
  Se deben evitar mensajes que promuevan el juego compulsivo o irresponsable.
</p>

<p className="mb-4 text-gray-700 font-bold">Publicar los pronósticos con antelación</p>
<p className="mb-4 text-gray-700">
  Con el objetivo de que los pronósticos sean “seguibles”, se recomienda subirlos al menos media hora antes del evento.
</p>

<p className="mb-4 text-gray-700 font-bold">Gestión del bank</p>
<p className="mb-4 text-gray-700">
  Usar una gestión de bankroll responsable y no sugerir apuestas excesivamente arriesgadas sin advertirlo.
</p>

<p className="mb-4 text-gray-700 font-bold">Respeto</p>
<p className="mb-4 text-gray-700">
  No se tolerarán insultos, faltas de respeto o conductas tóxicas en la comunidad.
</p>

<p className="mb-4 text-gray-700 font-bold">Fomentar el juego responsable</p>
<p className="mb-4 text-gray-700">
  De vez en cuando, no está de más recordar a los usuarios que las apuestas conllevan riesgo.
</p>

<p className="mb-4 text-gray-700 font-bold">No se admiten apuestas de cuotas promocionales</p>
<p className="mb-4 text-gray-700">
  No se admitirán apuestas de cuotas especiales o promocionales como pueden ser las Supercuotas o Superaumentos.
</p>

<p className="mb-4 text-gray-700 font-bold">Apuestas limitadas</p>
<p className="mb-4 text-gray-700">
  Confiamos en que las apuestas compartidas no están limitadas a cantidades &quot;bajas&quot; de dinero.
</p>

<p className="mb-4 text-gray-700 font-bold">Determinación de las apuestas</p>
<p className="mb-4 text-gray-700">
  Las apuestas serán determinadas según el resultado real del evento. No se tendrán en cuenta apuestas determinadas en función a una promoción de una casa de apuestas. Por ejemplo, si X casa de apuestas determina una apuesta como ganadora en función a una promoción suya, pero el resultado de lo apostado no ha sido acertado, la apuesta será marcada como fallada.
</p>

<p className="mb-4 text-gray-700 font-bold">Reenvío de picks y piratería</p>
<p className="mb-4 text-gray-700">
  En caso de que detectemos que un usuario está aprovechándose de los servicios contratados de un tipster para compartir sus apuestas por otros medios, será expulsado con efecto inmediato.
</p>

		</div>
	)
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page

