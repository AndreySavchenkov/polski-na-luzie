import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";
import { family, adjectives, phrases, possessive } from "./data/lesson2";
import { memo } from "react";

const Lesson2 = memo(function Lesson2() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">
        1. Слова, связанные с семьёй
      </h2>

      <p className="text-gray-300 mb-8">
        Основные слова, которые описывают семью и её членов:
      </p>

      <VocabularyTable title="Семья" items={family} />

      <h2 className="text-2xl font-bold text-center mb-8">
        2. Прилагательные для описания членов семьи
      </h2>

      <VocabularyTable title="Прилагательные" items={adjectives} />

      <h2 className="text-2xl font-bold text-center mb-8">
        3. Личная информация: основные фразы
      </h2>

      <p className="text-gray-300 mb-8">
        Эти фразы помогут рассказать о себе или задать вопросы другому человеку:
      </p>

      <VocabularyTable title="Фразы" items={phrases} />

      <h2 className="text-2xl font-bold text-center mb-8">
        4. Притяжательные местоимения для семьи
      </h2>

      <VocabularyTable title="Местоимения" items={possessive} />
    </>
  );
});

export default Lesson2;
