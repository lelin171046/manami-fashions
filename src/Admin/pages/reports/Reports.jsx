import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Users, Calendar, TrendingUp, Globe, MousePointerClick, RefreshCw, AlertTriangle } from "lucide-react";
import api from "../../../api/axios.js";
import FilterBar from "../../components/reports/FilterBar.jsx";
import ChartCard from "../../components/reports/ChartCard.jsx";
import CountryTable from "../../components/reports/CountryTable.jsx";
import ReportSkeleton from "../../components/reports/ReportSkeleton.jsx";
import EmptyState from "../../components/reports/EmptyState.jsx";

const PIE_COLORS = ["#18181b", "#3f3f46", "#71717a", "#a1a1aa", "#d4d4d8", "#52525b", "#27272a", "#8e8e93", "#636366", "#aeaeb2"];

const formatNumber = (n) => (n ?? 0).toLocaleString();

const Reports = () => {
  const [range, setRange] = useState("30d");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const buildParams = () => {
    const params = { range };
    if (range === "custom") {
      if (from) params.from = from;
      if (to) params.to = to;
    }
    return params;
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["analytics", range, from, to],
    queryFn: async () => {
      const res = await api.get("/analytics", { params: buildParams() });
      return res.data.data;
    },
    enabled: range !== "custom" || (Boolean(from) && Boolean(to)),
    refetchOnWindowFocus: false,
  });

  const summary = data?.summary;
  const dailyTraffic = data?.dailyTraffic || [];
  const monthlyTraffic = data?.monthlyTraffic || [];
  const countries = data?.countries || [];
  const totalInRange = summary?.total ?? 0;

  const summaryCards = [
    { title: "Total Visitors", value: formatNumber(summary?.total), icon: Users, color: "bg-zinc-900" },
    { title: "Today", value: formatNumber(summary?.today), icon: Calendar, color: "bg-blue-600" },
    { title: "Last 7 Days", value: formatNumber(summary?.last7), icon: TrendingUp, color: "bg-emerald-600" },
    { title: "This Month", value: formatNumber(summary?.monthly), icon: Calendar, color: "bg-amber-500" },
    { title: "This Year", value: formatNumber(summary?.yearly), icon: Globe, color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Analytics</h1>
          <p className="text-sm text-gray-400 mt-1">Visitor statistics across your public website</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-60"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <FilterBar
        range={range}
        onRangeChange={(r) => setRange(r)}
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
      />

      {range === "custom" && !(from && to) && (
        <p className="text-xs text-amber-600 flex items-center gap-1.5">
          <AlertTriangle size={13} />
          Select both start and end dates to load custom range data.
        </p>
      )}

      {isLoading ? (
        <ReportSkeleton />
      ) : isError ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-3">
            <AlertTriangle size={22} className="text-red-500" />
          </div>
          <p className="text-sm font-semibold text-gray-800">Failed to load analytics</p>
          <p className="text-xs text-gray-400 mt-1 mb-4 max-w-sm">{error?.response?.data?.message || error?.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : totalInRange === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <EmptyState
            title="No visitors yet"
            message="Visitor data for this period will appear here once people browse your website."
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    </div>
                    <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard
              title="Daily Traffic"
              subtitle={data?.period?.label}
              className="lg:col-span-2"
              action={<span className="text-xs text-gray-400 flex items-center gap-1"><MousePointerClick size={13} /> visits</span>}
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyTraffic} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#18181b" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#18181b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: "#a1a1aa" }}
                      tickLine={false}
                      axisLine={{ stroke: "#e4e4e7" }}
                      interval="preserveStartEnd"
                      minTickGap={28}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      cursor={{ stroke: "#d4d4d8" }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e4e4e7",
                        fontSize: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      }}
                      formatter={(value) => [`${value} visits`, "Visitors"]}
                      labelStyle={{ color: "#71717a", fontWeight: 600 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#18181b"
                      strokeWidth={2.5}
                      fill="url(#visits)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#18181b", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Monthly Visitors" subtitle="Last 12 months">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTraffic} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "#a1a1aa" }}
                      tickLine={false}
                      axisLine={{ stroke: "#e4e4e7" }}
                      interval="preserveStartEnd"
                      minTickGap={20}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      cursor={{ fill: "#fafafa" }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e4e4e7",
                        fontSize: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      }}
                      formatter={(value) => [`${value} visits`, "Visitors"]}
                      labelStyle={{ color: "#71717a", fontWeight: 600 }}
                    />
                    <Bar dataKey="count" fill="#18181b" radius={[6, 6, 0, 0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Top Countries" subtitle={`${countries.length} of 10 shown`}>
              {countries.length ? (
                <>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={countries}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={52}
                          outerRadius={82}
                          paddingAngle={2}
                          strokeWidth={0}
                        >
                          {countries.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid #e4e4e7",
                            fontSize: 12,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                          }}
                          formatter={(value, _name, props) => [`${value} visits (${props.payload.percentage}%)`]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-1">
                    {countries.reduce((sum, c) => sum + c.count, 0).toLocaleString()} visits from {countries.length} countries
                  </p>
                </>
              ) : (
                <EmptyState title="No country data" message="Country breakdown will appear once visitors arrive." />
              )}
            </ChartCard>

            <ChartCard title="Country Breakdown" subtitle="Top 10 by visits" className="lg:col-span-2">
              <CountryTable countries={countries} total={totalInRange} />
            </ChartCard>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
