import Container from "./Container";
import { Phone, Mail } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-b from-red-700 to-red-800 text-white">

      <Container>

        <div className="grid gap-10 py-14 md:grid-cols-4">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-4">

              {/* Logo */}

<div className="flex items-center justify-center md:justify-start">

{/* Logo */}

<div className="flex items-center justify-center md:justify-start">

              <img
                src="/images/logo-pmr.png"
                alt="Logo PMR SMANEL"
                className="h-36 w-36 object-contain"
              />

</div>

</div>

              <div>

                <h3 className="text-xl font-bold">
                  PMR SMANEL
                </h3>

                <p className="mt-2 text-red-100 leading-7">
                  Muda Beraksi,
                  <br />
                  Kemanusiaan Menginspirasi
                </p>

              </div>

            </div>

          </div>

          {/* Kontak */}

          <div>

            <h3 className="mb-6 text-xl font-bold">
              Kontak Kami
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>0812-3456-7890</span>
              </div>

              <div className="flex items-center gap-3">
                <FaInstagram size={18} />
                <span>@pmr_smanel</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>pmrsmanel@gmail.com</span>
              </div>

            </div>

          </div>

          {/* Menu */}

          <div>

            <h3 className="mb-6 text-xl font-bold">
              Tautan Cepat
            </h3>

            <div className="space-y-3">

              <a
                href="/"
                className="block transition hover:text-red-200"
              >
                Beranda
              </a>

              <a
                href="#tentang"
                className="block transition hover:text-red-200"
              >
                Info PMR
              </a>

              <a
                href="#persyaratan"
                className="block transition hover:text-red-200"
              >
                Persyaratan
              </a>

              <a
                href="#timeline"
                className="block transition hover:text-red-200"
              >
                Alur Pendaftaran
              </a>

            </div>

          </div>

          {/* Sosial Media */}

          <div>

            <h3 className="mb-6 text-xl font-bold">
              Ikuti Kami
            </h3>

            <div className="flex gap-4">

              <a
                href="https://instagram.com/pmr_smanel"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-red-700"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-red-700"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-red-700"
              >
                <FaYoutube size={20} />
              </a>

              <a
                href="https://tiktok.com/@pmr_smanel"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-red-700"
              >
                <FaTiktok size={20} />
              </a>

            </div>

          </div>

        </div>

      </Container>

      {/* Bottom */}

      <div className="border-t border-red-600 bg-red-900/20">

        <Container>

          <div className="py-5 text-center text-sm text-red-100">
            © 2026 PMR SMAN 1 AIKMEL. All rights reserved.
          </div>

        </Container>

      </div>

    </footer>
  );
}

export default Footer;