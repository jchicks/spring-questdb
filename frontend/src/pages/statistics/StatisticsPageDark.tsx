

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

function Header() {
  return (
    <header>
      <SummaryHeader/>
      <StatisticsSummary/>
    </header>
  );
}

export function StatisticsPageDark() {
  return (
    <>
      <header>
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
      </header>
    </>
  )
}