import { GoArrowLeft } from "react-icons/go";
import { IoIosStats } from "react-icons/io";
import { FiXCircle, FiCheckCircle, FiList, FiClock } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import React from "react";

interface ResultBoxProps {
  startNewQuizSession: () => void;
  correct_answer: number;
  total_questions_done: number;
  total_questions: number;
  timeSpent: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({
  startNewQuizSession,
  correct_answer,
  total_questions,
  total_questions_done,
  timeSpent,
}: ResultBoxProps) => {
  const wrong_answer = total_questions_done - correct_answer;

  const stats = [
    {
      slug: "correct_answer",
      name: "Correct Answer",
      value: correct_answer ?? 0,
      icon: FiCheckCircle,
    },
    {
      slug: "wrong_answer",
      name: "Wrong Answer",
      value: wrong_answer ?? 0,
      icon: FiXCircle,
    },
    {
      slug: "total_questions_done",
      name: "Total Questions Done",
      value: total_questions_done ?? 0,
      icon: LuPencilLine,
    },
    {
      slug: "total_questions",
      name: "Total Questions",
      value: total_questions ?? 0,
      icon: FiList,
    },
    {
      slug: "time_completion",
      name: "Time Completion",
      value: timeSpent ?? "00:00:00",
      icon: FiClock,
    },
  ];

  return (
    <div className="max-w-[30rem] w-full h-auto flex flex-col gap-y-6 z-50 lg:max-w-[38rem]">
      {/* Back button */}
      <button className="flex items-center justify-center w-[6.25rem] p-3 rounded gap-x-2 border border-slate-300 bg-white text-slate-950 shadow-md text-xs">
        <GoArrowLeft className="w-4 h-6" />
        Back
      </button>

      {/* Praise text */}
      <div className="flex w-auto mx-auto flex-col items-center gap-y-3">
        {correct_answer >= 5 ? (
          <>
            <a className="text-5xl">👏</a>
            <span className="font-medium text-slate-950">Not Bad Bro!</span>
          </>
        ) : correct_answer < 5 ? (
          <>
            <a className="text-5xl">😥</a>
            <span className="font-medium text-slate-950">
              Well, Maybe That Was Difficult
            </span>
          </>
        ) : correct_answer > 8 ? (
          <>
            <a className="text-5xl">🎊</a>
            <span className="font-medium text-slate-950">Good Job Mate!!</span>
          </>
        ) : null}
      </div>

      {/* Result box */}
      <div className="w-full rounded-lg border border-slate-300 h-auto flex flex-col relative">
        <div className="absolute w-full -z-10 px-6 py-4 flex items-center gap-x-2 bg-slate-100 border-b border-b-slate-300 text-slate-950">
          <IoIosStats className="h-5 w-5" />
          <span className="font-medium">Score & Stats</span>
        </div>
        <div className="p-5 mt-14 grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => {
            const lastIndex = stats.length - 1;
            return (
              <div
                key={`${stat.slug}`}
                className={`rounded border border-slate-300 p-3 flex flex-col justify-start gap-y-5 ${
                  idx === lastIndex && "col-span-2"
                }`}
              >
                <stat.icon className="h-5 w-5 text-blue-600" />
                <div className="flex flex-col justify-start gap-y-2">
                  <a className="text-xs text-slate-700">{stat.name}</a>
                  <span className="text-base font-medium text-slate-950">
                    {stat.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Try again button */}
      <button
        onClick={() => startNewQuizSession()}
        className="w-full bg-blue-600 text-white py-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:shadow-inner"
      >
        Try Again
      </button>
    </div>
  );
};

export default ResultBox;
