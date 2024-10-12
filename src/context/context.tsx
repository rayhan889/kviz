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

  return (
    <QuestionConfigContext.Provider
      value={{ questionConfig, setQuestionConfig }}
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
