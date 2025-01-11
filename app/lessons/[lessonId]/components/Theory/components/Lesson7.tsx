import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";
import { memo } from "react";
import { destinations, transportNames, transportPhrases } from "./data/lesson7";

const Lesson7 = memo(function Lesson7() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">Словарь</h2>

      <VocabularyTable title="Названия транспорта" items={transportNames} />

      <VocabularyTable title="Места назначения" items={destinations} />

      <VocabularyTable title="Полезные выражения" items={transportPhrases} />

      <h2 className="text-2xl font-bold text-center my-8">Грамматика урока</h2>

      <div className="space-y-8">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            1. Предлоги для указания направления и местоположения
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Do (в, до)</h4>
              <p className="text-gray-300 text-sm">
                Указывает на конечный пункт:
                <br />
                Jadę do Krakowa. – Еду в Краков.
              </p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Na (на)</h4>
              <p className="text-gray-300 text-sm">
                Для действий на поверхности или участия в мероприятии:
                <br />
                Jadę na stację benzynową. – Еду на заправку.
              </p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">W/We (в)</h4>
              <p className="text-gray-300 text-sm">
                Используется для описания местонахождения:
                <br />
                Jestem w autobusie. – Я в автобусе.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            2. Глаголы движения
          </h3>
          <p className="text-gray-300 mb-4">
            Глаголы движения (jechać, iść, lecieć) имеют форму в зависимости от
            способа передвижения:
          </p>
          <div className="space-y-2 text-gray-300">
            <p>Idę do sklepu. – Иду в магазин.</p>
            <p>Jadę autobusem. – Еду на автобусе.</p>
            <p>Lecę samolotem. – Лечу на самолете.</p>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            3. Вопросительные слова
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-gray-300">Где? (Gdzie?)</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-gray-300">Куда? (Dokąd?)</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-gray-300">Откуда? (Skąd?)</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-gray-300">Как долго? (Jak długo?)</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <p className="text-gray-300">Сколько стоит? (Ile kosztuje?)</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            4. Инструментал для транспорта
          </h3>
          <p className="text-gray-300 mb-4">
            Используется, чтобы указать средство передвижения:
          </p>
          <div className="space-y-2 text-gray-300">
            <p>Jadę samochodem. – Еду на машине.</p>
            <p>Lecę samolotem. – Лечу на самолете.</p>
            <p>Idę pieszo. – Иду пешком.</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default Lesson7;
