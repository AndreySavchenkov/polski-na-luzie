"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import logo from "@/public/logo.png";

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-center justify-between sticky top-0 z-50 bg-gray-800 text-white shadow-lg">
      <Link href="/" className="px-2">
        <Image src={logo} width={56} height={56} quality={100} alt="logo" />
      </Link>

      <nav className="max-w-7xl flex items-center gap-4 py-3 px-2">
        <Link className="hover:text-gray-400" href="/words">
          Слова
        </Link>
        <Link className="hover:text-gray-400" href="/dialog-sets">
          Диалоги
        </Link>
        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                width={32}
                height={32}
                alt={session.user.name || "User avatar"}
                className="rounded-full border border-gray-600"
              />
            )}
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
