import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import axios from 'axios'
import { useRouter } from 'next/router'

const PlasticImportExportPieCharts = ({ chartType }) => {
  const router = useRouter()
  const { country } = router.query

  const [data, setData] = useState([])

  const categories = [
    'Plastic in primary forms',
    'Intermediate forms of plastic',
    'Final manufactured plastic goods',
    'Plastic waste',
  ]

  const layerUrls = {
    import: {
      plasticinPrimaryForm:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Plastics_in_primary_forms___weight__import__WFL1/FeatureServer/0/query',
      intermediateFormsOfPlastic:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Intermediate_forms_of_plastic_weight____import__WFL1/FeatureServer/0/query',
      finalManufacturedPlasticGoods:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Final_manufactured_plastics_goods___weight__import__WFL1/FeatureServer/0/query',
      plasticWaste:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Plastic_waste_weigth____import__WFL1/FeatureServer/0/query',
    },
    export: {
      plasticinPrimaryForm:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Plastics_in_primary_forms___weight__export__WFL1/FeatureServer/0/query',
      intermediateFormsOfPlastic:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Intermediate_forms_of_plastic_weight____export__WFL1/FeatureServer/0/query',
      finalManufacturedPlasticGoods:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Final_manufactured_plastics_goods_weight____export__WFL1/FeatureServer/0/query',
      plasticWaste:
        'https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Plastic_waste_weigth____export__WFL1/FeatureServer/0/query',
    },
  }

  const fetchCategoryData = async (url, country) => {
    const query = `?where=Country='${country}'&outFields=Year,Value&orderByFields=Year DESC&f=json&resultRecordCount=1`
    const { data } = await axios.get(`${url}${query}`)
    return data.features.length > 0 ? data.features[0].attributes.Value : 0
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = layerUrls[chartType]
        const results = await Promise.all(
          Object.values(urls).map((url) => fetchCategoryData(url, country))
        )
        setData(results)
      } catch (error) {
        console.error('Error fetching data from ArcGIS:', error)
      }
    }

    if (country) {
      fetchData()
    }
  }, [country, chartType])

  const generatePieData = (data) => {
    const total = data.reduce((sum, value) => sum + value, 0)
    return categories.map((category, index) => ({
      name: category,
      value: data[index],
      percentage: ((data[index] / total) * 100).toFixed(2),
    }))
  }

  const pieData = generatePieData(data)

  const getPieOption = () => {
    return {
        title: {
            text: `Plastic ${chartType === 'import' ? 'Import' : 'Export'} Distribution (tonnes) for ${country}`,
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            top: '40px',
            data: categories, // Only display the category names in the legend
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '40%', 
            containLabel: true,
        },
        series: [
            {
                name: chartType === 'import' ? 'Import' : 'Export',
                type: 'pie',
                radius: '50%',
                top: '60px', // Add more space between the chart and legend
                data: pieData.map((item) => ({
                    value: item.value,
                    name: item.name, // Keep full name for tooltip and series label
                })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
};



  return <ReactEcharts option={getPieOption()} style={{ height: '400px', width: '100%' }} />
}

export default PlasticImportExportPieCharts
