import { GuestLayout } from '@/layouts'
import { t } from '@/i18n'

const pageTitle = 'Política de cookie'

const Page = () => {
	return (
		<div className="max-w-4xl mx-auto px-6 py-10 bg-white text-gray-800 rounded shadow">
			<h1 className="text-3xl font-bold mb-6 border-b pb-2">{pageTitle}</h1>

			<p className="mb-6 text-justify leading-relaxed">
  En <strong>GOLAZOBETS</strong> utilizamos cookies propias y de terceros para mejorar tu experiencia
  como usuario, personalizar contenido, analizar la navegación y ofrecer publicidad
  relacionada con tus intereses. A continuación te explicamos qué son las cookies, qué tipos
  utilizamos y cómo puedes gestionarlas.
</p>

<h2 className="mb-4 font-bold">1. ¿QUÉ SON LAS COOKIES?</h2>
<p className="mb-6 text-justify leading-relaxed">
  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador,
  móvil, tablet...) cuando visitas una página web. Sirven para recordar tus preferencias,
  reconocer tu sesión, analizar cómo usas la web y, en algunos casos, mostrarte publicidad
  personalizada.
</p>

<h2 className="mb-4 font-bold">2. TIPOS DE COOKIES QUE UTILIZAMOS</h2>

<p className="mb-2 font-semibold">a) Según la entidad que las gestiona:</p>
<ul className="mb-6 list-disc list-inside">
  <li>Cookies propias: gestionadas directamente por <strong>GOLAZOBETS</strong>.</li>
  <li>Cookies de terceros: enviadas y gestionadas por terceros, como Google o Meta.</li>
</ul>

<p className="mb-2 font-semibold">b) Según su finalidad:</p>
<ul className="mb-6 list-disc list-inside">
  <li>Cookies técnicas (necesarias): permiten la navegación básica (inicio de sesión,
    seguridad, funcionamiento general).
  </li>
  <li>Cookies de análisis: recogen información estadística sobre cómo navegas (por
    ejemplo, qué páginas visitas, cuánto tiempo pasas en ellas).<br />
    <em>Ejemplo: Google Analytics</em>
  </li>
  <li>Cookies de publicidad comportamental: almacenan información sobre tus hábitos
    de navegación para mostrarte anuncios personalizados.<br />
    <em>Ejemplo: Meta Pixel (Facebook Ads)</em>
  </li>
</ul>

<p className="mb-2 font-semibold">c) Según el plazo de tiempo que permanecen activadas:</p>
<ul className="mb-6 list-disc list-inside">
  <li>Cookies de sesión: se borran al cerrar el navegador.</li>
  <li>Cookies persistentes: se almacenan durante un tiempo definido (pueden ser días,
    meses o años).
  </li>
</ul>

<h2 className="mb-4 font-bold">3. COOKIES UTILIZADAS EN ESTA WEB</h2>
<p className="mb-4">
  A modo orientativo, en <a href="https://www.golazobets.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.golazobets.com</a> se pueden instalar las siguientes cookies:
</p>

