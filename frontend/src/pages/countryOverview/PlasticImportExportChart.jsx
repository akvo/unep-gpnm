import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { useRouter } from 'next/router';

const PlasticImportExportChart = () => {
  const router = useRouter(); 
  const {country}=router.query;
  const [years, setYears] = useState([]);
  const [totalImports, setTotalImports] = useState([]);
  const [totalExports, setTotalExports] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const importUrl = `https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Total_plastic___weight__import__WFL1/FeatureServer/0/query?where=1=1&outFields=Year,Value,Country&f=json`;
      const exportUrl = `https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Total_plastic___weight__export__WFL1/FeatureServer/0/query?where=1=1&outFields=Year,Value,Country&f=json`;

      try {
        const [importRes, exportRes] = await Promise.all([axios.get(importUrl), axios.get(exportUrl)]);

        const filteredImports = importRes.data.features.filter(item => item.attributes.Country === country);
        const filteredExports = exportRes.data.features.filter(item => item.attributes.Country === country);

        const yearsSet = new Set();
        const importValues = [];
        const exportValues = [];

        filteredImports.forEach(item => {
          yearsSet.add(item.attributes.Year);
          importValues.push(item.attributes.Value);
        });

        filteredExports.forEach(item => {
          exportValues.push(item.attributes.Value);
        });

        setYears(Array.from(yearsSet));
        setTotalImports(importValues);
        setTotalExports(exportValues);
      } catch (error) {
        console.error('Error fetching data from ArcGIS:', error);
      }
    };

    fetchData();
  }, [country]);

  const getOption = () => {
    return {
      title: {
        text: `Plastic Import & Export for ${country} (kUSD)`,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Total exports', 'Total imports'], // Only show names, no values
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: years,
      },
      yAxis: {
        type: 'value',
        name: 'Value in 1000 USD',
      },
      series: [
        {
          name: 'Total exports',
          type: 'line',
          data: totalExports,
          symbol: 'circle',
          itemStyle: {
            color: 'blue',
          },
        },
        {
          name: 'Total imports',
          type: 'line',
          data: totalImports,
          symbol: 'circle',
          itemStyle: {
            color: 'orange',
          },
        },
      ],
    };
  };
  

  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: '400px', width: '100%' }}
    />
  );
};

export default PlasticImportExportChart;
