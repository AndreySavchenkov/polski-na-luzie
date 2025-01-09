import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";
import { memo } from "react";
import {
  daysOfWeek,
  timePhrases,
  timeQuestions,
  timesOfDay,
} from "./data/lesson6";

const Lesson6 = memo(function Lesson6() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">
        1. Время и дни недели
      </h2>

      <div className="space-y-8">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            Части суток и временные периоды
          </h3>
          <VocabularyTable title="Части суток" items={timesOfDay} />
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            Дни недели
          </h3>
          <VocabularyTable title="Дни недели" items={daysOfWeek} />
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            Обозначение времени
          </h3>
          <p className="text-gray-300 mb-6">
            Для обозначения времени в польском языке используют формат часов и
            минут. Например: Jest godzina ósma dwadzieścia pięć. – Сейчас 8:25.
          </p>
          <VocabularyTable
            title="Ключевые фразы о времени"
            items={timePhrases}
          />
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            Как спросить время
          </h3>
          <VocabularyTable title="Вопросы о времени" items={timeQuestions} />
        </div>
      </div>
    </>
  );
});

export default Lesson6;
