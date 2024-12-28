type ProgressIndicatorProps = {
  currentProgress: number;
};

export const ProgressIndicator = ({
  currentProgress,
}: ProgressIndicatorProps) => {
  return (
    <div className="flex gap-2">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full transition-colors duration-300 ${
            index < currentProgress ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
