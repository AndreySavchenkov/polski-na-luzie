import Image from "next/image";
import logoWithText from "@/public/logoWithText.png";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-56px)] space-y-6">
      <div className="w-[250px] h-[250px] rounded-full border-2 border-gray-300 shadow-xl overflow-hidden">
        <Image
          src={logoWithText}
          width={250}
          height={250}
          quality={100}
          alt="logo"
          className="object-contain"
        />
      </div>

      <p className="text-2xl text-center font-medium text-gray-700">
        Słówka i wyrażenia, których naprawdę użyjesz.
      </p>
    </div>
  );
}
