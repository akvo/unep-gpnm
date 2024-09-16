import type { Schema, Attribute } from '@strapi/strapi';

export interface ValuesLayerValuePerCountry extends Schema.Component {
  collectionName: 'components_values_layer_value_per_countries';
  info: {
    displayName: 'CountryValue';
    description: '';
  };
  attributes: {
    Value: Attribute.Float;
    Year: Attribute.String;
    CountryName: Attribute.String;
    country: Attribute.Relation<
      'values.layer-value-per-country',
      'oneToOne',
      'api::country.country'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'values.layer-value-per-country': ValuesLayerValuePerCountry;
    }
  }
}
