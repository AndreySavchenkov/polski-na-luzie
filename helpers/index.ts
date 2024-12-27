export const speak = (word: string) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "pl-PL";

  const voices = window.speechSynthesis.getVoices();
  const polishVoices = voices.filter((voice) => voice.lang === "pl-PL");

  const zosiaVoice = polishVoices.find((voice) => voice.name === "Zosia");

  const selectedVoice =
    zosiaVoice ||
    polishVoices.reduce((prev: SpeechSynthesisVoice | undefined, current) => {
      return prev && prev.lang.length > current.lang.length ? prev : current;
    }, undefined);

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};

export const shuffleWordsArray = (array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};