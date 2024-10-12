import { FiChevronDown } from "react-icons/fi";
import { useQuestionConfig } from "../context/context";
import { useNavigate } from "react-router-dom";

export const QuestionConfigPage = () => {
  const { questionConfig, setQuestionConfig } = useQuestionConfig();

  const navigate = useNavigate();

  const categoryOptions = [
    {
      name: "🎭 Film & TV Shows",
      value: "11",
    },
    {
      name: "🖥️ Computer Science",
      value: "18",
    },
    {
      name: "📕 History",
      value: "23",
    },
    {
      name: "⚖️ Politics",
      value: "24",
    },
    {
      name: "🎵 Music",
      value: "12",
    },
  ];

  const difficultyOptions = [
    {
      name: "Easy",
      value: "easy",
    },
    {
      name: "Medium",
      value: "medium",
    },
    {
      name: "Hard",
      value: "hard",
    },
  ];

  function handleChangeQuizConfig(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setQuestionConfig(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (questionConfig !== undefined) {
      if (
        questionConfig.category &&
        questionConfig.difficulty &&
        questionConfig.amount
      ) {
        console.log("Question config submitted", questionConfig);
        navigate("/question");
      }
    }
  }

  function handleResetQuizConfig() {
    setQuestionConfig({
      category: "",
      difficulty: "",
      amount: 0,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[28rem] lg:max-w-[37.5rem] w-full flex flex-col items-center gap-y-8"
    >
      <div className="grid grid-cols-2 gap-5 w-full">
        {/* Category */}
        <div className="flex flex-col justify-start gap-y-3 col-span-2">
          <label htmlFor="category" className="font-medium text-slate-950">
            Category
          </label>
          <div className="relative">
            <select
              name="category"
              id="category"
              value={questionConfig?.category}
              onChange={handleChangeQuizConfig}
              className="w-full bg-white rounded-lg border border-slate-300 p-6 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
            >
              <option selected>Select Category</option>
              {categoryOptions.map(cat => (
                <option key={`category_${cat.value}`} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="h-5 w-5 absolute top-1/2 right-4 -translate-y-1/2 text-slate-950" />
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col justify-start gap-y-3">
          <label htmlFor="difficulty" className="font-medium text-slate-950">
            Difficulty
          </label>
          <div className="relative">
            <select
              name="difficulty"
              id="difficulty"
              value={questionConfig?.difficulty}
              onChange={handleChangeQuizConfig}
              className="w-full bg-white rounded-lg border border-slate-300 p-6 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
            >
              <option selected>Select Difficulty</option>
              {difficultyOptions.map(cat => (
                <option key={`category_${cat.value}`} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="h-5 w-5 absolute top-1/2 right-4 -translate-y-1/2 text-slate-950" />
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col justify-start gap-y-3">
          <label htmlFor="amount" className="font-medium text-slate-950">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            defaultValue={0}
            value={questionConfig?.amount}
            onChange={handleChangeQuizConfig}
            className="w-full bg-white rounded-lg border border-slate-300 p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-5 w-full justify-end">
        <button
          onClick={handleResetQuizConfig}
          className="w-[10rem] border border-slate-300 text-slate-950 text-center py-4 rounded-lg shadow-lg "
        >
          Reset
        </button>
        <button
          type="submit"
          className="w-[12rem] bg-blue-600 text-white text-center py-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:shadow-inner"
        >
          Start Quiz
        </button>
      </div>
    </form>
  );
};
