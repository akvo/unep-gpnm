
module.exports = {
    async assignCountriesToLayers() {
        console.log('dasdadasdasd')
        try {

            const layers = await strapi.db.query('api::layer.layer').findMany({
                populate: ['ValuePerCountry'],
            });

            const countries = await strapi.db.query('api::country.country').findMany();

            for (const layer of layers) {
                // Initial value is 0 and year is null, so we can distinguish countries without data
                const valuePerCountryList = countries.map((country) => ({
                    Value: 0,
                    Year: null,
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
            console.error('Error:', err);
            throw new Error('Error populating countries for layers');
        }
    },
};
