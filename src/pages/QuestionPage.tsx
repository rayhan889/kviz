import { useState, useEffect, useRef } from "react";
// import { useQuery } from "react-query";

import ProgressBar from "../components/ui/Progressbar";
import CountDown from "../components/ui/CountDown";
import QuestionBox from "../components/ui/QuestionBox";
import ResultBox from "../components/ui/ResultBox";
import { useQuestionConfig } from "../context/context";

const COUNTDOWN_DURATION_MS = 45000;

export default function QuestionPage() {
  const [startQuizSession, setStartQuizSession] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countRightAnswers, setCountRightAnswers] = useState<number>(0);
  const [countUserAnswers, setCountUserAnswers] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timesUp, setTimesUp] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<string>("00m 00s");

  const {
    questions,
    setCurrentQuestions,
    keyAnswers,
    setKeyAnswers,
    persistedKeyAnswers,
    setPersistedKeyAnswers,
  } = useQuestionConfig();

  const quizStartTime = useRef<number | null>(null);
  const quizFinished = useRef<boolean>(false);
  const isQuizStarted = useRef<boolean>(false);
  const currentQuestion = questions[currentIndex];
  const indexStartByOne = currentIndex + 1;

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
    setPersistedKeyAnswers([]);
    isQuizStarted.current = false;
  }

  useEffect(() => {
    setStartQuizSession(true);
    setTimesUp(false);

    const questionsFromLocalStorage = JSON.parse(
      localStorage.getItem("questions") ?? "[]"
    );
    setCurrentQuestions(questionsFromLocalStorage);

    const currentIndexLocalStorage = parseInt(
      localStorage.getItem("currentIndex") ?? "0"
    );
    setCurrentIndex(currentIndexLocalStorage);

    setSelectedAnswer(null);
    setTimeSpent("00m 00s");
    quizStartTime.current = Date.now();
    setCountRightAnswers(0);
    setCountUserAnswers(0);
    quizFinished.current = false;
    isQuizStarted.current = false;
  }, []);

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
    if (currentIndex > 0) {
      localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    }
  }, [currentIndex]);

  useEffect(() => {
    if (startQuizSession && !timesUp && keyAnswers.length === 0) {
      for (let i = 0; i < questions.length; i++) {
        keyAnswers.push({
          number: i + 1,
          question: questions[i],
          userAnswer: "",
        });
      }
    }
  }, [startQuizSession, timesUp, questions]);

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

    if (startQuizSession && !timesUp && currentIndex <= questions.length - 1) {
      const updatedKeyAnswers = keyAnswers.map(item =>
        item.number === currentIndex + 1 ? { ...item, userAnswer: ans } : item
      );
      setKeyAnswers(updatedKeyAnswers);
      setPersistedKeyAnswers(updatedKeyAnswers);
    }

    if (currentIndex > 0) {
      if (currentQuestion.correct_answer == ans) {
        setCountRightAnswers(prev => prev + 1);
      }
    }
    setCountUserAnswers(prev => prev + 1);

    setTimeout(handleNextQuestion, 1000);
  }

  return (
    <>
      {!startQuizSession || timesUp || currentIndex > questions.length - 1 ? (
        // Result box
        <ResultBox
          correct_answer={countRightAnswers}
          total_questions_done={countUserAnswers}
          total_questions={questions.length}
          timeSpent={timeSpent}
          startNewQuizSession={startNewQuizSession}
          keyAnswers={persistedKeyAnswers}
        />
      ) : (
        <>
          {currentQuestion && (
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
                keyAnswers={keyAnswers}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
