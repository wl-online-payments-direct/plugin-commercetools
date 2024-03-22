import { parseChunkImport } from '@commercetools-frontend/i18n';

const getChunkImport = (locale) => {
  const lang = locale ? locale?.split('-')[0] : 'en';
  switch (lang) {
    case 'de':
      return import(
        /* webpackChunkName: "app-i18n-de" */ './i18n/data/de.json'
      );
    case 'en':
      return import(
        /* webpackChunkName: "app-i18n-en" */ './i18n/data/en.json'
      );
    case 'es':
      return import(
        /* webpackChunkName: "app-i18n-es" */ './i18n/data/es.json'
      );
    case 'fr':
      return import(
        /* webpackChunkName: "app-i18n-fr" */ './i18n/data/fr.json'
      );
    case 'it':
      return import(
        /* webpackChunkName: "app-i18n-it" */ './i18n/data/it.json'
      );
    case 'nl':
      return import(
        /* webpackChunkName: "app-i18n-nl" */ './i18n/data/nl.json'
      );
    default:
      return import(
        /* webpackChunkName: "app-i18n-en" */ './i18n/data/en.json'
      );
  }
};

const loadMessages = async (locale) => {
  try {
    const chunkImport = await getChunkImport(locale);
    return parseChunkImport(chunkImport);
  } catch (error) {
    console.warn(
      `Something went wrong while loading the app messages for ${locale}`,
      error
    );
    return {};
  }
};

export default loadMessages;
