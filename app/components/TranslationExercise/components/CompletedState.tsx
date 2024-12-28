import Link from "next/link";

export const CompletedState = () => (
  <div className="flex flex-col items-center gap-4 text-center mt-4">
    <h2 className="text-2xl font-bold text-green-500">
      Поздравляем! Вы выучили все слова в этом уроке!
    </h2>
    <p className="text-gray-600">
      Вы можете перейти к другим урокам или повторить этот позже
    </p>
    <Link 
      href="/words" 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      К списку уроков
    </Link>
  </div>
);