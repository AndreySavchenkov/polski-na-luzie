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
      className="flex flex-col items-center w-full max-w-md mx-auto p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 cursor-pointer active:scale-90 transition-all"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-100">{word.polish}</span>
        <SpeakerLoudIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 active:scale-90 transition-transform" />
      </div>
      {word.pronunciation && (
        <span className="text-sm text-gray-400 mt-1 font-noto">
          {word.pronunciation}
        </span>
      )}
    </div>
  );
};
