import {
  Heart,
  Instagram,
  Globe,
  Phone,
} from "lucide-react";

function Footer() {

  const year = new Date().getFullYear();

  return (

    <footer className="relative overflow-hidden rounded-b-[40px] bg-gradient-to-r from-red-700 via-red-600 to-red-500">

      {/* Background Decoration */}

      <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative px-10 py-10 text-white">

        <div className="flex flex-col items-center gap-5">

          <Heart
            size={42}
            className="fill-white"
          />

          <h2 className="text-3xl font-black">

            Together We Can,

          </h2>

          <h3 className="text-2xl font-bold text-red-100">

            We Are Not Alone

          </h3>

          <div className="mt-2 h-px w-60 bg-white/30"></div>

          <div className="mt-3 flex flex-wrap justify-center gap-6 text-sm">

            <div className="flex items-center gap-2">

              <Instagram size={18} />

              <span>@pmrsmanel</span>

            </div>

            <div className="flex items-center gap-2">

              <Globe size={18} />

              <span>pmrsmanel.my.id</span>

            </div>

            <div className="flex items-center gap-2">

              <Phone size={18} />

              <span>PMR SMAN 1 AIKMEL</span>

            </div>

          </div>

          <p className="mt-6 text-center text-sm leading-7 text-red-100">

            Official Registration System

            <br />

            © {year} PMR SMAN 1 AIKMEL

          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;