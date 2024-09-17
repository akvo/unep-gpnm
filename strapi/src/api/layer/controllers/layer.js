'use strict';

const { populateCountriesForLayers } = require('../services/populateCountries');

/**
 * layer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// path: src/api/layer/controllers/layer.js

module.exports = {
    async populateCountries(ctx) {
    
      await populateCountriesForLayers();
      ctx.send('Countries populated for layers');
    },
  };
  