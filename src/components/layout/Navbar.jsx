import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  HeartHandshake,
  ArrowRight,
  House,
  Info,
  CalendarDays,
  CircleHelp,
  GraduationCap,
} from "lucide-react";

import { useEffect, useState, Fragment } from "react";
import Container from "./Container";

function Navbar() {
const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {

  if (open) {

    document.body.style.overflow = "hidden";

  } else {

    document.body.style.overflow = "";

  }

  return () => {

    document.body.style.overflow = "";

  };

}, [open]);

  const menus = [
  {
    title: "Tentang",
    href: "#tentang",
    type: "anchor",
    icon: Info,
  },
  {
    title: "Timeline",
    href: "#timeline",
    type: "anchor",
    icon: CalendarDays,
  },
  {
    title: "FAQ",
    href: "#faq",
    type: "anchor",
    icon: CircleHelp,
  },
  {
    title: "Hasil Seleksi",
    href: "/graduation",
    type: "route",
    icon: GraduationCap,
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
  const Icon = menu.icon;

  if (menu.type === "route") {
    return (
      <Link
        key={menu.title}
        to={menu.href}
        onClick={() => mobile && setOpen(false)}
        className={
          mobile
            ? "flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-red-700"
            : "flex items-center gap-2 font-medium text-gray-600 transition hover:text-red-700"
        }
      >
        <Icon size={20} />
        <span>{menu.title}</span>
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
      className={
        mobile
          ? "flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-red-700"
          : "flex items-center gap-2 font-medium text-gray-600 transition hover:text-red-700"
      }
    >
      <Icon size={20} />
      <span>{menu.title}</span>
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
          <div className="flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-700 text-white shadow-lg sm:h-12 sm:w-12">
                <HeartHandshake className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div>
  <h1 className="text-base font-extrabold tracking-tight text-gray-900 sm:text-lg">
    PMR SMANEL
  </h1>

  <p className="hidden text-xs font-medium text-gray-500 sm:block">
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
  aria-label="Toggle navigation"
  aria-expanded={open}
  aria-controls="mobile-menu"
  className="rounded-xl border border-gray-200 p-2 transition hover:bg-gray-50 md:hidden"
>
              {open ? (
  <X size={24} />
) : (
  <Menu size={24} />
)}
            </button>
          </div>

          {open && (
           <div
  id="mobile-menu"
  className="border-t border-gray-200 bg-white px-6 py-5 md:hidden"
>
  <div className="space-y-2">
  {menus.map((menu, index) => (
    <Fragment key={menu.title}>
      {index === 3 && (
        <div className="my-3 border-t border-gray-200" />
      )}

      {renderMenu(menu, true)}
    </Fragment>
  ))}

  <Link
    to="/register"
    onClick={() => setOpen(false)}
    className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-red-700 py-4 font-semibold text-white transition hover:bg-red-800"
  >
    Gabung PMR

    <ArrowRight size={18} />
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