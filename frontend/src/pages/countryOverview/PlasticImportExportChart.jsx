import React from 'react'
import ReactEcharts from 'echarts-for-react'

const PlasticImportExportChart = () => {
  const years = ['2017', '2018', '2019', '2020', '2021']
  const totalImports = [100000, 150000, 200000, 250000, 458203]
  const totalExports = [50000, 60000, 75000, 80000, 152029]

  const getOption = () => {
    return {
      title: {
        text: 'Plastic Import & Export (kUSD)',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Total exports (1000$)', 'Total imports (1000$)'],
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
          name: 'Total exports (1000$)',
          type: 'line',
          data: totalExports,
          symbol: 'circle',
          itemStyle: {
            color: 'blue',
          },
        },
        {
          name: 'Total imports (1000$)',
          type: 'line',
          data: totalImports,
          symbol: 'circle',
          itemStyle: {
            color: 'orange',
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

export default PlasticImportExportChart
