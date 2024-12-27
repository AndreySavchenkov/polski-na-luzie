"use client";

import bywajImg from "@/public/bywaj.jpg";
import stolicaImg from "@/public/stolica.jpg";
import farmaImg from "@/public/ferma.jpg";
import { Dialog } from "./components/Dialog";
import { StaticImageData } from "next/image";

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
];

export default function DialogsPage() {
  return (
    <div>
      {dialogs.map((dialog, index) => (
        <Dialog key={index} dialog={dialog} />
      ))}
    </div>
  );
}
