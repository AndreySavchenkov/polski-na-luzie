import { useState } from "react";
import { SentenceBuilder } from "./SentenceBuilder";
import Image from "next/image";
import { DialogT } from "../page";

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

  return (
    <div className="flex md:flex-row flex-col  gap-4 items-center justify-center relative py-6">
      <div className="relative h-[400px] max-w-[400px] w-full">
        <Image
          src={dialog.imageUrl}
          alt="main image"
          fill
          className="object-cover"
        />
        {overlayTexts.map((overlay) => (
          <div
            key={overlay.id}
            className="absolute text-white font-bold bg-black bg-opacity-70 rounded p-1 max-w-[170px]"
            style={{
              top: overlay.position.top,
              left: overlay.position.left,
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
