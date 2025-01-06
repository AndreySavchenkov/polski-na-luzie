import Link from "next/link";

interface CardProps {
  href: string;
  title: string;
  onClick?: () => void;
  totalWords?: number;
  learnedWords?: number;
  isLesson?: boolean;
}

export const Card = ({
  href,
  title,
  onClick,
  totalWords,
  learnedWords,
  isLesson,
}: CardProps) => {
  const getBackgroundColor = () => {
    if (!href) return "bg-gray-800/20 cursor-not-allowed";
    if (!totalWords || !learnedWords)
      return "bg-gray-800/50 hover:bg-gray-700/50";
    if (learnedWords === totalWords) return "bg-green-700 hover:bg-green-800";
    if (learnedWords > 0) return "bg-amber-700 hover:bg-amber-800";
    return "bg-gray-800/50 hover:bg-gray-700/50";
  };

  return (
    <div className={`relative ${!href ? "group" : ""} h-full`}>
      <Link
        href={href || "#"}
        onClick={onClick}
        className={`block p-6 ${getBackgroundColor()} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700 h-full flex flex-col`}
      >
        <div className="flex flex-col justify-between h-full gap-2">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
            <svg
              className="w-6 h-6 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          {totalWords !== undefined && (
            <div className="text-sm text-gray-400 mt-auto">
              Изучено: {learnedWords || 0} из {totalWords}{" "}
              {isLesson ? "предложений" : "слов"}
            </div>
          )}
        </div>
      </Link>
      {!href && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 rounded-lg">
          <p className="text-white text-center px-4">
            Пройдите предыдущий урок, чтобы открыть этот
          </p>
        </div>
      )}
    </div>
  );
};
