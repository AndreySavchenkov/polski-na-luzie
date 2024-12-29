import { Skeleton } from "../../Skeleton";

export const TranslationExerciseSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-2 py-4">
      <Skeleton className="w-full max-w-md h-20 rounded-xl" />

      <div className="grid grid-cols-2 gap-4 w-full">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[100px] rounded-xl" />
        ))}
      </div>

      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-4 h-4 rounded-full" />
        ))}
      </div>
    </div>
  );
};
