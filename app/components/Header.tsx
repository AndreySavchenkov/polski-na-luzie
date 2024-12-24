import Link from "next/link";
import AddUser from "./AddUser";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900">
      <AddUser />
      <div className="flex gap-4">
        <Link href="/">Главная</Link>
        <Link href="/topics">Уроки</Link>
      </div>
    </div>
  );
}
