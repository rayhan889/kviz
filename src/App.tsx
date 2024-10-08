import { CiBoxList } from "react-icons/ci";

const ProgressBar = ({ completed }: { completed: number }) => {
  return (
    <div className="h-[5px] w-full bg-blue-100 rounded-full">
      <div
        style={{ width: `${completed}%` }}
        className={`h-full bg-blue-700 rounded-full text-right`}
      ></div>
    </div>
  );
};

const QuestionPage = () => {
  const options = [
    {
      value: "A",
    },
    {
      value: "B",
    },
    {
      value: "C",
    },
    {
      value: "D",
    },
  ];

  return (
    <main className="h-screen w-full bg-white flex flex-col items-center justify-center">
      {/* Background gradient */}
      <div className="absolute h-60 top-0 left-0 w-full bg-gradient-to-b from-blue-500/20 to-white" />

      {/* Progress bar */}
      <div className="max-w-[38rem] w-full mb-14 flex flex-col gap-y-2 z-50">
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

      <div className="max-w-[38rem] h-auto flex flex-col gap-y-6 z-50">
        {/* Button for question list */}
        <button className="w-[10rem] flex items-center gap-x-3 text-blue-700 rounded bg-blue-50 px-3 py-2 text-sm border border-blue-700 shadow-md">
          <CiBoxList className="w-6 h-6" />
          Question List
        </button>
        {/* Question */}
        <div className="flex justify-start gap-x-2">
          <span>1. </span>
          <p className="text-base text-slate-700 line-clamp-3">
            Lorem ipsum dolor sit amet consectetur. Cras gravida id cursus leo
            id fermentum sed fames. Ut massa commodo et ultricies neque in.
            Pretium augue cursus
          </p>
        </div>
        {/* Options */}
        <div className="flex flex-col gap-y-3">
          {options.map(option => (
            <button
              value={option.value}
              id={option.value}
              className="w-full rounded-lg p-6 text-slate-950 text-base border border-slate-300 text-start"
            >
              {option.value}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

function App() {
  return (
    <>
      <QuestionPage />
    </>
  );
}

export default App;
