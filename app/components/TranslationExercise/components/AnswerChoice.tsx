type AnswerChoiceProps = {
  answer: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  handleAnswerClick: (answer: string) => void;
};

export const AnswerChoice = ({
  answer,
  selectedAnswer,
  correctAnswer,
  isCorrect,
  handleAnswerClick,
}: AnswerChoiceProps) => {
  const getButtonStyle = () => {
    if (selectedAnswer === "") return "bg-gray-800/80";
    if (selectedAnswer === answer)
      return isCorrect
        ? "bg-green-600 text-white pointer-events-none"
        : "bg-red-600 text-white pointer-events-none";
    if (answer === correctAnswer && !isCorrect)
      return "bg-green-600 text-white pointer-events-none";
    return "bg-gray-800/80 pointer-events-none opacity-50";
  };

  return (
    <button
      key={`${answer}-${selectedAnswer}`}
      className={`w-full p-4 text-center text-lg font-medium 
        transition-all duration-300 transform active:scale-95 min-h-[100px]
        rounded-xl backdrop-blur-sm border border-gray-700 
        break-words cursor-pointer hyphens-auto outline-none focus:outline-none focus:ring-0
        active:outline-none active:ring-0 focus-visible:outline-none
        ${getButtonStyle()}`}
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
