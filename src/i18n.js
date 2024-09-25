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
  lng: 'es-MX',
  fallbackLng: 'es-MX',
  iinterpolation: {
    format(value, format, lng) {
      if (format === 'currency') {
        let currency;
        if (lng === 'es-MX') {
          currency = 'MXN';
        } else if (lng === 'es-CO') {
          currency = 'COP';
        }
        return new Intl.NumberFormat(lng, {
          style: 'currency',
          currency,
        }).format(value);
      }
      return value;
    },
  },
});

export default i18n;
