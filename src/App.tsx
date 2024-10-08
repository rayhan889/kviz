import { CiBoxList } from "react-icons/ci";

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
    <main className="h-screen w-full bg-white flex items-center justify-center">
      <div className="max-w-[38rem] h-auto flex flex-col gap-y-6">
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
