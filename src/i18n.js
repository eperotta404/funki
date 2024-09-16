import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esTranslation from './locales/es/translation.json';
import colTranslation from './locales/col/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: esTranslation,
    },
    col: {
      translation: colTranslation,
    },
  },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
