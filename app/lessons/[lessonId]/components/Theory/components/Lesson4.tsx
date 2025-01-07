import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";
import { memo } from "react";
import { foodItems, shoppingPhrases, stores } from "./data/lesson4";

const Lesson4 = memo(function Lesson2() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">1. Лексика</h2>

      <VocabularyTable
        title="Часто используемые слова и выражения"
        items={foodItems}
      />

      <VocabularyTable title="Названия магазинов" items={stores} />

      <VocabularyTable title="Фразы для покупок" items={shoppingPhrases} />

      <h2 className="text-2xl font-bold text-center mb-8">2. Грамматика</h2>

      <div className="space-y-8">
        {/* Род существительных */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            1. Род существительных (męski, żeński, nijaki)
          </h3>
          <p className="text-gray-300 mb-4">
            В польском языке, как и в русском, существительные имеют род. Знание
            рода помогает правильно согласовывать прилагательные и использовать
            числительные.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">
                Мужской род (męski)
              </h4>
              <p className="text-gray-300">Примеры: chleb (хлеб), ser (сыр)</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-pink-400 mb-2">
                Женский род (żeński)
              </h4>
              <p className="text-gray-300">
                Примеры: bułka (булочка), kawa (кофе)
              </p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-400 mb-2">
                Средний род (nijaki)
              </h4>
              <p className="text-gray-300">
                Примеры: mleko (молоко), masło (масло)
              </p>
            </div>
          </div>
        </div>

        {/* Склонение прилагательных */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            2. Склонение прилагательных в винительном падеже
          </h3>
          <p className="text-gray-300 mb-4">
            Когда вы просите что-то в магазине, объект запроса чаще всего будет
            стоять в винительном падеже (biernik).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">
                Мужской одушевленный
              </div>
              <div className="font-medium text-white mb-1">Окончание: -ego</div>
              <div className="text-gray-300 text-sm">
                Poproszę świeżego łososia
              </div>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">
                Мужской неодушевленный
              </div>
              <div className="font-medium text-white mb-1">
                Окончание: -y/-i
              </div>
              <div className="text-gray-300 text-sm">Poproszę świeży chleb</div>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Женский</div>
              <div className="font-medium text-white mb-1">Окончание: -ą</div>
              <div className="text-gray-300 text-sm">Poproszę świeżą kawę</div>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Средний</div>
              <div className="font-medium text-white mb-1">Окончание: -e</div>
              <div className="text-gray-300 text-sm">Poproszę świeże mleko</div>
            </div>
          </div>
        </div>

        {/* Числительные */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            3. Числительные и исчисляемые/неисчисляемые существительные
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">
                Исчисляемые существительные:
              </h4>
              <div className="space-y-2 text-gray-300">
                <p>Dwa jabłka (Два яблока)</p>
                <p>Pięć bananów (Пять бананов)</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">
                Неисчисляемые существительные:
              </h4>
              <div className="space-y-2 text-gray-300">
                <p>Trochę masła (Немного масла)</p>
                <p>Kilogram cukru (Килограмм сахара)</p>
                <p>Butelka wody (Бутылка воды)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Полезные конструкции */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            4. Полезные конструкции
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">
                Poproszę... (Пожалуйста...)
              </h4>
              <p className="text-gray-300 text-sm">
                Poproszę kilogram ziemniaków
              </p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">
                Czy macie...? (У вас есть...?)
              </h4>
              <p className="text-gray-300 text-sm">Czy macie świeżе warzywa?</p>
            </div>
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">
                Ile kosztuje...? (Сколько стоит...?)
              </h4>
              <p className="text-gray-300 text-sm">Ile kosztuje ten ser?</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Lesson4;
