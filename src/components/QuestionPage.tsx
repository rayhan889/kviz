import { useState } from "react";
import { useQuery } from "react-query";
import { CiBoxList } from "react-icons/ci";
import ProgressBar from "./ui/Progressbar";

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answer: [];
  question: string;
  type: string;
}

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=boolean";

const API_CATCH_TIME = 5 * 60 * 1000;

function decodeHTMLEntities(text: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export default function QuestionPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questions, setCurrentQuestions] = useState<Question[]>([]);

  const { isLoading, error } = useQuery(
    "questions",
    async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      data.results = data.results.map((q: Question) => ({
        ...q,
        question: decodeHTMLEntities(q.question),
      }));
      setCurrentQuestions(data.results);
    },
    {
      staleTime: API_CATCH_TIME,
      cacheTime: API_CATCH_TIME,
    }
  );

  function handleNextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const currentQuestion = questions[currentIndex];

  const options = [
    {
      name: "Yes",
      value: "true",
    },
    {
      name: "No",
      value: "false",
    },
  ];

  return (
    <main className="h-screen w-full bg-white flex flex-col items-center justify-center">
      {/* Background gradient */}
      <div className="absolute h-60 top-0 left-0 w-full bg-gradient-to-b from-blue-500/20 to-white" />

      {!isLoading && currentQuestion && (
        <>
          {/* Progress bar */}
          <div className="max-w-[30rem] lg:max-w-[38rem] w-full mb-14 flex flex-col gap-y-2 z-50">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-medium text-slate-950">
                1 of 10 Questions
              </span>
              <span className="text-xs text-slate-950">Nearly there😱</span>
            </div>
            <ProgressBar completed={50} />
          </div>

          {/* Timer */}
          <div className="text-slate-950 text-base font-medium mb-10">
            ⏱️ 00:01:30
          </div>

          <div className="max-w-[30rem] w-full h-auto flex flex-col gap-y-6 z-50 lg:max-w-[38rem]">
            {/* Button for question list */}
            <button className="w-[10rem] flex items-center gap-x-3 text-blue-700 rounded bg-blue-50 px-3 py-2 text-sm border border-blue-700 shadow-md">
              <CiBoxList className="w-6 h-6" />
              Question List
            </button>
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
                  className="w-full rounded-lg p-6 text-slate-950 text-base border border-slate-300 text-start"
                  onClick={handleNextQuestion}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
