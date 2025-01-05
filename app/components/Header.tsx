"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import logo from "@/public/logo.png";
import { ScoreAnimation } from "./ScoreAnimation/ScoreAnimation";

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [showAnimation, setShowAnimation] = useState(false);

  // Создаем глобальное событие для триггера анимации
  useEffect(() => {
    const handleWordLearned = () => {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 3000);
    };

    window.addEventListener("wordLearned", handleWordLearned);
    return () => window.removeEventListener("wordLearned", handleWordLearned);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-center justify-between sticky top-0 z-50 bg-gray-800 text-white shadow-lg">
      <Link href="/" className="px-2">
        <Image src={logo} width={56} height={56} quality={100} alt="logo" />
      </Link>

      <nav className="max-w-7xl flex items-center gap-4 py-3 px-2">
        <Link
          href="/lessons"
          className="px-3 py-1 hover:bg-gray-800 rounded-md transition-colors"
        >
          Уроки
        </Link>
        <Link className="hover:text-gray-400" href="/words">
          Слова
        </Link>
        {/* <Link className="hover:text-gray-400" href="/dialog-sets">
          Фразы
        </Link> */}
        {session ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  width={32}
                  height={32}
                  alt={session.user.name || "User avatar"}
                  className="rounded-full border border-gray-600"
                />
              )}
              <ScoreAnimation show={showAnimation} />
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-3 py-1 bg-red-700 rounded-md hover:bg-red-800"
            >
              Выйти
            </button>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="px-3 py-1 bg-indigo-800 rounded-md hover:bg-indigo-900"
          >
            Войти
          </Link>
        )}
      </nav>
    </div>
  );
}
