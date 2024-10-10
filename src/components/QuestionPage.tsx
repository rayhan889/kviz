import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import ProgressBar from "./ui/Progressbar";
import CountDown from "./ui/CountDown";
import QuestionBox from "./ui/QuestionBox";
import ResultBox from "./ui/ResultBox";

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
const COUNTDOWN_DURATION_MS = 25000;

function decodeHTMLEntities(text: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export default function QuestionPage() {
  const [startQuizSession, setStartQuestionSession] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questions, setCurrentQuestions] = useState<Question[]>([]);
  const [countRightAnswers, setCountRightAnswers] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timesUp, setTimesUp] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const indexStartByOne = currentIndex + 1;

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

  useEffect(() => {
    if (!startQuizSession || timesUp || currentIndex > questions.length - 1) {
      setCurrentIndex(0);
      setCountRightAnswers(0);
      setSelectedAnswer(null);
      setTimesUp(true);
    }
  }, [startQuizSession, timesUp, currentIndex, questions.length]);

  function handleNextQuestion() {
    if (currentIndex < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  }

  function handleCheckAnswer(ans: string) {
    setSelectedAnswer(ans);

    if (currentIndex > 0) {
      if (currentQuestion.correct_answer == ans) {
        setCountRightAnswers(prev => prev + 1);
      }
    }

    setTimeout(handleNextQuestion, 1000);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <main className="h-screen w-full bg-white flex flex-col items-center justify-center">
      {/* Background gradient */}
      <div className="absolute h-60 top-0 left-0 w-full bg-gradient-to-b from-blue-500/20 to-white" />

      {!startQuizSession || timesUp || currentIndex > questions.length - 1 ? (
        // Result box
        <ResultBox setTimesUp={setTimesUp} />
      ) : (
        <>
          {!isLoading && currentQuestion && (
            <>
              {/* Progress bar */}
              <div className="max-w-[30rem] lg:max-w-[38rem] w-full mb-14 flex flex-col gap-y-2 z-50">
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-950">
                    {indexStartByOne} of {questions.length} Questions
                  </span>
                  <span className="text-xs text-slate-950">
                    {indexStartByOne < 5
                      ? "There's still lot to do mate😉"
                      : indexStartByOne > 7
                      ? "Nearly there😱"
                      : "On ur halfway!🙂"}
                  </span>
                </div>
                <ProgressBar
                  completed={(indexStartByOne / questions.length) * 100}
                />
              </div>

              {/* Timer */}
              <CountDown
                countdown_duration_ms={COUNTDOWN_DURATION_MS}
                setTimesUp={setTimesUp}
              />

              {/* Question Box */}
              <QuestionBox
                currentIndex={currentIndex}
                currentQuestion={currentQuestion}
                questions={questions}
                handleCheckAnswer={handleCheckAnswer}
                selectedAnswer={selectedAnswer}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}
