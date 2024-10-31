import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import { useRouter } from 'next/router'

const MSWGenerationChart = () => {
  const router = useRouter()
  const { country } = router.query
  const [years, setYears] = useState([])
  const [nationalEstimate, setNationalEstimate] = useState([])
  const [dakarEstimate, setDakarEstimate] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const mswNationalUrl = `https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Municipal_solid_waste_generated_daily_per_capita_V3_WFL1/FeatureServer/0/query?where=1=1&outFields=Time_Perio,OBS_Valu_1,ROMNAM&f=json`
      const mswDakarUrl = `https://services3.arcgis.com/pI4ewELlDKS2OpCN/arcgis/rest/services/Municipal_solid_waste_generated_daily_per_capita_V3_WFL1/FeatureServer/0/query?where=1=1&outFields=Time_Perio,OBS_Valu_1,ROMNAM&f=json`

      try {
        const [nationalRes, dakarRes] = await Promise.all([
          axios.get(mswNationalUrl),
          axios.get(mswDakarUrl),
        ])

        const filteredNational = nationalRes.data.features.filter(
          (item) => item.attributes.ROMNAM === country
        )
        const filteredDakar = dakarRes.data.features.filter(
          (item) => item.attributes.ROMNAM === country
        )

        const yearsSet = new Set()
        const nationalValues = []
        const dakarValues = []

        filteredNational.forEach((item) => {
          yearsSet.add(item.attributes.Time_Perio)
          nationalValues.push(item.attributes.OBS_Valu_1)
        })

        filteredDakar.forEach((item) => {
          dakarValues.push(item.attributes.OBS_Valu_1)
        })

        setYears(Array.from(yearsSet))

        console.log('nationalRes', nationalValues)
        setNationalEstimate(nationalValues)
        setDakarEstimate(dakarValues)
      } catch (error) {
        console.error('Error fetching data from ArcGIS:', error)
      }
    }

    fetchData()
  }, [country])

  const getOption = () => {
    return {
      title: {
        text: `Per capita MSW generation (kg/person/day) for ${country}`,
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['National estimate', 'Dakar estimate'],
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: years,
        axisLabel: {
          formatter: function (value) {
            return value === 'National estimate' ? '2020' : '2022'
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Kg per capita annually',
        min: 0,
        max: 400,
        axisLabel: {
          formatter: '{value}kg',
        },
      },
      series: [
        {
          name: 'National estimate',
          type: 'bar',
          barWidth: '50%',
          data: nationalEstimate,
          itemStyle: { color: '#00aaff' },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}kg',
          },
        },
        {
          name: 'Dakar estimate',
          type: 'bar',
          barWidth: '50%',
          data: dakarEstimate,
          itemStyle: { color: '#ff6f00' },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}kg',
          },
        },
        {
          name: 'Regional Average',
          type: 'line',
          markLine: {
            data: [
              {
                yAxis: 192,
                label: {
                  formatter: 'Regional average 192kg',
                  position: 'middle',
                  color: '#000',
                  backgroundColor: '#66bb6a',
                  padding: [5, 10],
                },
                lineStyle: {
                  type: 'dashed',
                  color: '#1e90ff',
                },
              },
            ],
          },
        },
      ],
    }
  }

  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: '400px', width: '100%' }}
    />
  )
}

export default MSWGenerationChart
