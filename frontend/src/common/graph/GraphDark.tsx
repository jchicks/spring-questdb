import HighchartsReact, {HighchartsReactRefObject} from 'highcharts-react-official';
import * as Highcharts from 'highcharts/highstock';
import darkTheme from './darkTheme';
import {RefAttributes, useEffect, useRef, useState} from "react";
import {SeriesModel} from "../events";

Highcharts.setOptions(darkTheme);


export function DarkChart({series}: SeriesModel) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options = {
    title: {
      text: '  '
    },
    series: [
      {
        name: 'Temperature',
        data: series,
        color: 'rgb(129,122,250)'
      }
    ]
  };

  useEffect(() => {
    if (chartComponentRef.current) {
      const chart = chartComponentRef.current.chart;
      console.log(series);
      chart.series[0].setData(series);
    }
  }, [series]);

  return (
    <div className="border-t border-white/10 pt-11">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
        Down-sampled Graph
      </h2>
      <div style={{ height: '600px' }}
           className="mt-6 w-full whitespace-nowrap text-left">
        <HighchartsReact
          constructorType = { 'stockChart' }
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}/>
      </div>
    </div>
  );
}
