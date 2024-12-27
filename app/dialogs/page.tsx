"use client";

import { useState } from "react";
import bywajImg from "@/public/bywaj.jpg";
import stolicaImg from "@/public/stolica.jpg";
import farmaImg from "@/public/ferma.jpg";
import problemImg from "@/public/problem.jpg";
import pogrzebImg from "@/public/pogrzeb.jpg";
import { Dialog } from "./components/Dialog";
import { StaticImageData } from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export type DialogT = {
  title: string;
  imageUrl: StaticImageData | string;
  sentences: { id: string; top: string; left: string }[];
};

const dialogs: DialogT[] = [
  {
    title: "Bywaj!",
    imageUrl: bywajImg,
    sentences: [
      { id: "676d962b0e4e9144d6a821d3", top: "24%", left: "28%" },
      { id: "676d96a60e4e9144d6a821d7", top: "39%", left: "34%" },
    ],
  },
  {
    title: "Stolica",
    imageUrl: stolicaImg,
    sentences: [
      { id: "676e96ac87319592bcb9873b", top: "7%", left: "7%" },
      { id: "676e971587319592bcb9873f", top: "48%", left: "44%" },
    ],
  },
  {
    title: "Farma",
    imageUrl: farmaImg,
    sentences: [
      { id: "676e9c9887319592bcb98743", top: "53%", left: "53%" },
      { id: "676e9ceb87319592bcb98747", top: "30%", left: "4%" },
    ],
  },
  {
    title: "Problem",
    imageUrl: problemImg,
    sentences: [
      { id: "676eafdb87319592bcb9874b", top: "39%", left: "56%" },
      { id: "676eb07587319592bcb9874f", top: "49%", left: "4%" },
    ],
  },
  {
    title: "Pogrzeb",
    imageUrl: pogrzebImg,
    sentences: [
      { id: "676ee7d387319592bcb98753", top: "25%", left: "13%" },
      { id: "676ee80e87319592bcb98757", top: "40%", left: "32%" },
      { id: "676ee84f87319592bcb9875b", top: "59%", left: "13%" },
    ],
  },
];

export default function DialogsPage() {
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);

  const handleNext = () => {
    setCurrentDialogIndex((prevIndex) =>
      prevIndex < dialogs.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setCurrentDialogIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : dialogs.length - 1
    );
  };

  const currentDialog = dialogs[currentDialogIndex];

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="flex gap-4 items-center mt-4">
        <ChevronLeftIcon
          onClick={handlePrevious}
          className="w-6 h-6 cursor-pointer active:scale-90 transition-transform"
        />
        <h2>{dialogs[currentDialogIndex].title}</h2>
        <ChevronRightIcon
          onClick={handleNext}
          className="w-6 h-6 cursor-pointer active:scale-90 transition-transform"
        />
      </div>

      {/* Диалог */}
      <Dialog dialog={currentDialog} />
    </div>
  );
}
