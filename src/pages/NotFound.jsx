import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">

      <h1 className="text-8xl font-black">

        404

      </h1>

      <p className="mt-3">

        Halaman tidak ditemukan

      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-red-700 px-6 py-3 text-white"
      >
        Kembali
      </Link>

    </div>
  );
}

export default NotFound;