import { Link } from "react-router-dom";
import Container from "../layout/Container";
import { ArrowRight } from "lucide-react";

function Cta() {
  return (
    <section className="py-24">
      <Container>

        <div className="overflow-hidden rounded-[32px] bg-red-700 p-12 text-center text-white lg:p-16">

          <h2 className="text-4xl font-bold">
            Siap Menjadi Bagian dari PMR?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-red-100">
            Jangan lewatkan kesempatan untuk belajar, berkembang,
            dan berkontribusi dalam kegiatan kemanusiaan.
          </p>

          <Link
            to="/register"
            className="mx-auto mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-red-700 transition hover:scale-105"
          >
            Daftar Sekarang
            <ArrowRight size={18} />
          </Link>

        </div>

      </Container>
    </section>
  );
}

export default Cta;