"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Theory } from "./components/Theory/Theory";
import { Practice } from "./components/Practice/Practice";

type Tab = "theory" | "practice";

export default function LessonPage() {
  const [activeTab, setActiveTab] = useState<Tab>("theory");

  return (
    <div className="p-3">
      

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("theory")}
          className={`px-4 py-2 rounded-lg transition-colors relative ${
            activeTab === "theory"
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Теория
          {activeTab === "theory" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
              initial={false}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("practice")}
          className={`px-4 py-2 rounded-lg transition-colors relative ${
            activeTab === "practice"
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Практика
          {activeTab === "practice" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
              initial={false}
            />
          )}
        </button>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
        {activeTab === "theory" ? <Theory /> : <Practice />}
      </div>
    </div>
  );
}
