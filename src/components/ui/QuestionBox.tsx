import { useState } from "react";
import { CiBoxList } from "react-icons/ci";
import QuestionListModal from "./QuestionListModal";
import { Question } from "../../pages/QuestionPage";
import { KeyAnswerAndQuestion } from "../../pages/QuestionPage";

interface QuestionBoxProps {
  questions: Question[];
  currentQuestion: Question;
  currentIndex: number;
  handleCheckAnswer: (ans: string) => void;
  selectedAnswer: string | null;
  keyAnswers: KeyAnswerAndQuestion[];
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  currentIndex,
  currentQuestion,
  handleCheckAnswer,
  questions,
  selectedAnswer,
  keyAnswers,
}: QuestionBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const options = [
    {
      name: "Yes",
      value: "True",
    },
    {
      name: "No",
      value: "False",
    },
  ];

  return (
    <div className="max-w-[30rem] w-full h-auto flex flex-col gap-y-6 z-50 lg:max-w-[38rem]">
      {/* Button for question list */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-[10rem] flex items-center gap-x-3 text-blue-700 rounded bg-blue-50 px-3 py-2 text-sm border border-blue-700 shadow-md"
      >
        <CiBoxList className="w-6 h-6" />
        Question List
      </button>

      <QuestionListModal
        currentIndex={currentIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        questions={questions}
        keyAnswers={keyAnswers}
      />

      {/* Question */}
      <div className="flex justify-start gap-x-2">
        <span>{currentIndex + 1}. </span>
        <p className="text-base text-slate-700 line-clamp-3">
          {currentQuestion?.question}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-y-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            value={opt.value}
            className={`w-full rounded-lg p-6 text-slate-950 text-base border text-start ${
              selectedAnswer === opt.value
                ? opt.value === currentQuestion.correct_answer
                  ? "bg-emerald-50 border-emerald-500"
                  : "bg-red-50 border-red-300"
                : "border-slate-300"
            }`}
            onClick={() => handleCheckAnswer(opt.value)}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionBox;
