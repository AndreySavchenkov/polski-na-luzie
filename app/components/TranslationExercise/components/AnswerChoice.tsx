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
      className={`w-full p-6 rounded-xl text-center text-lg font-medium 
      transition-all duration-300 transform active:scale-95 min-h-[100px]
      ${
        selectedAnswer === answer
          ? isCorrect
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
          : "bg-gray-800/80 hover:bg-gray-700 text-gray-100 border border-gray-700"
      }`}
      onClick={() => handleAnswerClick(answer)}
      disabled={selectedAnswer !== ""}
    >
      {answer}
    </button>
  );
};
