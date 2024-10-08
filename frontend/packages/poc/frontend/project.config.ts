import { Currency } from '@commercetools/frontend-sdk/lib/types/Currency';

interface LocalizationMapping {
  locale: string;
  currency: Currency;
  currencyCode: string;
  countryName: string;
  countryCode: string;
  countryKey: string;
}

const localizationMapper = {
  en: {
    locale: 'en_US',
    currency: 'USD',
    currencyCode: '$',
    countryCode: 'US',
    countryName: 'United States',
    countryKey: 'us',
  },
  de: {
    locale: 'de_DE',
    currency: 'EUR',
    currencyCode: '€',
    countryCode: 'DE',
    countryName: 'Germany',
    countryKey: 'de',
  },
  pl: {
    locale: 'pl_PL',
    currency: 'PLN',
    currencyCode: 'zł',
    countryCode: 'PL',
    countryName: 'Poland',
    countryKey: 'pl',
  },
} as Record<string, LocalizationMapping>;

export const getLocalizationInfo = (locale: string) => {
  if (!(locale in localizationMapper)) {
    console.warn(
      `Invalid locale ${locale} provided. Possible values are ${Object.keys(localizationMapper).join(', ')}`,
    );

    return localizationMapper.en;
  }

  return localizationMapper[locale as keyof typeof localizationMapper];
};

export const worldlineScript =
  'https://payment.preprod.direct.worldline-solutions.com/hostedtokenization/js/client/tokenizer.min.js';
