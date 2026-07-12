function ProgressBar({ currentStep }) {
  const percent = ((currentStep - 1) / 4) * 100;

  return (
    <div className="mb-8">

      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm font-semibold text-gray-600">
          Progress
        </span>

        <span className="text-sm font-bold text-red-700">
          {percent}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-red-700 transition-all duration-500"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>
  );
}

export default ProgressBar;