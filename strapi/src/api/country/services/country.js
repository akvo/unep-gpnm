'use strict';

/**
 * country controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const fetch = require('node-fetch');

module.exports = createCoreController('api::country.country', ({ strapi }) => ({


  async createCountryInStrapi(countryDBId, countryName) {
    try {
      const existingCountry = await strapi.db.query('api::country.country').findOne({
        where: { CountryDBId: countryDBId },
      });

      if (existingCountry) {
        console.log(`Country ${countryName} already exists. Skipping creation.`);
        return;
      }

      await strapi.db.query('api::country.country').create({
        data: {
          CountryDBId: countryDBId,
          CountryName: countryName,
        },
      });

      console.log(`Country ${countryName} created successfully`);
    } catch (error) {
      console.error('Error creating country:', error);
      throw new Error(`Error creating country: ${countryName}`);
    }
  },

  // Endpoint for fetching and populating countries from the external API
  async populateCountries(ctx) {
    try {
      // Fetch countries from the external API
      const response = await fetch('https://digital.gpmarinelitter.org/api/country');
      const countries = await response.json();

      // Loop through the fetched countries and create them in Strapi
      for (const country of countries) {

        console.log('countriescountries', countries)
        const { id, name } = country; // Extract relevant fields

        // Create or update the country entry in Strapi
        await this.createCountryInStrapi(id, name);
      }

      return ctx.send({
        success: true,
        message: 'Countries populated successfully',
      });
    } catch (error) {
      console.error('Error fetching or creating countries:', error);
      return ctx.send({
        success: false,
        error: 'Error fetching or creating countries',
      });
    }
  },

  // Endpoint to populate countries for all layers
  async populateCountriesForLayers(ctx) {
    try {
      // Fetch all layers and populate ValuePerCountry
      const layers = await strapi.db.query('api::layer.layer').findMany({
        populate: ['ValuePerCountry'],
      });

      // Fetch all countries
      const countries = await strapi.db.query('api::country.country').findMany();

      // Loop through each layer to update its ValuePerCountry
      for (const layer of layers) {
        const existingValuePerCountry = layer.ValuePerCountry || [];

        // Map countries to the required structure
        const valuePerCountryList = countries.map((country) => {
          const existingEntry = existingValuePerCountry.find(
            (entry) => entry.country === country.id
          );

          // Keep the existing entry if present; otherwise, create a new one
          return existingEntry
            ? existingEntry
            : {
              Value: 0,
              Year: '2024',
              country: country.id,
              CountryName: country.CountryName,
            };
        });

        // Update the layer with the new ValuePerCountry list
        await strapi.db.query('api::layer.layer').update({
          where: { id: layer.id },
          data: {
            ValuePerCountry: valuePerCountryList,
          },
        });
      }

      return ctx.send({
        success: true,
        message: 'Successfully populated countries for all layers.',
      });
    } catch (err) {
      console.error('Error populating countries for layers:', err.message || err);
      return ctx.send({
        success: false,
        error: 'Error populating countries for layers.',
      });
    }
  },

}));
