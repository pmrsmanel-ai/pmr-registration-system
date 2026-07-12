import { useLocation, Link } from "react-router-dom";
import { useRef } from "react";

import {
  CircleCheckBig,
  House,
} from "lucide-react";

import Layout from "../components/layout/Layout";
import RegistrationCard from "../components/registration/RegistrationCard";
import DownloadButton from "../components/registration/DownloadButton";

function Success() {
  const { state } = useLocation();

  const cardRef = useRef();

  if (!state) {
    return (
      <Layout>
        <div className="py-32 text-center">

          <h1 className="text-3xl font-bold">
            Data tidak ditemukan
          </h1>

          <Link
            to="/"
            className="mt-8 inline-block rounded-xl bg-red-700 px-8 py-4 text-white"
          >
            Kembali
          </Link>

        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <section className="bg-gray-50 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">

            <CircleCheckBig
              className="mx-auto text-green-600"
              size={80}
            />

            <h1 className="mt-6 text-5xl font-black">
              Pendaftaran Berhasil
            </h1>

            <p className="mt-4 text-lg text-gray-500">
              Simpan bukti pendaftaran sebagai
              bukti registrasi.
            </p>

          </div>

          <RegistrationCard
            ref={cardRef}
            data={state}
          />

          <div className="mx-auto mt-10 flex max-w-xl gap-4">

            <DownloadButton
              cardRef={cardRef}
              registrationNumber={
                state.registrationNumber
              }
            />

            <Link
              to="/"
              className="flex items-center justify-center gap-3 rounded-2xl border px-8 py-4 font-semibold"
            >
              <House size={20} />

              Beranda
            </Link>

          </div>

        </div>

      </section>

    </Layout>
  );
}

export default Success;