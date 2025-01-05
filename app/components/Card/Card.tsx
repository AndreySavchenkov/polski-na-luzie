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
    if (!totalWords || !learnedWords)
      return "bg-gray-800/50 hover:bg-gray-700/50";
    if (learnedWords === totalWords) return "bg-green-700 hover:bg-green-800";
    if (learnedWords > 0) return "bg-amber-700 hover:bg-amber-800";
    return "bg-gray-800/50 hover:bg-gray-700/50";
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block p-6 ${getBackgroundColor()} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700 `}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
          <svg
            className="w-6 h-6 text-gray-400"
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
          <div className="text-sm text-gray-400">
            Изучено: {learnedWords || 0} из {totalWords} {isLesson ? "предложений" : "слов"}
          </div>
        )}
      </div>
    </Link>
  );
};
