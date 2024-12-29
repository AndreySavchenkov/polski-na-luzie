import { Skeleton } from "../../Skeleton";

export const TranslationExerciseSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4 max-w-[600px] mx-auto w-full px-3">
      <Skeleton className="h-8 w-48" />

      <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50 w-full">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-28" />
        ))}
      </div>

      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-6 h-6 rounded-full" />
        ))}
      </div>
    </div>
  );
};
