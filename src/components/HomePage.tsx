import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-10 justify-center items-center max-w-[29rem] lg:max-w-[39rem] w-full">
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-[3rem] lg:text-[3.375rem] text-slate-950 text-center leading-[110%]">
          Questions <span className="text-blue-600">Tailored</span>, <br />
          Minds <span className="text-blue-600">Sharpened</span>
        </h1>
        <p className="text-slate-700 text-center">
          Kviz is your go-to app for custom-crafted quizzes that sharpen your
          mind and expand your knowledge across any topic, difficulty, or length
          you choose.
        </p>
      </div>
      <button className="w-[15rem] bg-blue-600 text-white py-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:shadow-inner">
        Get Started
      </button>
    </div>
  );
}
