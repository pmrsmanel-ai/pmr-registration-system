import { Link } from "react-router-dom";
import { Menu, HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "./Container";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menus = [
    {
      title: "Tentang",
      href: "#tentang",
    },
    {
      title: "Timeline",
      href: "#timeline",
    },
    {
      title: "FAQ",
      href: "#faq",
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-4">
      <Container>
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "rounded-3xl border border-gray-200 bg-white/90 shadow-xl backdrop-blur-xl"
              : "rounded-3xl bg-white/80 backdrop-blur-md"
          }`}
        >
          <div className="flex h-20 items-center justify-between px-6 lg:px-8">
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-700 text-white shadow-lg">
                <HeartHandshake size={24} />
              </div>

              <div>
                <h1 className="text-lg font-extrabold text-gray-900">
                  PMR SMANEL
                </h1>

                <p className="text-xs text-gray-500">
                  SMAN 1 AIKMEL
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-10 md:flex">
              {menus.map((menu) => (
                <a
                  key={menu.title}
                  href={menu.href}
                  className="font-medium text-gray-600 transition hover:text-red-700"
                >
                  {menu.title}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Link
                to="/register"
                className="rounded-2xl bg-red-700 px-7 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl"
              >
                Daftar Sekarang
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="rounded-xl border border-gray-200 p-2 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>

          {open && (
            <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">
              <div className="space-y-4">
                {menus.map((menu) => (
                  <a
                    key={menu.title}
                    href={menu.href}
                    onClick={() => setOpen(false)}
                    className="block font-medium text-gray-700"
                  >
                    {menu.title}
                  </a>
                ))}

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="mt-4 block rounded-2xl bg-red-700 py-3 text-center font-semibold text-white"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Navbar;