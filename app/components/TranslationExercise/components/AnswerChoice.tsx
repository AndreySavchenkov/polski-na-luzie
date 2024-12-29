import { forwardRef } from "react";

type AnswerChoiceProps = {
  answer: string;
  selectedAnswer: string;
  isCorrect: boolean;
  handleAnswerClick: (answer: string) => void;
};

export const AnswerChoice = forwardRef<HTMLButtonElement, AnswerChoiceProps>(
  ({ answer, selectedAnswer, isCorrect, handleAnswerClick }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full p-4 rounded-xl text-center text-lg font-medium 
        transition-all duration-300 transform active:scale-95 min-h-[100px]
        break-words hyphens-auto
        ${
          selectedAnswer === answer
            ? isCorrect
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
            : "bg-gray-800/80 hover:bg-gray-700 text-gray-100 border border-gray-700"
        }`}
        onClick={() => handleAnswerClick(answer)}
        disabled={selectedAnswer !== ""}
        style={{ wordBreak: "break-word", hyphens: "auto" }}
        lang="ru"
      >
        {answer}
      </button>
    );
  }
);

AnswerChoice.displayName = "AnswerChoice";
