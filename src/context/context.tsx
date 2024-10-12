import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { QuestionConfig } from "../types/QuestionConfig";

type QuestionConfigContextProps = {
  questionConfig: QuestionConfig | undefined;
  setQuestionConfig: React.Dispatch<React.SetStateAction<QuestionConfig>>;
  apiUrl: string;
  setApiUrl: React.Dispatch<React.SetStateAction<string>>;
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

  return (
    <QuestionConfigContext.Provider
      value={{ questionConfig, setQuestionConfig, apiUrl, setApiUrl }}
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
