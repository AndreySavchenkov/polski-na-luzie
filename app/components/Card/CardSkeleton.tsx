import { Skeleton } from "../Skeleton";

type CardSkeletonProps = { isWordSet?: boolean };
type CardsGridSkeletonProps = { isWordSet?: boolean };

export const CardSkeleton = ({ isWordSet = false }: CardSkeletonProps) => {
  return (
    <div
      className={`${
        isWordSet ? "py-6" : "py-[26px]"
      } px-6 bg-gray-800 rounded-lg shadow-md border border-gray-700`}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-6" />
      </div>
      {isWordSet && (
        <div className="mt-4">
          <Skeleton className="h-4 w-32" />
        </div>
      )}
    </div>
  );
};

export const CardsGridSkeleton = ({
  isWordSet = false,
}: CardsGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(12)].map((_, i) => (
        <CardSkeleton key={i} isWordSet={isWordSet} />
      ))}
    </div>
  );
};
