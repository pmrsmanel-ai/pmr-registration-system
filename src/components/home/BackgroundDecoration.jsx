function BackgroundDecoration() {
  return (
    <>
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-200/40 blur-3xl"></div>

      <div className="absolute top-40 -right-32 h-80 w-80 rounded-full bg-red-100 blur-3xl"></div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
    </>
  );
}

export default BackgroundDecoration;