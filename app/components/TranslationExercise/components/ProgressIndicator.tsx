type ProgressIndicatorProps = {
  currentProgress: number;
};

export const ProgressIndicator = ({
  currentProgress,
}: ProgressIndicatorProps) => {
  return (
    <div className="flex gap-3 p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full transition-all duration-300 transform
          ${
            index < currentProgress
              ? "bg-green-500 scale-110"
              : "bg-gray-600 scale-100"
          }`}
        />
      ))}
    </div>
  );
};
