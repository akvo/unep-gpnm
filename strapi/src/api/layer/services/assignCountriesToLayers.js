
module.exports = {
    async assignCountriesToLayers(ctx) {
        try {

            const layers = await strapi.db.query('api::layer.layer').findMany({
                populate: ['ValuePerCountry'],
            });

            const countries = await strapi.db.query('api::country.country').findMany();

            for (const layer of layers) {

                const valuePerCountryList = countries.map((country) => ({
                    Value: 0,
                    Year: '2024',
                    CountryName: country["CountryName"],
                    country: country["id"]
                }));

                await strapi.entityService.update('api::layer.layer', layer.id, {
                    data: {
                        ValuePerCountry: valuePerCountryList,
                    },
                });
            }

            return true;
        } catch (err) {
            console.error('Error populating countries for layers:', err);
            throw new Error('Error populating countries for layers');
        }
    },
};
