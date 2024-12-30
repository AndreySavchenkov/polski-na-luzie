import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <Link href="/privacy" className="hover:text-gray-300">
            Политика конфиденциальности
          </Link>
          <Link href="/terms" className="hover:text-gray-300">
            Условия использования
          </Link>
        </div>
        <div className="text-center mt-4 text-gray-400">
          © {new Date().getFullYear()} Polski Na Luzie. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
