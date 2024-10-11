import { useState, useEffect, useRef } from "react";
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

export interface KeyAnswerAndQuestion {
  number: number;
  question: Question;
  userAnswer: string;
}

const TOTAL_QUESTIONS = 10;
const API_URL = `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&category=11&difficulty=easy&type=boolean`;

const API_CATCH_TIME_IN_MINUTES = 5 * 60 * 1000;
const COUNTDOWN_DURATION_MS = 25000;

function decodeHTMLEntities(text: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export default function QuestionPage() {
  const [startQuizSession, setStartQuizSession] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questions, setCurrentQuestions] = useState<Question[]>([]);
  const [countRightAnswers, setCountRightAnswers] = useState<number>(0);
  const [countUserAnswers, setCountUserAnswers] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timesUp, setTimesUp] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<string>("00m 00s");
  const [keyAnswers, setKeyAnswers] = useState<KeyAnswerAndQuestion[]>([]);

  const quizStartTime = useRef<number | null>(null);
  const quizFinished = useRef<boolean>(false);
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
      const questions = data.results;
      setCurrentQuestions(questions);

      const keyAnswers: KeyAnswerAndQuestion[] = [];

      for (let i = 0; i < questions.length; i++) {
        keyAnswers.push({
          number: i + 1,
          question: questions[i].question,
          userAnswer: "",
        });
      }

      setKeyAnswers(keyAnswers);

      quizStartTime.current = Date.now();
    },
    {
      staleTime: API_CATCH_TIME_IN_MINUTES,
      cacheTime: API_CATCH_TIME_IN_MINUTES,
    }
  );

  function startNewQuizSession() {
    setStartQuizSession(true);
    setTimesUp(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTimeSpent("00m 00s");
    quizStartTime.current = Date.now();
    setCountRightAnswers(0);
    setCountUserAnswers(0);
    quizFinished.current = false;
    setKeyAnswers([]);
  }

  useEffect(() => {
    if (!startQuizSession || timesUp || currentIndex > questions.length - 1) {
      const quizEndTime = Date.now();

      if (!quizFinished.current && quizStartTime.current) {
        const timeSpentMs = quizEndTime - quizStartTime.current;

        const formattedTime = formatTime(timeSpentMs);
        setTimeSpent(formattedTime);

        quizFinished.current = true;
      }

      setStartQuizSession(false);
    }
  }, [startQuizSession, timesUp, currentIndex, questions.length]);

  useEffect(() => {
    if (startQuizSession || keyAnswers.length === 0) {
      for (let i = 0; i < questions.length; i++) {
        keyAnswers.push({
          number: i + 1,
          question: questions[i],
          userAnswer: "",
        });
      }
    }
  }, [startQuizSession]);

  function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;

    return `${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(
      2,
      "0"
    )}s`;
  }

  function handleNextQuestion() {
    if (currentIndex < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  }

  function handleCheckAnswer(ans: string) {
    setSelectedAnswer(ans);

    const keyAnswer: KeyAnswerAndQuestion = {
      number: currentIndex + 1,
      question: currentQuestion,
      userAnswer: ans,
    };

    setKeyAnswers(prev =>
      prev.map(item =>
        item.number === keyAnswer.number ? { ...item, userAnswer: ans } : item
      )
    );

    if (currentIndex > 0) {
      if (currentQuestion.correct_answer == ans) {
        setCountRightAnswers(prev => prev + 1);
      }
    }
    setCountUserAnswers(prev => prev + 1);

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
        <ResultBox
          correct_answer={countRightAnswers}
          total_questions_done={countUserAnswers}
          total_questions={TOTAL_QUESTIONS}
          timeSpent={timeSpent}
          startNewQuizSession={startNewQuizSession}
          keyAnswers={keyAnswers}
        />
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
