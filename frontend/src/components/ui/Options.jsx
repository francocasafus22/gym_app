export default function Options({
  label,
  setOption,
  value,
  options,
  length = options.length,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-md text-start text-gray-400">{label}</label>

      <div className={`grid grid-cols-1 md:grid-cols-${length} gap-2`}>
        {options.map((option) => (
          <div
            key={option}
            className={`hover:bg-accent border border-border transition-all duration-200 text-center cursor-pointer rounded-lg p-2 shadow-xl ${option === value ? "bg-accent" : ""}`}
            onClick={() => setOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
