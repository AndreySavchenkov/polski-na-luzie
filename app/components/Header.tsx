import Link from "next/link";
import AddUser from "./AddUser";

export default function Header() {
  return (
    <div className="flex justify-between sticky top-0 z-50 bg-gray-800 text-white shadow-lg">
      <AddUser />
      <nav className="max-w-7xl flex gap-2 py-4 px-6">
        <Link className="hover:text-gray-400" href="/">Главная</Link>
        <Link className="hover:text-gray-400" href="/words">Слова</Link>
        <Link className="hover:text-gray-400" href="/dialogs">Диалоги</Link>
      </nav>
    </div>
  );
}