<table className="mb-6 w-full text-left border-collapse border border-gray-300">
  <thead>
    <tr>
      <th className="border border-gray-300 px-3 py-1">Nombre</th>
      <th className="border border-gray-300 px-3 py-1">Tipo</th>
      <th className="border border-gray-300 px-3 py-1">Finalidad</th>
      <th className="border border-gray-300 px-3 py-1">Duración</th>
      <th className="border border-gray-300 px-3 py-1">Propietario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-gray-300 px-3 py-1"><code>_ga</code></td>
      <td className="border border-gray-300 px-3 py-1">Análisis</td>
      <td className="border border-gray-300 px-3 py-1">Distingue usuarios (Google Analytics)</td>
      <td className="border border-gray-300 px-3 py-1">2 años</td>
      <td className="border border-gray-300 px-3 py-1">Google</td>
    </tr>
    <tr>
      <td className="border border-gray-300 px-3 py-1"><code>_gid</code></td>
      <td className="border border-gray-300 px-3 py-1">Análisis</td>
      <td className="border border-gray-300 px-3 py-1">Distingue sesiones (Google Analytics)</td>
      <td className="border border-gray-300 px-3 py-1">24 horas</td>
      <td className="border border-gray-300 px-3 py-1">Google</td>
    </tr>
    <tr>
      <td className="border border-gray-300 px-3 py-1"><code>_fbp</code></td>
      <td className="border border-gray-300 px-3 py-1">Publicidad</td>
      <td className="border border-gray-300 px-3 py-1">Rastrea visitas para remarketing (Meta)</td>
      <td className="border border-gray-300 px-3 py-1">3 meses</td>
      <td className="border border-gray-300 px-3 py-1">Meta/Facebook</td>
    </tr>
    <tr>
      <td className="border border-gray-300 px-3 py-1"><code>cookie_consent</code></td>
      <td className="border border-gray-300 px-3 py-1">Técnica</td>
      <td className="border border-gray-300 px-3 py-1">Guarda tu preferencia de cookies</td>
      <td className="border border-gray-300 px-3 py-1">1 año</td>
      <td className="border border-gray-300 px-3 py-1">Propia (GolazoBets)</td>
    </tr>
  </tbody>
</table>

<p className="mb-6 text-sm italic">
  Nota: esta tabla es un ejemplo. Si usas otros servicios (Hotjar, TikTok Pixel, etc.), habría que añadirlos.
</p>

<h2 className="mb-4 font-bold">4. ¿CÓMO PUEDES GESTIONAR LAS COOKIES?</h2>
<p className="mb-6 text-justify leading-relaxed">
  Cuando accedes por primera vez a <strong>GOLAZOBETS</strong>, te mostramos un banner de cookies
  para que puedas:
</p>
<ul className="mb-6 list-disc list-inside">
  <li>Aceptar todas las cookies.</li>
  <li>Rechazar todas las no necesarias.</li>
  <li>Configurar tus preferencias por categorías.</li>
</ul>
<p className="mb-6 text-justify leading-relaxed">
  Además, puedes modificar o revocar tu consentimiento en cualquier momento desde el
  enlace <code>"Configuración de cookies"</code> disponible en el pie de página.
</p>
<p className="mb-6 text-justify leading-relaxed">
  También puedes eliminar o bloquear cookies desde tu navegador:
</p>
<ul className="mb-6 list-disc list-inside">
  <li>Chrome: <a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://support.google.com/chrome/answer/95647?hl=es</a></li>
  <li>Firefox: <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://support.mozilla.org/es/kb/Borrar%20cookies</a></li>
  <li>Safari: <a href="https://support.apple.com/es-es/HT201265" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://support.apple.com/es-es/HT201265</a></li>
  <li>Edge: <a href="https://support.microsoft.com/es-es/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://support.microsoft.com/es-es/help/4027947/microsoft-edge-delete-cookies</a></li>
</ul>

<h2 className="mb-4 font-bold">5. TRANSFERENCIAS INTERNACIONALES</h2>
<p className="mb-6 text-justify leading-relaxed">
  Algunas de las cookies utilizadas (por ejemplo, Google Analytics o Meta) pueden implicar
  transferencias internacionales de datos. Estas empresas están adheridas a mecanismos
  legales como las cláusulas contractuales tipo aprobadas por la Comisión Europea.
</p>

<h2 className="mb-4 font-bold">6. CAMBIOS EN LA POLÍTICA DE COOKIES</h2>
<p className="mb-6 text-justify leading-relaxed">
  <strong>GOLAZOBETS</strong> puede actualizar esta política si introduce nuevas cookies o cambia las
  existentes. Te recomendamos revisarla periódicamente.
</p>

		</div>
	)
}

Page.layout = (page: JSX.Element) => (
	<GuestLayout {...{ children: page, pageTitle: t(pageTitle).toString() }} />
)

export default Page

