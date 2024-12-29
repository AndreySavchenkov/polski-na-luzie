import { useEffect, useState } from "react";
import { SentenceBuilder } from "../SentenceBuilder";
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

  const handleCorrectSentence = (
    dialogId: string,
    text: string,
    position: { top: string; left: string }
  ) => {
    setOverlayTexts((prev) => [...prev, { id: dialogId, text, position }]);
  };

  useEffect(() => {
    setOverlayTexts([]);
  }, [dialog]);

  return (
    <div className="flex flex-col  gap-4 items-center justify-center relative pb-4 w-full">
      <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-lg overflow-hidden">
        <Image
          key={dialog.title}
          src={dialog.imagePath}
          alt={`${dialog.title} image`}
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
          className="object-cover rounded-lg"
        />
        {overlayTexts.map((overlay) => (
          <div
            key={overlay.id}
            className="absolute text-white font-bold bg-black bg-opacity-70 rounded p-1 max-w-[170px]"
            style={{
              top: `${overlay.position.top}%`,
              left: `${overlay.position.left}%`,
              fontSize: "clamp(0.8rem, 2vw, 1.2rem)", // Адаптивный размер шрифта
            }}
          >
            {overlay.text}
          </div>
        ))}
      </div>
      <div className="w-full flex-1">
        {dialog.sentences.map((sentence) => (
          <SentenceBuilder
            key={sentence.id}
            dialogId={sentence.id}
            text={sentence.text}
            onCorrectSentence={(text) =>
              handleCorrectSentence(sentence.id, text, {
                top: sentence.top,
                left: sentence.left,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
