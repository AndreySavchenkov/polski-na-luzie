"use client";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TelegramWebviewProxy?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Telegram?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chrome?: any;
  }
}

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import logoWithText from "@/public/logoWithText.png";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  const isInAppBrowserCheck = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Определяем Telegram
    const isTelegram =
      userAgent.includes("telegram") ||
      typeof window.Telegram !== "undefined" ||
      typeof window.TelegramWebviewProxy !== "undefined" ||
      // Добавляем проверку для WebView
      (userAgent.includes("chrome") &&
        userAgent.includes("mobile") &&
        userAgent.includes("wv"));

    // Определяем Instagram
    const isInstagram =
      userAgent.includes("instagram") ||
      (userAgent.includes("mozilla") &&
        userAgent.includes("iphone") &&
        !userAgent.includes("safari"));

    // Определяем другие in-app браузеры
    const isInAppBrowser =
      isTelegram ||
      isInstagram ||
      userAgent.includes("fb_iab") ||
      userAgent.includes("line") ||
      userAgent.includes("wv");

    return isInAppBrowser;
  };

  useEffect(() => {
    const isInApp = isInAppBrowserCheck();
    console.log("Проверка браузера:", {
      userAgent: window.navigator.userAgent,
      isInAppBrowser: isInApp,
    });
    setIsInAppBrowser(isInApp);
  }, []);

  const handleSignIn = async () => {
    try {
      console.log("Начало процесса входа");
      console.log("User Agent:", window.navigator.userAgent);
      console.log("Is In App Browser:", isInAppBrowser);

      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });

      if (result?.error) {
        console.error("Детальная ошибка входа:", {
          error: result.error,
          status: result.status,
          ok: result.ok,
          url: result.url,
          userAgent: window.navigator.userAgent,
          isInAppBrowser,
        });
      } else {
        console.log("Успешный вход:", {
          result,
          userAgent: window.navigator.userAgent,
          isInAppBrowser,
        });
      }
    } catch (error) {
      console.error("Критическая ошибка при входе:", {
        error,
        userAgent: window.navigator.userAgent,
        isInAppBrowser,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openInBrowser = () => {
    const url = window.location.href;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    console.log("Открытие в Chrome:", { isAndroid, isIOS, url });

    try {
      if (isAndroid) {
        window.location.href = `googlechrome://navigate?url=${encodeURIComponent(
          url
        )}`;

        setTimeout(() => {
          window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
        }, 100);
      } else if (isIOS) {
        window.location.href = `googlechrome://${window.location.host}${window.location.pathname}`;
      } else {
        window.location.href = "https://www.google.com/chrome/";
      }
    } catch (error) {
      console.error("Ошибка при открытии в Chrome:", error);
      handleSignIn(); // Fallback к обычному входу при ошибке
    }
  };

  const getBrowserMessage = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isRealChrome =
      userAgent.includes("chrome") &&
      !userAgent.includes("wv") &&
      !userAgent.includes("instagram") &&
      !userAgent.includes("telegram");

    if (isRealChrome) {
      return null;
    }

    return "Для лучшей работы рекомендуется использовать Chrome. Нажмите кнопку ниже для входа через Chrome или продолжите в текущем браузере.";
  };

  // Добавляем useEffect для проверки autoLogin
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldAutoLogin = params.get("autoLogin") === "true";
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Убираем проверку на mobile для Chrome
    const isChrome = userAgent.includes("chrome") && !userAgent.includes("wv");

    console.log("Проверка автологина:", {
      shouldAutoLogin,
      isChrome,
      userAgent,
    });

    if (shouldAutoLogin && isChrome) {
      handleSignIn();
    }
  }, []);

  const checkChromeAvailable = async () => {
    try {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAndroid = userAgent.includes("android");
      const isIOS = /iphone|ipad|ipod/.test(userAgent);

      if (isAndroid) {
        // Проверяем через intent схему
        const intentUrl = `intent://${window.location.host}#Intent;scheme=https;package=com.android.chrome;end`;
        window.location.href = intentUrl;

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(false);
          }, 500);
        });
      }

      if (isIOS) {
        // Проверяем через chrome схему
        const chromeUrl = `googlechrome://${window.location.host}`;
        window.location.href = chromeUrl;

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(false);
          }, 500);
        });
      }

      // Для десктопа проверяем наличие объекта chrome
      return !!window.chrome;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-56px)] space-y-8 p-4">
      {isInAppBrowser && (
        <div className="max-w-sm w-full bg-yellow-500/10 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/50 text-yellow-200 mb-4">
          <p className="text-center">{getBrowserMessage()}</p>
          <button
            onClick={openInBrowser}
            className="w-full mt-2 text-center underline cursor-pointer hover:text-yellow-400"
          >
            Открыть в браузере
          </button>
        </div>
      )}

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
          onClick={async () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            const isRealChrome =
              userAgent.includes("chrome") &&
              !userAgent.includes("wv") &&
              !userAgent.includes("instagram") &&
              !userAgent.includes("telegram") &&
              !!window.chrome;

            console.log("Проверка браузера:", { isRealChrome, userAgent });

            if (isRealChrome) {
              handleSignIn();
              return;
            }

            const isChromeAvailable = await checkChromeAvailable();
            console.log("Проверка наличия Chrome:", { isChromeAvailable });

            if (isChromeAvailable) {
              openInBrowser();
            } else {
              handleSignIn();
            }
          }}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
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

        <p className="mt-4 text-sm text-center text-gray-400">
          Используя Polski Na Luzie, вы соглашаетесь с нашими{" "}
          <a
            href="/terms"
            className="text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            условиями использования
          </a>{" "}
          и{" "}
          <a
            href="/privacy"
            className="text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            политикой конфиденциальности
          </a>
          .
        </p>
      </div>
    </div>
  );
}
