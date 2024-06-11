import "flatpickr/dist/themes/dark.css";

import Flatpickr from "react-flatpickr";
import {useEffect, useRef, useState} from "react";
import {DarkChart} from "../../common/graph/GraphDark";
import {GraphArgs} from "../../model/GraphArgs";
import {GraphModel, HandleChange} from "../../common/events";
import {PlotService} from "../../service/PlotService";

function SummaryHeader() {
  return (
    <div
      className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
      <div>
        <div className="flex items-center gap-x-3">
          <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
            <div className="h-2 w-2 rounded-full bg-current"></div>
          </div>
          <h1 className="flex gap-x-3 text-base leading-7">
            <span className="font-semibold text-white">Graphs</span>
            <span className="text-gray-600">/</span>
            <span className="font-semibold text-white">Down Sample</span>
          </h1>
        </div>
        <p className="mt-2 text-xs leading-6 text-gray-400">Example of Down sampling</p>
      </div>
      <div
        className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
        Quest Db
      </div>
    </div>
  );
}

function StatisticsSummary() {
  return (
    <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
      <div className="border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm font-medium leading-6 text-gray-400">Number of deploys</p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-4xl font-semibold tracking-tight text-white">405</span>
        </p>
      </div>
      <div className="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
        <p className="text-sm font-medium leading-6 text-gray-400">Average deploy time</p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-4xl font-semibold tracking-tight text-white">3.65</span>
          <span className="text-sm text-gray-400">mins</span>
        </p>
      </div>
      <div className="border-t border-white/5 px-4 py-6 sm:px-6 lg:border-l lg:px-8">
        <p className="text-sm font-medium leading-6 text-gray-400">Number of servers</p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-4xl font-semibold tracking-tight text-white">3</span>
        </p>
      </div>
      <div className="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
        <p className="text-sm font-medium leading-6 text-gray-400">Success rate</p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-4xl font-semibold tracking-tight text-white">98.5%</span>
        </p>
      </div>
    </div>
  );
}

function GraphControls({onChange, graph}: HandleChange & GraphModel) {
  return (
    <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-8">
      <div className="sm:col-span-2 sm:col-start-1 p-4">
        <label htmlFor="city" className="text-sm font-medium leading-6 text-gray-400">Start</label>
        <div className="mt-2">
          <Flatpickr
            className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
            data-enable-time
            value={graph.start}
            onChange={([date]) => {
              graph.start = date;
              onChange(graph);
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-2 p-4">
        <label htmlFor="region" className="text-sm font-medium leading-6 text-gray-400">End</label>
        <div className="mt-2">
          <Flatpickr
            className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
            data-enable-time
            value={graph.end}
            onChange={([date]) => {
              graph.end = date;
              onChange(graph);
            }}
          />
        </div>
      </div>

      <div className="sm:col-span-2 p-4">
        <label htmlFor="threshold" className="text-sm font-medium leading-6 text-gray-400">Number of Points</label>
        <div className="mt-2">
          <input type="number"
                 defaultValue={1000}
                 onChange={(inputRef) => {
                   // console.log("ref", inputRef);
                   graph.threshHold = Number(inputRef.target.value);
                   onChange(graph);
                 }}
                 name="threshold"
                 id="threshold"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div className="sm:col-span-2 p-4">
        <label htmlFor="threshold" className="text-sm font-medium leading-6 text-gray-400">
          &nbsp;
        </label>
        <div className="mt-2">
          <button
            type="submit"
            className="flex
                       w-full
                       justify-center
                       rounded-md
                       bg-indigo-600
                       px-3
                       py-1.5
                       text-sm
                       font-semibold
                       leading-6
                       text-white
                       shadow-sm
                       hover:bg-indigo-500
                       focus-visible:outline
                       focus-visible:outline-2
                       focus-visible:outline-offset-2
                       focus-visible:outline-indigo-600">
            Plot
          </button>
        </div>
      </div>
    </div>
  );
}

export function StatisticsPageDark() {

  const [graphArgs, setGraphArgs] = useState<GraphArgs>(new GraphArgs());
  const [series, setSeries] = useState<[Date,number][]>([]);

  useEffect(() => {

    const {start, end, threshHold} = graphArgs;

    PlotService
      .fetch(start, end, threshHold)
      .then(newSeries => {
        console.log(newSeries);
        setSeries(newSeries);
      })
  }, []);

  function handleChange({start, end, threshHold}: GraphArgs) {
    PlotService
      .fetch(start, end, threshHold)
      .then(newSeries => {
        console.log(newSeries);
        setSeries(newSeries);
      });
  }

  return (
    <>
      <header>
        <SummaryHeader/>
        <StatisticsSummary/>
        <GraphControls
          graph={graphArgs}
          onChange={(graphArgs) => handleChange(graphArgs)}/>
      </header>
      <DarkChart series={series}/>
    </>
  )
}