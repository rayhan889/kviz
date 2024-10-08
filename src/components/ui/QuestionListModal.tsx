import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { Question } from "../QuestionPage";

interface QuestionListModalProps {
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
}

const QuestionListModal: React.FC<QuestionListModalProps> = ({
  questions,
  isOpen,
  onClose,
}: QuestionListModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-[22.75rem] h-[11.5rem] bg-white rounded-lg flex flex-col gap-y-5 justify-start"
    >
      <IoClose
        className="h-5 w-5 text-slate-950 cursor-pointer"
        onClick={onClose}
      />
      <div className="w-full grid grid-cols-5 gap-3">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className="w-[3.125rem] h-11 text-center rounded text-slate-950 border border-slate-300"
          >
            {idx + 1}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default QuestionListModal;
