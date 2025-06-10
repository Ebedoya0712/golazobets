import en from './english'
import es from './spanish'

type LocaleTranslations = { [key: string]: string }

type Translations = {
	en: LocaleTranslations
	es: LocaleTranslations
	[key: string]: LocaleTranslations
}

const translations: Translations = {
	en,
	es,
}

/**
 * Function t() allows you to tranlate strings
 * from the translations object at i18n/translations.ts
 * @param str
 * @returns
 */
type Params = {
	[key: string]: string | React.ReactNode
}

export const t = (str: string, params: Params = {}): string | JSX.Element => {
	if (!str) {
		console.warn('Translation key is empty.')
		return ''
	}

	const currentLocale = window.locale ?? 'en'

	const translation = translations[currentLocale]?.[str]

	if (!translation) {
		// console.warn(
		// 	`Missing translation for key: "${str}" in locale: "${currentLocale}"`
		// )
		return str
	}

	if (typeof translation === 'string' && params) {
		// @ts-ignore
		return Object.keys(params).reduce((acc, key) => {
			const value = params[key]
			if (typeof value === 'string') {
				return acc.replace(new RegExp(`%${key}%`, 'g'), value)
			} else {
				return acc
					.split(new RegExp(`%${key}%`, 'g'))
					.flatMap((item, i, arr) =>
						i < arr.length - 1 ? [item, value] : item
					)
			}
		}, translation)
	}

	return translation ?? str
}
