import { BarChart3 } from "lucide-react";

const EmptyState = ({ title = "No data available", message = "Visitors will appear here once people start browsing your website." }) => (
  <div className="flex flex-col items-center justify-center py-14 text-center">
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
      <BarChart3 size={22} className="text-gray-300" />
    </div>
    <p className="text-sm font-semibold text-gray-700">{title}</p>
    <p className="text-xs text-gray-400 mt-1 max-w-xs">{message}</p>
  </div>
);

export default EmptyState;
