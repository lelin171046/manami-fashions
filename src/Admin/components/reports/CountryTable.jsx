import { countryFlag, countryName } from "../../../utils/countries.js";

const CountryTable = ({ countries, total }) => {
  if (!countries?.length) return null;

  const max = Math.max(...countries.map((c) => c.count), 1);

  return (
    <div className="space-y-3">
      {countries.map((c, i) => {
        const flag = countryFlag(c.code);
        return (
          <div key={c.code} className="flex items-center gap-3">
            <span className="w-6 text-xs font-semibold text-gray-400">{i + 1}</span>
            {flag ? (
              <img
                src={flag}
                alt={c.code}
                loading="lazy"
                className="w-6 h-4 rounded-sm object-cover ring-1 ring-gray-100"
              />
            ) : (
              <div className="w-6 h-4 rounded-sm bg-gray-100" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {countryName(c.code)}
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-400">{total ? c.percentage : 0}%</span>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">
                    {c.count.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-zinc-900 rounded-full transition-all duration-700"
                  style={{ width: `${(c.count / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountryTable;
