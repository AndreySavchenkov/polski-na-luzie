import { memo } from "react";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  exercises: {
    id: string;
    completed: boolean;
    attempts: number;
    isCurrent: boolean;
  }[];
}

export const ProgressIndicator = memo(
  ({ exercises }: ProgressIndicatorProps) => {
    return (
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-[600px] z-10">
        <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-lg">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform
                ${
                  exercise.completed
                    ? "bg-green-500 scale-110"
                    : exercise.attempts > 0
                    ? "bg-red-500 scale-100"
                    : "bg-gray-600 scale-100"
                }
                ${
                  exercise.isCurrent
                    ? "ring-2 ring-white ring-offset-1 ring-offset-gray-800"
                    : ""
                }
              `}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ProgressIndicator.displayName = "ProgressIndicator";
