import Image from "next/image";
import logoWithText from "@/public/logoWithText.png";
import { Leaderboard } from "./components/Leaderboard/Leaderboard";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-56px)] space-y-6 py-8">
      <div className="w-[125px] h-[125px] rounded-full border-2 border-gray-300 shadow-xl overflow-hidden">
        <Image
          src={logoWithText}
          width={125}
          height={125}
          quality={100}
          alt="logo"
          className="object-contain"
        />
      </div>

      <Leaderboard />
    </div>
  );
}
