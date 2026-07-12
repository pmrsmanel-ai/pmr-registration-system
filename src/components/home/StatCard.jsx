export default function StatCard({
  icon: Icon,
  value,
  title,
  color = "red",
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-8
        text-center
        border
        border-gray-100
        hover:-translate-y-1
      "
    >
      <div
        className={`
          w-16
          h-16
          mx-auto
          rounded-2xl
          flex
          items-center
          justify-center
          bg-${color}-100
        `}
      >
        <Icon
          size={34}
          className={`text-${color}-600`}
        />
      </div>

      <h2 className="mt-6 text-4xl font-black text-slate-900">
        {value}
      </h2>

      <p className="mt-3 text-gray-600 font-medium">
        {title}
      </p>
    </div>
  );
}