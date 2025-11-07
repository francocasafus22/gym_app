export default function InputForm({
  label,
  type = "text",
  id = label.toLowerCase(),
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-md text-start text-secondary-foreground">
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full border shadow-md border-border p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent placeholder:text-border/110"
        name={id}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
}
