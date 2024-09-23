'use strict';

const { populateCountriesForLayers } = require('../services/populateCountries');

/**
 * layer controller
 */

module.exports = {
  async populateCountries(ctx) {
    const { arcgislayerId } = ctx.params;  

    await populateCountriesForLayers(arcgislayerId);

    ctx.send('Countries populated for layers');
  },
};
