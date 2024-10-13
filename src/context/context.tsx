import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { QuestionConfig } from "../types/QuestionConfig";
import { Question } from "../types/Question";
import { KeyAnswerAndQuestion } from "../types/KeyAnswerAndQuestion";

type QuestionConfigContextProps = {
  questionConfig: QuestionConfig | undefined;
  setQuestionConfig: React.Dispatch<React.SetStateAction<QuestionConfig>>;
  apiUrl: string;
  setApiUrl: React.Dispatch<React.SetStateAction<string>>;
  questions: Question[];
  setCurrentQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  keyAnswers: KeyAnswerAndQuestion[];
  setKeyAnswers: React.Dispatch<React.SetStateAction<KeyAnswerAndQuestion[]>>;
  persistedKeyAnswers: KeyAnswerAndQuestion[];
  setPersistedKeyAnswers: React.Dispatch<
    React.SetStateAction<KeyAnswerAndQuestion[]>
  >;
};

const QuestionConfigContext = createContext<
  QuestionConfigContextProps | undefined
>(undefined);

export const QuestionConfigProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [questionConfig, setQuestionConfig] = useState<QuestionConfig>({
    category: "",
    difficulty: "",
    amount: 0,
  });
  const [apiUrl, setApiUrl] = useState<string>(
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=boolean"
  );
  const [questions, setCurrentQuestions] = useState<Question[]>([]);
  const [keyAnswers, setKeyAnswers] = useState<KeyAnswerAndQuestion[]>([]);
  const [persistedKeyAnswers, setPersistedKeyAnswers] = useState<
    KeyAnswerAndQuestion[]
  >([]);

  return (
    <QuestionConfigContext.Provider
      value={{
        questionConfig,
        setQuestionConfig,
        apiUrl,
        setApiUrl,
        questions,
        setCurrentQuestions,
        keyAnswers,
        setKeyAnswers,
        persistedKeyAnswers,
        setPersistedKeyAnswers,
      }}
    >
      {children}
    </QuestionConfigContext.Provider>
  );
};

export const useQuestionConfig = () => {
  const questionConfig = useContext(QuestionConfigContext);

  if (questionConfig === undefined) {
    throw new Error(
      "useQuestionConfig must be used within a QuestionConfigProvider"
    );
  }

  return questionConfig;
};
