import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';

const langFromLocalStorage = localStorage.getItem('lang');

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    defaultNS: 'resources',
    ns: [
      'resources',
    ],
    lng: langFromLocalStorage,
    fallbackLng: 'enUS',
    fallbackNS: 'resources',
    load: 'languageOnly',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;