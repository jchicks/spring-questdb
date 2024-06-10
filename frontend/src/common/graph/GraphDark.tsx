import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import darkTheme from './darkTheme';

// Apply the theme globally
Highcharts.setOptions(darkTheme);

const options = {
  title: {
    text: '  '
  },
  series: [
    {
      name: 'Sample',
      data: [1, 2, 3, 4, 5]
    }
  ]
};

export function DarkChart() {
  return (
    <div className="border-t border-white/10 pt-11">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
        Downsampled Graph
      </h2>
      <div className="mt-6 w-full whitespace-nowrap text-left">
        <HighchartsReact highcharts={Highcharts} options={options}/>
      </div>
    </div>
  );
}
