export default function Loading({ color = "accent" }) {
  return (
    <div className="flex justify-center items-center ">
      <div
        className={`w-8 h-8 border-4 border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
