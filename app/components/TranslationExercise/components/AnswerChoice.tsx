type AnswerChoiceProps = {
  answer: string;
  selectedAnswer: string;
  isCorrect: boolean;
  handleAnswerClick: (answer: string) => void;
};

export const AnswerChoice = ({
  answer,
  selectedAnswer,
  isCorrect,
  handleAnswerClick,
}: AnswerChoiceProps) => {
  return (
    <button
      className={`w-full p-4 text-center text-lg font-medium 
        transition-all duration-300 transform active:scale-95 min-h-[100px]
        bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 
        break-words cursor-pointer hyphens-auto outline-none focus:outline-none focus:ring-0
        active:outline-none active:ring-0 focus-visible:outline-none
        ${
          selectedAnswer === answer
            ? isCorrect
              ? "bg-green-600 text-white pointer-events-none"
              : "bg-red-600 text-white pointer-events-none"
            : "bg-gray-800/80"
        }`}
      onClick={() => handleAnswerClick(answer)}
      disabled={selectedAnswer !== ""}
      style={{ wordBreak: "break-word", hyphens: "auto" }}
      lang="ru"
    >
      {answer}
    </button>
  );
};

AnswerChoice.displayName = "AnswerChoice";
