const RANGES = [
  { key: "today", label: "Today" },
  { key: "7d", label: "Last 7 Days" },
  { key: "30d", label: "Last 30 Days" },
  { key: "year", label: "This Year" },
  { key: "custom", label: "Custom" },
];

const FilterBar = ({ range, onRangeChange, from, to, onFromChange, onToChange }) => {
  const toDay = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
        {RANGES.map((r) => (
          <button
            key={r.key}
            onClick={() => onRangeChange(r.key)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              range === r.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {range === "custom" && (
        <div className="flex items-center gap-2 text-xs">
          <input
            type="date"
            value={from}
            max={to || toDay}
            onChange={(e) => onFromChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 outline-none focus:border-gray-400"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={to}
            min={from}
            max={toDay}
            onChange={(e) => onToChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 outline-none focus:border-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default FilterBar;
