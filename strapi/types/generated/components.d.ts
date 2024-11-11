import type { Schema, Attribute } from '@strapi/strapi';

export interface ValuePerCountryValuePerCountry extends Schema.Component {
  collectionName: 'components_value_per_country_value_per_countries';
  info: {
    displayName: 'ValuePerCountry';
    description: '';
  };
  attributes: {
    country: Attribute.Relation<
      'value-per-country.value-per-country',
      'oneToOne',
      'api::country.country'
    >;
    CountryName: Attribute.String;
    Value: Attribute.Decimal;
    Year: Attribute.String;
    City: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'value-per-country.value-per-country': ValuePerCountryValuePerCountry;
    }
  }
}
