import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";
import {
  numbers,
  tens,
  orderNumbers,
  months,
  days,
  time,
} from "./data/lesson3";
import { memo } from "react";

const Lesson3 = memo(function Lesson3() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">1. Числительные</h2>

      <VocabularyTable title="Основные числительные" items={numbers} />

      <VocabularyTable title="Десятки и сотни" items={tens} />

      <VocabularyTable title="Порядковые числительные" items={orderNumbers} />

      <h2 className="text-2xl font-bold text-center mb-8">2. Даты</h2>

      <VocabularyTable title="Месяцы" items={months} />

      <VocabularyTable title="Дни недели" items={days} />

      <h2 className="text-2xl font-bold text-center mb-8">3. Время</h2>

      <VocabularyTable title="Слово" items={time} />
    </>
  );
});

export default Lesson3;
