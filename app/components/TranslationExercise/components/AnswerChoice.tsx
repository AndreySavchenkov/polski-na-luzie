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
      className={`p-2 rounded-md w-[150px] text-center h-[150px] transition-colors duration-300 ${
        selectedAnswer === answer
          ? isCorrect
            ? "bg-green-500"
            : "bg-red-500"
          : "bg-white"
      }`}
      key={answer}
      onClick={() => handleAnswerClick(answer)}
    >
      {answer}
    </button>
  );
};
