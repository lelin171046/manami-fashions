const StatsCard = ({ title, value, icon: Icon, color = "bg-zinc-900", trend }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value ?? "—"}</p>
        {trend && (
          <p className={`text-xs mt-1 ${trend > 0 ? "text-emerald-500" : "text-red-500"}`}>
            {trend > 0 ? "+" : ""}{trend}% from last month
          </p>
        )}
      </div>
      {Icon && (
        <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
      )}
    </div>
  </div>
);

export default StatsCard;
