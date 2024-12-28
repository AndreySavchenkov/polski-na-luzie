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
      className="flex gap-2 items-center text-2xl font-bold text-center cursor-pointer"
    >
      {word.polish}
      <SpeakerLoudIcon className="w-4 h-4 active:scale-90 transition-transform" />
    </div>
  );
};
