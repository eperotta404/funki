import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import mexTranslation from './locales/mex/translation.json';
import colTranslation from './locales/col/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    mex: {
      translation: mexTranslation,
    },
    col: {
      translation: colTranslation,
    },
  },
  lng: 'mex',
  fallbackLng: 'mex',
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;
