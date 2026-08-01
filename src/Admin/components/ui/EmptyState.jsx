const EmptyState = ({ icon: Icon, title = "No data", message = "Nothing to show here yet.", action }) => (
  <div className="text-center py-16">
    {Icon && (
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon size={28} className="text-gray-300" />
      </div>
    )}
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-xs text-gray-400 mt-1">{message}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
