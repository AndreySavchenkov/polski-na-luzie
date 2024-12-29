import { Word } from "@/types";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

type WordDisplayProps = {
  word: Word;
  onSpeak: () => void;
};

export const WordDisplay = ({ word, onSpeak }: WordDisplayProps) => {
  return (
    <div
      onClick={onSpeak}
      className="flex gap-3 items-center justify-center w-full max-w-md mx-auto p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 cursor-pointer active:scale-98 transition-all active:scale-90"
    >
      <span className="text-3xl font-bold text-gray-100">{word.polish}</span>
      <SpeakerLoudIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 active:scale-90 transition-transform" />
    </div>
  );
};
