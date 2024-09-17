// // path: src/api/layer/services/populateCountries.js

// module.exports = {
//   async populateCountriesForLayers() {
//     try {
//       const countries = await strapi.entityService.findMany('api::country.country', {
//         fields: ['id', "CountryName"], 
//       });

//       if (!countries.length) {
//         console.log('No countries found.');
//         return;
//       }

//       const layers = await strapi.entityService.findMany('api::layer.layer');
//       console.log(countries[0])
//       for (const layer of layers) {



//         const valuePerCountryData = countries.map(country => ({
//           Value: 0,  
//           Year: new Date().getFullYear().toString(),  
//           CountryName: country["CountryName"],
//           country: country["id"]
//         }));

//         await strapi.entityService.update('api::layer.layer', layer.id, {
//           data: {
//             ValuePerCountry: valuePerCountryData,
//           },
//         });
//         console.log(`Updated layer ${layer.id} with countries.`);
//       }

//     } catch (err) {
//       console.error('Error populating countries:', err);
//     }
//   },
// };




const xlsx = require('xlsx');
const path = require('path'); // For handling file paths

module.exports = {
  async populateCountriesForLayers() {
    try {
      // Load the Excel file (assuming it's located in the /data folder)
      const workbook = xlsx.readFile(path.resolve(__dirname, './LayerDataValues.csv'));

      // Get the first sheet in the workbook
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON
      const excelData = xlsx.utils.sheet_to_json(sheet);

      // Fetch all countries from Strapi
      const countries = await strapi.entityService.findMany('api::country.country', {
        fields: ['id', 'CountryName'],
      });

      if (!countries.length) {
        console.log('No countries found.');
        return;
      }

      // Fetch all layers from Strapi
      const layers = await strapi.entityService.findMany('api::layer.layer');

      for (const layer of layers) {
        // Map the countries to the Excel data
        const valuePerCountryData = countries.map(country => {

          const excelRow = excelData.find(row => row.Country === country["CountryName"]);

          return {
            Value: excelRow ? excelRow.OBS_Value : 0,  // Default value if not found
            Year: excelRow ? excelRow.Time_Period.toString() : new Date().getFullYear().toString(),  // Default year if not found
            CountryName: country["CountryName"],
            country: country["id"]
          };
        });

        // Update each layer with the mapped ValuePerCountry data
        await strapi.entityService.update('api::layer.layer', layer.id, {
          data: {
            ValuePerCountry: valuePerCountryData,
          },
        });

        console.log(`Updated layer ${layer.id} with values from Excel.`);
      }

    } catch (err) {
      console.error('Error populating countries:', err);
    }
  },
};
