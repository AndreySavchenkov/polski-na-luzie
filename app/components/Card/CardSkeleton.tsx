import { Skeleton } from "../Skeleton";

export const CardSkeleton = () => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
};

export const CardsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
