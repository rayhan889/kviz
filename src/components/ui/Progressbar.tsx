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

export default ProgressBar;
