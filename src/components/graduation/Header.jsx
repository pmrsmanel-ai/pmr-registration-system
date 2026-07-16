function Header() {
  return (
    <div className="relative overflow-hidden rounded-t-[40px] bg-white">

      {/* Background Glow */}

      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-100 blur-3xl opacity-60"></div>

      <div className="absolute -right-24 -top-20 h-56 w-56 rounded-full bg-red-50 blur-3xl opacity-80"></div>

      {/* Logo Area */}

      <div className="relative z-10 flex items-center justify-center px-10 pt-8">

        <div className="flex w-full max-w-5xl items-center justify-between rounded-full bg-white px-10 py-6 shadow-xl ring-1 ring-gray-100">

          <img
            src={`${import.meta.env.BASE_URL}images/logo-header.png`}
            alt="Header Logo"
            className="h-24 object-contain"
          />

        </div>

      </div>

      {/* Title */}

      <div className="relative z-10 mt-8 text-center">

        <p className="text-xl font-semibold tracking-[0.35em] text-gray-700">

          PENERIMAAN ANGGOTA BARU

        </p>

        <h1 className="mt-3 text-6xl font-black uppercase text-red-700">

          PMR SMAN 1 AIKMEL

        </h1>

      </div>

    </div>
  );
}

export default Header;