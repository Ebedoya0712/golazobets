export const colors = {
	/**
	 *
	 *
	 * Light
	 * ........................................................................
	 */
	light: {
		background: {
			DEFAULT: '#F9FAFA',
		},
		foreground: {
			DEFAULT: '#303031',
			50: '#BABBBB',
			100: '#A8A9AA',
			200: '#959798',
			300: '#838586',
			400: '#707172',
			500: '#5E5F60',
			600: '#4B4C4D',
			700: '#393A3B',
			800: '#262727',
			900: '#141515',
		},
		focus: {
			DEFAULT: '#006FEE',
		},
		overlay: {
			DEFAULT: '#000000',
		},
		divider: {
			DEFAULT: '#E9E9EA',
		},
		content1: {
			DEFAULT: '#FFFFFF',
			foreground: '#3C3C3D',
		},
		content2: {
			DEFAULT: '#F9FAFA',
			foreground: '#3C3C3D',
		},
		content3: {
			DEFAULT: '#F4F4F4',
			foreground: '#3C3C3D',
		},
		content4: {
			DEFAULT: '#EEEFEF',
			foreground: '#3C3C3D',
		},
		default: {
			DEFAULT: '#E9E9EA', // 200
			'50': '#F9FAFA',
			'100': '#F4F4F4',
			'200': '#E9E9EA',
			'300': '#E3E4E5',
			'400': '#DDDFDF',
			'500': '#D8D9DA',
			'600': '#D2D4D5',
			'700': '#CDCECF',
			'800': '#C7C9CA',
			'900': '#B3B5B6',
			foreground: '#505051',
		},
		primary: {
			DEFAULT: '#004483',
			50: '#ccd6e6',
			100: '#99adcd',
			200: '#6684b3',
			300: '#335b9a',
			400: '#004483',
			500: '#003669',
			600: '#002950',
			700: '#001c37',
			800: '#000f1e',
			900: '#000205',
			foreground: '#FFFFFF',
		},
		secondary: {
			DEFAULT: '#FFDA00',
			50: '#FFFAE6',
			100: '#FFF5CC',
			200: '#FFEB99',
			300: '#FFE166',
			400: '#FFD733',
			500: '#FFDA00',
			600: '#CCB000',
			700: '#998400',
			800: '#665800',
			900: '#332C00',
			foreground: '#191800',
		},
		success: {
			DEFAULT: '#17c964',
			50: '#E8FAF0',
			100: '#D1F4E0',
			200: '#A2E9C1',
			300: '#74DFA2',
			400: '#45D483',
			500: '#17C964',
			600: '#12A150',
			700: '#0E793C',
			800: '#095028',
			900: '#052814',
			foreground: '#FFFFFF',
		},
		warning: {
			DEFAULT: '#F5A524',
			50: '#FEFCE8',
			100: '#FDEDD3',
			200: '#FBDBA7',
			300: '#F9C97C',
			400: '#F7B750',
			500: '#F5A524',
			600: '#C4841D',
			700: '#936316',
			800: '#62420E',
			900: '#312107',
			foreground: '#FFFFFF',
		},
		danger: {
			DEFAULT: '#f31260',
			50: '#FEE7EF',
			100: '#FDD0DF',
			200: '#FAA0BF',
			300: '#F871A0',
			400: '#F54180',
			500: '#F31260',
			600: '#C20E4D',
			700: '#920B3A',
			800: '#610726',
			900: '#310413',
			foreground: '#FFFFFF',
		},
	},

	/**
	 *
	 *
	 * Dark
	 * ........................................................................
	 */
	dark: {
		background: {
			DEFAULT: '#0D1117', // Ajuste sutil al negro puro, más amigable para la vista
		},
		foreground: {
			DEFAULT: '#D1D5DB', // Un gris claro para mantener contraste sin ser demasiado brillante
			50: '#1F2937',
			100: '#262F3D',
			200: '#303846',
			300: '#3B434F',
			400: '#454D59',
			500: '#525966',
			600: '#646C78',
			700: '#78808C',
			800: '#9AA1AB',
			900: '#CBD3DD',
		},
		focus: {
			DEFAULT: '#3385FF', // Azul un poco más suave que el original
		},
		overlay: {
			DEFAULT: '#000000CC', // Negro con transparencia para overlays
		},
		divider: {
			DEFAULT: '#FFFFFF15', // Transparencia más sutil para divisores
		},
		content1: {
			DEFAULT: '#0A0C10', // Fondo ligeramente elevado
			foreground: '#A3ABB4', // Texto gris claro
		},
		content2: {
			DEFAULT: '#10141A',
			foreground: '#A3ABB4',
		},
		content3: {
			DEFAULT: '#161B22',
			foreground: '#A3ABB4',
		},
		content4: {
			DEFAULT: '#1D232C',
			foreground: '#A3ABB4',
		},
		default: {
			DEFAULT: '#3B434F',
			50: '#1F2937',
			100: '#262F3D',
			200: '#303846',
			300: '#3B434F',
			400: '#454D59',
			500: '#525966',
			600: '#646C78',
			700: '#78808C',
			800: '#9AA1AB',
			900: '#CBD3DD',
			foreground: '#E5E7EB', // Gris claro para un buen contraste
		},
		primary: {
			DEFAULT: '#3385FF',
			50: '#0D2239',
			100: '#113355',
			200: '#18477A',
			300: '#1E5AA0',
			400: '#2676D2',
			500: '#3385FF',
			600: '#5A9EFF',
			700: '#85B8FF',
			800: '#B0D2FF',
			900: '#DCEBFF',
			foreground: '#FFFFFF',
		},
		secondary: {
			DEFAULT: '#7F5BDF', // Tono más suave que el original
			50: '#261A43',
			100: '#392761',
			200: '#4F3983',
			300: '#654BA5',
			400: '#7F5BDF',
			500: '#9676E8',
			600: '#AF93F2',
			700: '#C9B0FB',
			800: '#E2CCFF',
			900: '#F1E7FF',
			foreground: '#FFFFFF',
		},
		success: {
			DEFAULT: '#16A34A', // Un verde equilibrado y familiar
			foreground: '#E9FAEF',
		},
		warning: {
			DEFAULT: '#F59E0B', // Tono cálido más moderado
			foreground: '#FFFAEB',
		},
		danger: {
			DEFAULT: '#EF4444',
			foreground: '#FFECEC',
		},
	},
}
