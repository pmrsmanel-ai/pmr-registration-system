import { Link } from "react-router-dom";
import {
  Menu,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState, Fragment } from "react";
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
    type: "anchor",
  },
  {
    title: "Timeline",
    href: "#timeline",
    type: "anchor",
  },
  {
    title: "FAQ",
    href: "#faq",
    type: "anchor",
  },
  {
    title: "🎓 Hasil Seleksi",
    href: "/graduation",
    type: "route",
  },
];

function scrollToSection(id) {
  const section = document.querySelector(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setOpen(false);
}

function renderMenu(menu, mobile = false) {
  const baseClass = mobile
    ? "block font-medium text-gray-700 transition hover:text-red-700"
    : "font-medium text-gray-600 transition hover:text-red-700";

  if (menu.type === "route") {
    return (
      <Link
        key={menu.title}
        to={menu.href}
        onClick={() => mobile && setOpen(false)}
        className={baseClass}
      >
        {menu.title}
      </Link>
    );
  }

  return (
   <a
  key={menu.title}
  href={menu.href}
  onClick={(e) => {

    e.preventDefault();

    scrollToSection(menu.href);

    if (mobile) {

      setOpen(false);

    }

  }}
  className={baseClass}
>
      {menu.title}
    </a>
  );
}

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
  <h1 className="text-lg font-extrabold tracking-tight text-gray-900">
    PMR SMANEL
  </h1>

  <p className="text-xs font-medium text-gray-500">
    Official Registration System
  </p>
</div>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
  {menus.map((menu, index) => (

  <div
    key={menu.title}
    className="flex items-center gap-8"
  >

    {index === 3 && (

      <div className="h-5 w-px bg-gray-300" />

    )}

    {renderMenu(menu)}

  </div>

))}

</nav>

            <div className="hidden md:block">
              <Link
  to="/register"
  className="group inline-flex items-center gap-2 rounded-2xl bg-red-700 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl"
>
  Gabung PMR

  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
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
                {menus.map((menu, index) => (
  <React.Fragment key={menu.title}>
    {index === 3 && (
      <div className="h-5 w-px bg-gray-300" />
    )}

    {renderMenu(menu)}
  </React.Fragment>
))}

                <Link
  to="/register"
  onClick={() => setOpen(false)}
  className="group mt-4 flex items-center justify-center gap-2 rounded-2xl bg-red-700 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-800"
>
  Gabung PMR

  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
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