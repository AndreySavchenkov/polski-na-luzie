import { Word } from "@/types";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";
import Image from "next/image";

type WordDisplayProps = {
  word: Word;
  onSpeak: () => void;
};

export const WordDisplay = ({ word, onSpeak }: WordDisplayProps) => {
  return (
    <div
      onClick={onSpeak}
      className="flex flex-col w-full max-w-md mx-auto p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 cursor-pointer active:scale-90 transition-all"
    >
      <div className="flex items-center gap-4 min-h-[96px]">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          {word.imageUrl ? (
            <Image
              src={word.imageUrl}
              alt={word.polish}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full bg-gray-700/50 rounded-lg" />
          )}
        </div>
        <div className="flex flex-col items-end flex-grow min-w-0">
          <div className="flex items-center gap-3 w-full justify-end">
            <span className="text-2xl sm:text-3xl font-bold text-gray-100 text-right break-words">
              {word.polish}
            </span>
            <SpeakerLoudIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 active:scale-90 transition-transform flex-shrink-0" />
          </div>
          {word.pronunciation && (
            <span className="text-sm text-gray-400 mt-1 font-noto text-right">
              {word.pronunciation}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
