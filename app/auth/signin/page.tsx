"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import logoWithText from "@/public/logoWithText.png";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Ошибка входа:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openInChrome = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isChrome = userAgent.includes("chrome") && !userAgent.includes("wv");

    if (!isChrome) {
      const isAndroid = /android|linux/i.test(userAgent);
      const isIOS = /iphone|ipad|ipod/.test(userAgent);

      try {
        if (isAndroid) {
          window.location.href = `googlechrome://navigate?url=${encodeURIComponent(
            window.location.href
          )}`;

          setTimeout(() => {
            window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
          }, 100);
        } else if (isIOS) {
          window.location.href = `googlechrome://${window.location.host}${window.location.pathname}`;
        }
        // Если не удалось открыть Chrome, делаем обычный вход
        setTimeout(handleSignIn, 1500);
      } catch (error) {
        console.error("Ошибка при открытии в Chrome:", error);
        handleSignIn();
      }
    } else {
      handleSignIn();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-56px)] space-y-8 p-4">
      <div className="w-[200px] h-[200px] rounded-full border-2 border-gray-700 shadow-xl overflow-hidden bg-gray-800/30 backdrop-blur-sm">
        <Image
          src={logoWithText}
          width={200}
          height={200}
          quality={100}
          alt="logo"
          className="object-contain"
        />
      </div>

      <div className="max-w-sm w-full bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">
          Войдите в аккаунт
        </h1>

        <button
          onClick={openInChrome}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="font-medium">
            {isLoading ? "Загрузка..." : "Войти через Google"}
          </span>
        </button>
      </div>
    </div>
  );
}
