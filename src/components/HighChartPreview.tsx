import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import 'highcharts/highcharts-more';

const options: Highcharts.Options = {
  chart: {
    height: 500,
    type: 'line',
    zooming: { type: 'xy' },
    backgroundColor: 'transparent',
  },
  title: { text: '' },
  credits: { enabled: false },
  legend: { enabled: false },
  xAxis: {
    type: 'datetime',
    title: { text: 'Year' },
  },
  yAxis: {
    title: { text: 'GBP' },
    softMin: 0,
  },
  tooltip: {
    shared: true,
    xDateFormat: '%Y',
  },
  plotOptions: {
    series: { marker: { enabled: false } },
    arearange: { lineWidth: 0, enableMouseTracking: true },
  },
  series: [
    {
      name: 'Median',
      zIndex: 9,
      type: 'line',
      color: 'rgba(0,0,255,0.9)',
      data: [
        [1704067200000, 110], [1735689600000, 120], [1767225600000, 115],
        [1798761600000, 130], [1830297600000, 125],
      ],
      tooltip: { pointFormat: 'Median: {point.y:,.2f}<br/>' },
    },
    {
      name: 'Mean',
      zIndex: 10,
      type: 'line',
      color: 'rgba(0,0,0,0.9)',
      data: [
        [1704067200000, 115], [1735689600000, 125], [1767225600000, 120],
        [1798761600000, 135], [1830297600000, 130],
      ],
      tooltip: { pointFormat: 'Mean: {point.y:,.2f}<br/>' },
    },
    {
      name: '1%-99%',
      zIndex: 4,
      type: 'arearange',
      color: 'rgba(0, 0, 255, 0.10)',
      data: [
        [1704067200000, 50, 170], [1735689600000, 60, 180], [1767225600000, 55, 175],
        [1798761600000, 70, 190], [1830297600000, 65, 185],
      ],
      tooltip: { pointFormat: '1%-99%: {point.low:,.2f}–{point.high:,.2f}<br/>' },
    },
    {
      name: '5%-95%',
      zIndex: 6,
      type: 'arearange',
      color: 'rgba(0, 0, 255, 0.20)',
      data: [
        [1704067200000, 70, 150], [1735689600000, 80, 160], [1767225600000, 75, 155],
        [1798761600000, 90, 170], [1830297600000, 85, 165],
      ],
      tooltip: { pointFormat: '5%-95%: {point.low:,.2f}–{point.high:,.2f}<br/>' },
    },
    {
      name: '25%-75%',
      zIndex: 8,
      type: 'arearange',
      color: 'rgba(0, 0, 255, 0.30)',
      data: [
        [1704067200000, 90, 130], [1735689600000, 100, 140], [1767225600000, 95, 135],
        [1798761600000, 110, 150], [1830297600000, 105, 145],
      ],
      tooltip: { pointFormat: '25%-75%: {point.low:,.2f}–{point.high:,.2f}<br/>' },
    },
  ],
};

const HighChartPreview: React.FC = () => {
  return (
    <div className="bg-white p-4 border-gray-200">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighChartPreview;