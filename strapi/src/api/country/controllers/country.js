'use strict';

const { addAllCountries } = require('../services/addAllCountries');

/**
 * country controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::country.country');


module.exports = {
    async addCountries(ctx) {
      await addAllCountries();
      ctx.send('Countries added');
    },
  };
  