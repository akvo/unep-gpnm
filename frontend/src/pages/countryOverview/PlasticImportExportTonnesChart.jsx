import React from 'react'
import ReactEcharts from 'echarts-for-react'

const PlasticImportExportTonnesChart = () => {
  const importData = [4000, 20000, 17000, 0, 0]
  const exportData = [1000, 1000, 2000, 4000, 0]
  const categories = [
    'Plastic in primary forms',
    'Intermediate forms of plastic',
    'Final manufactured plastic goods',
    'Intermediate manufactured plastic goods',
    'Plastic waste',
  ]

  const getOption = () => {
    return {
      title: {
        text: 'Plastic Import & Export (tonnes)',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Import', 'Export'],
        bottom: 0,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: categories,
      },
      series: [
        {
          name: 'Import',
          type: 'bar',
          data: importData,
          itemStyle: {
            color: 'green',
          },
        },
        {
          name: 'Export',
          type: 'bar',
          data: exportData,
          itemStyle: {
            color: 'blue',
          },
        },
      ],
    }
  }

  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: '400px', width: '500px' }}
    />
  )
}

export default PlasticImportExportTonnesChart
