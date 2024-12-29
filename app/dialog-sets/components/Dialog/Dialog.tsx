import { useEffect, useState } from "react";
import { SentenceBuilder } from "../SentenceBuilder/SentenceBuilder";
import Image from "next/image";
import { DialogT } from "@/types";

type OverlayText = {
  id: string;
  text: string;
  position: { top: string; left: string };
};

type Props = {
  dialog: DialogT;
};

export const Dialog = ({ dialog }: Props) => {
  const [overlayTexts, setOverlayTexts] = useState<OverlayText[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const handleCorrectSentence = (
    dialogId: string,
    text: string,
    position: { top: string; left: string }
  ) => {
    setOverlayTexts((prev) => [...prev, { id: dialogId, text, position }]);
    setCurrentSentenceIndex((prev) => prev + 1);
  };

  useEffect(() => {
    setOverlayTexts([]);
    setCurrentSentenceIndex(0);
  }, [dialog]);

  return (
    <div className="flex flex-col gap-2 items-center justify-center relative pb-4 w-full">
      <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-lg overflow-hidden">
        <Image
          key={dialog.title}
          src={dialog.imagePath}
          alt={`${dialog.title} image`}
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJiEwMS4qLi4uKCkrNjU5RTo0Ki4rPkc3Rj9GPzxPUVNBR0FBQUFBQUH/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJiEwMS4qLi4uKCkrNjU5RTo0Ki4rPkc3Rj9GPzxPUVNBR0FBQUFBQUH/wgARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGgP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//aAAwDAQACAAMAAAAQD//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z"
          className="object-cover rounded-lg"
        />
        {overlayTexts.map((overlay) => (
          <div
            key={overlay.id}
            className="absolute text-white font-bold bg-black bg-opacity-70 rounded p-1 max-w-[170px]"
            style={{
              top: `${overlay.position.top}%`,
              left: `${overlay.position.left}%`,
              fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
            }}
          >
            {overlay.text}
          </div>
        ))}
      </div>
      <div className="w-full flex-1">
        {currentSentenceIndex < dialog.sentences.length && (
          <SentenceBuilder
            key={dialog.sentences[currentSentenceIndex].id}
            dialogId={dialog.sentences[currentSentenceIndex].id}
            text={dialog.sentences[currentSentenceIndex].text}
            onCorrectSentence={(text) =>
              handleCorrectSentence(
                dialog.sentences[currentSentenceIndex].id,
                text,
                {
                  top: dialog.sentences[currentSentenceIndex].top,
                  left: dialog.sentences[currentSentenceIndex].left,
                }
              )
            }
          />
        )}
      </div>
    </div>
  );
};
