import { Briefcase } from "lucide-react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-5">
      <Briefcase size={32} className="text-gray-300" />
    </div>
    <h3 className="text-lg font-semibold text-gray-500 mb-1">No buyers available</h3>
    <p className="text-sm text-gray-400">Buyer list will appear here once added.</p>
  </div>
);

export default EmptyState;