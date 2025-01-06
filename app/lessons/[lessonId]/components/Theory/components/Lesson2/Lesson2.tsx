import { VocabularyTable } from "@/app/components/VocabularyTable/VocabularyTable";

const family = [
  {
    polish: "rodzina",
    pronunciation: "rɔˈd͡ʑina",
    translation: "семья",
  },
  {
    polish: "matka",
    pronunciation: "ˈmatka",
    translation: "мать",
  },
  {
    polish: "ojciec",
    pronunciation: "ˈɔjt͡ɕɛt͡s",
    translation: "отец",
  },
  {
    polish: "siostra",
    pronunciation: "ˈɕɔstra",
    translation: "сестра",
  },
  {
    polish: "dziadek",
    pronunciation: "ˈd͡ʑadɛk",
    translation: "дедушка",
  },
  {
    polish: "brat",
    pronunciation: "brat",
    translation: "брат",
  },
  {
    polish: "babcia",
    pronunciation: "ˈbapt͡ɕa",
    translation: "бабушка",
  },
  {
    polish: "wujek",
    pronunciation: "ˈvujɛk",
    translation: "дядя",
  },
  {
    polish: "ciocia",
    pronunciation: "ˈt͡ɕɔt͡ɕa",
    translation: "тётя",
  },
  {
    polish: "kuzyn",
    pronunciation: "ˈkuzɨn",
    translation: "кузен",
  },
  {
    polish: "kuzynka",
    pronunciation: "kuˈzɨnka",
    translation: "кузина",
  },
  {
    polish: "syn",
    pronunciation: "sɨn",
    translation: "сын",
  },
  {
    polish: "córka",
    pronunciation: "ˈt͡surka",
    translation: "дочь",
  },
  {
    polish: "dziecko",
    pronunciation: "ˈd͡ʑɛt͡skɔ",
    translation: "ребёнок",
  },
  {
    polish: "rodzice",
    pronunciation: "rɔˈd͡ʑit͡sɛ",
    translation: "родители",
  },
  {
    polish: "małżeństwo",
    pronunciation: "mauwˈʐɛɲstfɔ",
    translation: "супруги",
  },
  {
    polish: "bliźniaki",
    pronunciation: "bliˈʑɲaki",
    translation: "близнецы",
  },
  {
    polish: "teściowa",
    pronunciation: "tɛɕˈt͡ɕɔva",
    translation: "свекровь, тёща",
  },
  {
    polish: "teść",
    pronunciation: "tɛɕt͡ɕ",
    translation: "свёкр, тесть",
  },
];

const adjectives = [
  {
    polish: "młody",
    pronunciation: "ˈmwɔdɨ",
    translation: "молодый",
  },
  {
    polish: "stary",
    pronunciation: "ˈstarɨ",
    translation: "старый",
  },
  {
    polish: "miły",
    pronunciation: "ˈmiwɨ",
    translation: "милый",
  },
  {
    polish: "surowy",
    pronunciation: "suˈrɔvɨ",
    translation: "строгий",
  },
  {
    polish: "uprzejmy",
    pronunciation: "upˈʐɛjmɨ",
    translation: "вежливый",
  },
  {
    polish: "pracowity",
    pronunciation: "praˈt͡sɔvitɨ",
    translation: "трудолюбивый",
  },
  {
    polish: "leniwy",
    pronunciation: "lɛˈnivɨ",
    translation: "ленивый",
  },
];

const phrases = [
  {
    polish: "Mam na imię...",
    pronunciation: "mam na ˈimʲɛ",
    translation: "Меня зовут...",
  },
  {
    polish: "Nazywam się...",
    pronunciation: "naˈzɨvam ɕɛ",
    translation: "Моё имя...",
  },
  {
    polish: "Jak się nazywasz?",
    pronunciation: "jak ɕɛ naˈzɨvaʂ",
    translation: "Как тебя зовут?",
  },
  {
    polish: "Ile masz lat?",
    pronunciation: "ˈilɛ maʂ lat",
    translation: "Сколько тебе лет?",
  },
  {
    polish: "Mam ___ lat.",
    pronunciation: "mam ___ lat",
    translation: "Мне ___ лет.",
  },
  {
    polish: "Skąd jesteś?",
    pronunciation: "skɔnt ˈjɛstɛɕ",
    translation: "Откуда ты?",
  },
  {
    polish: "Jestem z...",
    pronunciation: "ˈjɛstɛm z...",
    translation: "Я из...",
  },
  {
    polish: "Gdzie mieszkasz?",
    pronunciation: "ˈɡd͡ʑɛ ˈmʲɛʂkaʂ",
    translation: "Где ты живёшь?",
  },
  {
    polish: "Mieszkam w...",
    pronunciation: "ˈmʲɛʂkam v...",
    translation: "Я живу в...",
  },
];

const possessive = [
  {
    polish: "Mój brat",
    pronunciation: "muj ˈbrat",
    translation: "Мой брат",
  },
  {
    polish: "Moja siostra",
    pronunciation: "ˈmɔja ˈɕɔstra",
    translation: "Моя сестра",
  },
  {
    polish: "Moje dziecko",
    pronunciation: "ˈmɔjɛ ˈd͡ʑɛt͡skɔ",
    translation: "Моё ребёнок",
  },
  {
    polish: "Twój ojciec",
    pronunciation: "tfuj ˈɔjt͡ɕɛt͡s",
    translation: "Твой отец",
  },
  {
    polish: "Twoja mama",
    pronunciation: "ˈtfɔja ˈmama",
    translation: "Твоя мама",
  },
  {
    polish: "Twoje imię",
    pronunciation: "ˈtfɔjɛ ˈimʲɛ",
    translation: "Твоё имя",
  },
];

export default function Lesson2() {
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
}
