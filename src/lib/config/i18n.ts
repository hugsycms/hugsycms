import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en_US: {
    translation: require('./language/en_US.json'),
  },
  zh_CN: {
    translation: require('./language/zh_CN.json'),
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en_US',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
