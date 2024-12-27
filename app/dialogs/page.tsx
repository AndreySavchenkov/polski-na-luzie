"use client";

import mainImage from "@/public/geraltAndTailor.jpg";
import Image from "next/image";
import { SentenceBuilder } from "./components/SentenceBuilder";
import { useState } from "react";

type OverlayText = {
  id: string;
  text: string;
  position: { top: string; left: string };
};

export default function DialogsPage() {
  const [overlayTexts, setOverlayTexts] = useState<OverlayText[]>([]);

  const handleCorrectSentence = (
    dialogId: string,
    text: string,
    position: { top: string; left: string }
  ) => {
    setOverlayTexts((prev) => [...prev, { id: dialogId, text, position }]);
  };

  const dialogId1 = "676d962b0e4e9144d6a821d3";
  const dialogId2 = "676d96a60e4e9144d6a821d7";

  return (
    <div className="flex md:flex-row flex-col  gap-4 items-center justify-center relative py-6">
      <div className="relative h-[400px] w-[400px]">
        <Image src={mainImage} alt="main image" fill className="object-cover" />
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
        <SentenceBuilder
          dialogId={dialogId1}
          onCorrectSentence={(text) =>
            handleCorrectSentence(dialogId1, text, { top: "24%", left: "28%" })
          }
        />
        <SentenceBuilder
          dialogId={dialogId2}
          onCorrectSentence={(text) =>
            handleCorrectSentence(dialogId2, text, { top: "39%", left: "34%" })
          }
        />
      </div>
    </div>
  );
}
