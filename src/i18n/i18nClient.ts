import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

import { translation } from './locales';

/**
 * Client Side Load
 */
const i18nClientInit = i18n
	.use(LanguageDetector)
	.init({
		load: 'all',
		supportedLngs: ['en-US', 'ko-KR'],
		fallbackLng: 'en-US',
		interpolation: {
			escapeValue: false, // not needed for react!!
		},
		defaultNS: 'locale.constant',
		resources: {
			en: {
				'locale.constant': translation,
			},
			'en-US': {
				'locale.constant': translation,
			},
		},
	});

const i18nClient = () => i18nClientInit;

export { i18nClient }

export default i18nClient;
