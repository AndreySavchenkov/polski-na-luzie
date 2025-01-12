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
      <div className="flex flex-col sm:flex-row items-center gap-4 min-h-[96px]">
        {word.imageUrl ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={word.imageUrl}
              alt={word.polish}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="w-24 flex-shrink-0 hidden sm:block" />
        )}
        <div className="flex flex-col items-center sm:items-end flex-grow justify-center">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <span className="text-2xl sm:text-3xl font-bold text-gray-100 text-center sm:text-right break-words">
              {word.polish}
            </span>
            <SpeakerLoudIcon className="w-6 h-6 text-gray-400 hover:text-gray-300 active:scale-90 transition-transform" />
          </div>
          {word.pronunciation && (
            <span className="text-sm text-gray-400 mt-1 font-noto text-center sm:text-right">
              {word.pronunciation}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
