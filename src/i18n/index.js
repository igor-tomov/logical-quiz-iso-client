import i18n from 'react-native-i18n';

i18n.fallbacks = true;

i18n.translations = {
  en:    require('./locales/en.json'),
  ru_RU: require('./locales/ru_RU.json'),
};

export default i18n;
