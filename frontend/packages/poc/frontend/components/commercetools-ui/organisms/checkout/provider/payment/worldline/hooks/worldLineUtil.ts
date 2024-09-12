import translations from './translations.json';

export const getPaymentName = (names?: any, locale = 'en') => {
  if (names[locale.toUpperCase()]) return names[locale.toUpperCase()];
  else return names['EN'] ? names['EN'] : 'Pay with Credit Card';
};

const checkoutTranslation = (lang: string) => {
  switch (lang) {
    case 'en':
      return translations.en;
    case 'es':
      return translations.es;
    case 'de':
      return translations.de;
    case 'fr':
      return translations.fr;
    case 'it':
      return translations.it;
    case 'nl':
      return translations.nl;
    default:
      return translations.en;
  }
};

export const getTranslation = (name?: any, locale = 'en') => {
  return `${checkoutTranslation(locale)} ${name}`;
};
