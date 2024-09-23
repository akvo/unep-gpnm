'use strict';

const { assignCountriesToLayers } = require('../services/assignCountriesToLayers');

/**
 * layer controller
 */

module.exports = {
  async assignCountries(ctx) {

    await assignCountriesToLayers();

    ctx.send('Countries assigned to layers');
  },
};
