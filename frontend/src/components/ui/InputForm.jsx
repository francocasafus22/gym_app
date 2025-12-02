export default function InputForm({
  label,
  name,
  type = "text",
  id = label.toLowerCase(),
  value,
  onChange,
  placeholder,
  register,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-md text-start text-secondary">{label}</label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full border shadow-md  border-border p-3 rounded-lg focus:outline-none transition-all duration-200  focus:border-accent placeholder:text-placeholder/90 text-secondary-foreground"
        name={id}
        {...register ? {...register(name, {required})} : {value: value, onChange: onChange}}             
        required={required}
      />
    </div>
  );
}
