import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
  en: require('./locales/en.json'),
  ru_RU: require('./locales/ru_RU.json'),
};

export default I18n;
