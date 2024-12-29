import Link from "next/link";

type CompletedStateProps = {
  onReset: () => void;
};

export const CompletedState = ({ onReset }: CompletedStateProps) => (
  <div className="flex flex-col items-center gap-6 text-center mt-4 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl max-w-2xl mx-auto w-full">
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-green-500">Поздравляем! 🎉</h2>
      <p className="text-xl text-green-400">
        Вы выучили все слова в этом уроке!
      </p>
    </div>

    <p className="text-gray-400 text-lg">
      Вы можете сбросить прогресс этого урока и начать заново или перейти к
      другим урокам
    </p>

    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <button
        onClick={onReset}
        className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
      >
        Сбросить прогресс
      </button>
      <Link
        href="/words"
        className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
      >
        К списку уроков
      </Link>
    </div>
  </div>
);
