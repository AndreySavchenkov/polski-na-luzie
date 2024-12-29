export const DialogSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-[400px] bg-gray-700 rounded-lg mb-4" />
      <div className="space-y-3">
        <div className="h-12 bg-gray-700 rounded w-3/4" />
        <div className="h-12 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
};