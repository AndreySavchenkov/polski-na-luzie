import Link from "next/link";
import logo from "@/public/logo.png";
import AddUser from "./AddUser";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between sticky top-0 z-50 bg-gray-800 text-white shadow-lg">
      <Link href="/" className="px-6">
        <Image src={logo} width={56} height={56} quality={100} alt="logo" />
      </Link>

      <AddUser />
      <nav className="max-w-7xl flex gap-2 py-4 px-6">
        <Link className="hover:text-gray-400" href="/words">
          Słówka
        </Link>
        <Link className="hover:text-gray-400" href="/dialog-sets">
          Dialogi
        </Link>
      </nav>
    </div>
  );
}
