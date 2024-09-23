'use strict';

/**
 * layer router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/layers/populate-countries/:arcgislayerId',
      handler: 'layer.populateCountries',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/layers/assign-countries/',
      handler: 'layer.assignCountries',
      config: {
        auth: false,
      },
    },
  ],
};
