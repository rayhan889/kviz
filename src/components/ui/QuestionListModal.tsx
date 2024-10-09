import React from "react";
import ReactModal from "react-modal";
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
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-[22.75rem] h-[11.5rem] bg-white rounded-lg flex flex-col gap-y-5 justify-start p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <IoClose
        className="h-5 w-5 text-slate-950 cursor-pointer"
        onClick={onClose}
      />
      <div className="w-full grid grid-cols-5 gap-3">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className="w-[3.125rem] h-11 flex justify-center items-center rounded text-slate-950 border border-slate-300"
          >
            {idx + 1}
          </div>
        ))}
      </div>
    </ReactModal>
  );
};

export default QuestionListModal;
