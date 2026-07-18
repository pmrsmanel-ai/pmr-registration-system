import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Globe,
  House,
  Calendar,
  CircleHelp,
  Users,
  GraduationCap,
  FileSpreadsheet,
  Settings,
  LogOut,
} from "lucide-react";

import { supabase } from "../../services/supabase";

function Sidebar({

  selected,

  setSelected,

}) {

  const [websiteOpen, setWebsiteOpen] =
    useState(true);

  const [registrationOpen, setRegistrationOpen] =
    useState(true);

  async function logout() {

    const ok = window.confirm(
      "Keluar dari Dashboard?"
    );

    if (!ok) return;

    await supabase.auth.signOut();

    window.location.href = "/login";

  }

  return (

    <aside className="flex h-screen w-64 flex-col bg-red-700 text-white">

      {/* HEADER */}

      <div className="border-b border-red-600 px-6 py-6">

        <img

          src={`${import.meta.env.BASE_URL}images/logo-pmr.png`}

          className="mx-auto h-20 w-auto"

          alt="Logo PMR"

        />

        <h2 className="mt-4 text-center text-xl font-black">

          Admin PMR

        </h2>

        <p className="mt-1 text-center text-sm text-red-100">

          SMAN 1 AIKMEL

        </p>

      </div>

      {/* MENU */}

      <div className="flex-1 overflow-y-auto px-3 py-4">

        <MenuButton

          active={selected === "dashboard"}

          icon={<LayoutDashboard size={20} />}

          label="Dashboard"

          onClick={() =>

            setSelected("dashboard")

          }

        />

        {/* WEBSITE */}

        <button

          onClick={() =>

            setWebsiteOpen(

              !websiteOpen

            )

          }

          className="mt-4 flex w-full items-center justify-between rounded-2xl px-4 py-3 font-semibold transition hover:bg-red-600"

        >

          <div className="flex items-center gap-3">

            <Globe size={20} />

            Website

          </div>

          {

            websiteOpen

              ?

              <ChevronDown size={18}/>

              :

              <ChevronRight size={18}/>

          }

        </button>

        {

          websiteOpen && (

            <div className="ml-6 mt-2 space-y-2">

              <MenuButton

                active={selected==="homepage"}

                icon={<House size={18}/>}

                label="Homepage"

                small

                onClick={()=>{

                  setSelected("homepage")

                }}

              />

              <MenuButton

                active={selected==="timeline"}

                icon={<Calendar size={18}/>}

                label="Timeline"

                small

                onClick={()=>{

                  setSelected("timeline")

                }}

              />

              <MenuButton

                active={selected==="faq"}

                icon={<CircleHelp size={18}/>}

                label="FAQ"

                small

                onClick={()=>{

                  setSelected("faq")

                }}

              />

            </div>

          )

        }

        {/* PENDAFTARAN */}

        <button

          onClick={()=>{

            setRegistrationOpen(

              !registrationOpen

            )

          }}

          className="mt-4 flex w-full items-center justify-between rounded-2xl px-4 py-3 font-semibold transition hover:bg-red-600"

        >

          <div className="flex items-center gap-3">

            <Users size={20}/>

            Pendaftaran

          </div>

          {

            registrationOpen

              ?

              <ChevronDown size={18}/>

              :

              <ChevronRight size={18}/>

          }

        </button>

        {

          registrationOpen && (

            <div className="ml-6 mt-2 space-y-2">

              <MenuButton

                active={selected==="applicants"}

                icon={<Users size={18}/>}

                label="Data Pendaftar"

                small

                onClick={()=>{

                  setSelected("applicants")

                }}

              />

              <MenuButton

                active={selected==="graduation"}

                icon={<GraduationCap size={18}/>}

                label="Kelulusan"

                small

                onClick={()=>{

                  setSelected("graduation")

                }}

              />
                            <MenuButton

                active={selected==="export"}

                icon={<FileSpreadsheet size={18}/>}

                label="Export Excel"

                small

                onClick={()=>{

                  setSelected("export")

                }}

              />

            </div>

          )

        }

        {/* PENGATURAN */}

        <div className="mt-4">

          <MenuButton

            active={selected==="settings"}

            icon={<Settings size={20}/>}

            label="Pengaturan"

            onClick={()=>{

              setSelected("settings")

            }}

          />

        </div>

      </div>

      {/* FOOTER */}

      <div className="border-t border-red-600 p-4">

        <button

          onClick={logout}

          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white py-3.5 font-semibold transition hover:bg-white hover:text-red-700"

        >

          <LogOut size={20}/>

          Keluar

        </button>

      </div>

    </aside>

  );

}

/* ==========================================
   MENU BUTTON
========================================== */

function MenuButton({

  icon,

  label,

  active,

  onClick,

  small = false,

}) {

  return (

    <button

      onClick={onClick}

className={`
  flex
  w-full
  items-center
  gap-3
  rounded-2xl
  transition-all
  duration-200
  ${
    small
      ? "px-3 py-2.5"
      : "px-4 py-3"
  }
  ${
    active
      ? "bg-white text-red-700 shadow-md scale-[1.02]"
      : "hover:bg-red-600/80"
  }
`}

    >

      {icon}

      <span className="font-semibold">

        {label}

      </span>

    </button>

  );

}

export default Sidebar;