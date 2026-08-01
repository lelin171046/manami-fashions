const ReportSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 h-80" />
      <div className="bg-white rounded-xl border border-gray-100 p-5 h-80" />
    </div>
    <div className="bg-white rounded-xl border border-gray-100 p-5 h-72" />
  </div>
);

export default ReportSkeleton;
