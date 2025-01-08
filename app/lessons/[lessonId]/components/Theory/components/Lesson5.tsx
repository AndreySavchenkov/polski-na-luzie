import { memo } from "react";

const Lesson5 = memo(function Lesson5() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">
        1. Грамматика: прилагательные
      </h2>

      <p className="text-gray-300 mb-8">
        Прилагательные в польском языке согласуются с существительными по роду,
        числу и падежу.
      </p>

      <div className="space-y-8">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            Окончания прилагательных в именительном падеже (Mianownik)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Мужской род</h4>
              <p className="text-gray-300">
                Окончание: -y / -i
                <br />
                Примеры: piękny dom, dobry pies
              </p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-pink-400 mb-2">Женский род</h4>
              <p className="text-gray-300">
                Окончание: -a
                <br />
                Пример: piękna kobieta
              </p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-400 mb-2">Средний род</h4>
              <p className="text-gray-300">
                Окончание: -e
                <br />
                Пример: małe dziecko
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8">
          2. Описание людей
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            Прилагательные для описания внешности и характера
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Внешность:</h4>
              <div className="space-y-2 text-gray-300">
                <p>wysoki, niski (высокий, низкий)</p>
                <p>gruby, szczupły (полный, стройный)</p>
                <p>piękny, brzydki (красивый, некрасивый)</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-3">Характер:</h4>
              <div className="space-y-2 text-gray-300">
                <p>miły, niegrzeczny (милый, грубый)</p>
                <p>inteligentny, głupi (умный, глупый)</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8">
          3. Описание предметов
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Размер</h4>
              <p className="text-gray-300">duży, mały (большой, маленький)</p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Состояние</h4>
              <p className="text-gray-300">nowy, stary (новый, старый)</p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Качество</h4>
              <p className="text-gray-300">dobry, zły (хороший, плохой)</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8">
          4. Описание погоды
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Состояние</h4>
              <p className="text-gray-300">słonecznie, pochmurno</p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Осадки</h4>
              <p className="text-gray-300">pada deszcz, śnieg</p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Температура</h4>
              <p className="text-gray-300">ciepło, zimno</p>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Ветер</h4>
              <p className="text-gray-300">wieje wiatr</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            5. Сравнительная степень прилагательных (stopień wyższy)
          </h3>

          <p className="text-gray-300 mb-4">
            Для сравнения характеристик используется сравнительная степень.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Образование:</h4>
              <p className="text-gray-300">
                К основе прилагательного добавляется суффикс -sz или -ejsz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">
                  Регулярные формы:
                </h4>
                <div className="space-y-2 text-gray-300">
                  <p>duży → większy (большой → больше)</p>
                  <p>mały → mniejszy (маленький → меньше)</p>
                </div>
              </div>

              <div className="bg-gray-900/30 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Исключения:</h4>
                <div className="space-y-2 text-gray-300">
                  <p>dobry → lepszy (хороший → лучше)</p>
                  <p>zły → gorszy (плохой → хуже)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            6. Превосходная степень прилагательных (stopień najwyższy)
          </h3>

          <p className="text-gray-300 mb-4">
            Для обозначения наивысшей степени качества используется превосходная
            степень.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Образование:</h4>
              <p className="text-gray-300">
                К форме сравнительной степени добавляется приставка naj-
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Примеры:</h4>
                <div className="space-y-2 text-gray-300">
                  <p>dobry → najlepszy (самый лучший)</p>
                  <p>duży → największy (самый большой)</p>
                </div>
              </div>

              <div className="bg-gray-900/30 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Использование:</h4>
                <div className="space-y-2 text-gray-300">
                  <p>To jest największy dom w mieście</p>
                  <p>(Это самый большой дом в городе)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            7. Наречия для описания погоды и состояний
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Погода:</h4>
              <div className="space-y-2 text-gray-300">
                <p>słonecznie [swɔˈnɛt͡ʂɲɛ] - солнечно</p>
                <p>pochmurno [pɔxˈmur.nɔ] - облачно</p>
              </div>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Температура:</h4>
              <div className="space-y-2 text-gray-300">
                <p>zimno [ˈʑim.nɔ] - холодно</p>
                <p>ciepło [ˈt͡ɕɛ.pwɔ] - тепло</p>
              </div>
            </div>

            <div className="bg-gray-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Примеры:</h4>
              <div className="space-y-2 text-gray-300">
                <p>Jest bardzo ciepło i słonecznie</p>
                <p>(Очень тепло и солнечно)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Lesson5;
