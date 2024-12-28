import Link from "next/link";

interface CardProps {
  href: string;
  title: string;
  onClick?: () => void;
}

export const Card = ({ href, title, onClick }: CardProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700 hover:border-blue-500"
    >
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
    </Link>
  );
};