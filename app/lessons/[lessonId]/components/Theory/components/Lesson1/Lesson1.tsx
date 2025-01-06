import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";

const greetings = [
  {
    polish: "Cześć",
    pronunciation: "/t͡ʂɛɕt͡ɕ/",
    translation: "Привет",
    context: "Неформальное",
  },
  {
    polish: "Dzień dobry",
    pronunciation: "/dʑɛɲ ˈdɔ.brɨ/",
    translation: "Добрый день",
    context: "Формальное",
  },
  {
    polish: "Dobry wieczór",
    pronunciation: "/ˈdɔ.brɨ ˈvʲɛ.t͡ʂur/",
    translation: "Добрый вечер",
    context: "Формальное, вечер",
  },
  {
    polish: "Witam",
    pronunciation: "/ˈvitam/",
    translation: "Приветствую",
    context: "Универсальное, нейтральное",
  },
  {
    polish: "Hej",
    pronunciation: "/hɛj/",
    translation: "Привет",
    context: "Очень неформальное",
  },
  {
    polish: "Siema",
    pronunciation: "/ˈɕɛ.ma/",
    translation: "Привет",
    context: "Сленговое, среди молодежи",
  },
];

const farewells = [
  {
    polish: "Do widzenia",
    pronunciation: "/du vɨdˈzɛɲa/",
    translation: "До свидания",
    context: "Формальное",
  },
  {
    polish: "Do zobaczenia",
    pronunciation: "/du zɔ.baˈt͡ʂɛ.nja/",
    translation: "До встречи",
    context: "Нейтральное",
  },
  {
    polish: "Cześć",
    pronunciation: "/t͡ʂɛɕt͡ɕ/",
    translation: "Пока",
    context: "Неформальное",
  },
  {
    polish: "Na razie",
    pronunciation: "/nɑ ˈra.ʑɛ/",
    translation: "Пока",
    context: "Неформальное",
  },
  {
    polish: "Pa",
    pronunciation: "/pɑː/",
    translation: "Пока",
    context: "Очень неформальное",
  },
];

const acquaintance = [
  {
    polish: "Jak się nazywasz?",
    pronunciation: "/jak ɕɛ ˈnazɨvaʂ/",
    translation: "Как тебя зовут?",
  },
  {
    polish: "Nazywam się…",
    pronunciation: "/ˈnazɨ.vam ɕɛ/",
    translation: "Меня зовут…",
  },
  {
    polish: "Jak masz na imię?",
    pronunciation: "/jak maʃ na ˈi.mʲɛ/",
    translation: "Как твоё имя?",
  },
  {
    polish: "Mam na imię…",
    pronunciation: "/mam na ˈimʲɛ/",
    translation: "Моё имя…",
  },
  {
    polish: "Skąd jesteś?",
    pronunciation: "/skɔnd ˈjɛs.tɛʃ/",
    translation: "Откуда ты?",
  },
  {
    polish: "Jestem z Białorusi",
    pronunciation: "jɛstɛm z bʲawɔruɕi",
    translation: "Я из Беларуси",
  },
];

const polite = [
  {
    polish: "Proszę",
    pronunciation: "/prɔʂɛ̃w̃/",
    translation: "Пожалуйста",
  },
  {
    polish: "Dziękuję",
    pronunciation: "/ˈd͡ʑʲɛŋkujɛ̃w̃/",
    translation: "Спасибо",
  },
  {
    polish: "Przepraszam",
    pronunciation: "/pʂɛpraʂam/",
    translation: "Извините",
  },
  {
    polish: "Nie ma sprawy",
    pronunciation: "/ɲɛ ma spravɨ/",
    translation: "Ничего страшного",
  },
  {
    polish: "Tak",
    pronunciation: "/tak/",
    translation: "Да",
  },
  {
    polish: "Nie",
    pronunciation: "/ɲɛ/",
    translation: "Нет",
  },
];

const questions = [
  {
    polish: "Jak się masz?",
    pronunciation: "/ˈjak ɕɛ̃w̃ maʂ?/",
    translation: "Как у тебя дела?",
  },
  {
    polish: "Jak się Pan/Pani ma?",
    pronunciation: "/jak ɕɛ̃w̃ pan/paɲi ma?/",
    translation: "Как у Вас дела? (вежливо)",
  },
];

const answers = [
  {
    polish: "Świetnie",
    pronunciation: "/ɕfʲɛtɲɛ/",
    translation: "Отлично",
  },
  {
    polish: "Dobrze",
    pronunciation: "/dɔbʐɛ/",
    translation: "Хорошо",
  },
  {
    polish: "Tak sobie",
    pronunciation: "/tak sɔbʲɛ/",
    translation: "Так себе",
  },
  {
    polish: "Źle",
    pronunciation: "/ʑlɛ/",
    translation: "Плохо",
  },
];

export default function Lesson1() {
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
}
