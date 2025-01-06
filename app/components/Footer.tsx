import Link from "next/link";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-800/30 backdrop-blur-sm border-t border-gray-700 py-2 ms:py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-3">
          <Link
            href="https://www.instagram.com/savchenkov_andrey1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <InstagramLogoIcon className="w-5 h-5" />
            <span>Связаться со мной</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
