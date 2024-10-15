import React from 'react';
import ReactEcharts from 'echarts-for-react';

const MSWGenerationChart = () => {
  const getOption = () => {
    return {
      title: {
        text: 'Per capita MSW generation (kg/person/day)',
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
        data: ['National estimate', 'Dakar estimate'],
        axisLabel: {
          formatter: function (value) {
            return value === 'National estimate' ? '2020' : '2022';
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
          data: [182],
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
          data: [354],
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
    };
  };

  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: '400px', width: '100%' }}
    />
  );
};

export default MSWGenerationChart;
