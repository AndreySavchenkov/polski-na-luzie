import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";
import {
  greetings,
  farewells,
  acquaintance,
  polite,
  questions,
  answers,
} from "./data/lesson1";
import { memo } from "react";

const Lesson1 = memo(function Lesson1() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">
        1. Приветствия и прощания
      </h2>

      <p className="text-gray-300 mb-8">
        Польский язык богат формами приветствий и прощаний, которые зависят от
        времени суток, степени формальности и контекста.
      </p>

      <div className="space-y-6">
        <VocabularyTable title="Приветствия" items={greetings} />

        <VocabularyTable title="Прощания" items={farewells} />
      </div>

      <h2 className="text-2xl font-bold text-center mb-8">
        2. Фразы для знакомства
      </h2>

      <p className="text-gray-300 mb-8">
        Важные слова и выражения для представления себя и начала разговора.
      </p>

      <VocabularyTable title="Фраза" items={acquaintance} />

      <h2 className="text-2xl font-bold text-center mb-8">
        3. Вежливые выражения
      </h2>

      <p className="text-gray-300 mb-8">
        Для поддержания вежливого тона в общении.
      </p>

      <VocabularyTable title="Фраза" items={polite} />

      <h2 className="text-2xl font-bold text-center mb-8">
        4. Как спросить и ответить Как дела
      </h2>

      <VocabularyTable title="Вопрос" items={questions} />

      <VocabularyTable title="Отет" items={answers} />
    </>
  );
});

export default Lesson1;
