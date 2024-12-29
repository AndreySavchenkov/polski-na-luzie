import { Skeleton } from "@/app/components/Skeleton";

export const DialogSetSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-[calc(100vh-56px)]">
      <div className="flex flex-col items-center space-y-2 w-full">
        <div className="flex gap-4 min-w-[350px] justify-between items-center mt-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>

        <div className="relative w-full max-w-[800px] aspect-[4/3] mt-4">
          <Skeleton className="w-full h-full rounded-lg" />

          <div className="absolute inset-0 p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute flex items-center gap-2">
                <Skeleton className="w-32 h-12" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[600px] px-3 mt-4">
          <div className="flex items-center mb-2">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-20" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 pb-4 mt-auto">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-3 h-3 rounded-full" />
        ))}
      </div>
    </div>
  );
};
