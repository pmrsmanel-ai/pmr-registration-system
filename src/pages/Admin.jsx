import { useEffect, useMemo, useState } from "react";

import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { supabase } from "../services/supabase";
import { exportApplicants } from "../utils/exportExcel";

import Sidebar from "../components/admin/Sidebar";
import ApplicantModal from "../components/admin/ApplicantModal";
import StatusBadge from "../components/admin/StatusBadge";

import HomepageStats from "../components/admin/HomepageStats";
import TimelineModal from "../components/admin/TimelineModal";
import SettingsModal from "../components/admin/SettingsModal";

import {
  getApplicants,
  getDashboardStats,
} from "../services/adminApi";

function Admin() {

  const [loading, setLoading] =
    useState(true);

  const [selectedMenu, setSelectedMenu] =
    useState("dashboard");

  const [stats, setStats] =
    useState({

      total:0,

      pending:0,

      accepted:0,

      rejected:0,

    });

  const [applicants,setApplicants] =
    useState([]);

  const [selectedApplicant,setSelectedApplicant] =
    useState(null);

  const [search,setSearch] =
    useState("");

  async function loadData(){

    try{

      setLoading(true);

      const [

        dashboard,

        data,

      ]=await Promise.all([

        getDashboardStats(),

        getApplicants(),

      ]);

      setStats(dashboard);

      setApplicants(data);

    }

    catch(err){

      console.error(err);

    }

    finally{

      setLoading(false);

    }

  }

  useEffect(()=>{

    loadData();

    const channel=

      supabase

      .channel("admin-applicants")

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"applicants",

        },

        ()=>{

          loadData();

        }

      )

      .subscribe();

    return ()=>{

      supabase.removeChannel(channel);

    };

  },[]);

  const filteredApplicants=

    useMemo(()=>{

      if(!search)

        return applicants;

      return applicants.filter(item=>{

        return(

          item.full_name

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          )

          ||

          item.registration_number

          ?.toLowerCase()

          .includes(

            search.toLowerCase()

          )

        );

      });

    },[

      applicants,

      search,

    ]);

  if(loading){

    return(

      <div className="flex min-h-screen items-center justify-center">

        <TableLoading/>

      </div>

    );

  }

  return(

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar

        selected={selectedMenu}

        setSelected={setSelectedMenu}

      />

      <main className="flex-1 p-8">
                {/* ==========================================
            HOMEPAGE
        ========================================== */}

        {selectedMenu === "homepage" && (

          <HomepageStats

            onClose={() =>
              setSelectedMenu("dashboard")
            }

          />

        )}

        {/* ==========================================
            TIMELINE
        ========================================== */}

        {selectedMenu === "timeline" && (

          <TimelineModal

            onClose={() =>
              setSelectedMenu("dashboard")
            }

          />

        )}

        {/* ==========================================
            SETTINGS
        ========================================== */}

        {selectedMenu === "settings" && (

          <SettingsModal

            onClose={() =>
              setSelectedMenu("dashboard")
            }

          />

        )}

        {/* ==========================================
            DASHBOARD
        ========================================== */}

        {(selectedMenu === "dashboard" ||
          selectedMenu === "applicants" ||
          selectedMenu === "export") && (

          <>

            <div className="mb-8">

              <h1 className="text-4xl font-black">

                Dashboard Admin

              </h1>

              <p className="mt-2 text-gray-500">

                Portal PMR SMAN 1 AIKMEL

              </p>

            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <DashboardCard

                title="Total Pendaftar"

                value={stats.total}

                color="bg-red-600"

                icon={<Users size={34} />}

              />

              <DashboardCard

                title="Menunggu"

                value={stats.pending}

                color="bg-yellow-500"

                icon={<Clock3 size={34} />}

              />

              <DashboardCard

                title="Diterima"

                value={stats.accepted}

                color="bg-green-600"

                icon={<CheckCircle2 size={34} />}

              />

              <DashboardCard

                title="Ditolak"

                value={stats.rejected}

                color="bg-gray-700"

                icon={<XCircle size={34} />}

              />

            </div>

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <input

                type="text"

                placeholder="Cari Nama atau Nomor Pendaftaran..."

                value={search}

                onChange={(e) =>
                  setSearch(e.target.value)
                }

                className="w-full rounded-2xl border bg-white px-5 py-4 outline-none focus:border-red-600 lg:max-w-xl"

              />

              <div className="flex flex-wrap gap-3">

                <button

                  onClick={() =>

                    exportApplicants(

                      applicants,

                      "Semua-Pendaftar"

                    )

                  }

                  className="rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"

                >

                  Export Semua

                </button>

                <button

                  onClick={() =>

                    exportApplicants(

                      applicants.filter(

                        item =>

                          item.status ===

                          "Menunggu Verifikasi"

                      ),

                      "Pendaftar-Menunggu"

                    )

                  }

                  className="rounded-2xl bg-yellow-500 px-6 py-4 font-semibold text-white hover:bg-yellow-600"

                >

                  Menunggu

                </button>

                <button

                  onClick={() =>

                    exportApplicants(

                      applicants.filter(

                        item =>

                          item.status ===

                          "Diterima"

                      ),

                      "Pendaftar-Diterima"

                    )

                  }

                  className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700"

                >

                  Diterima

                </button>

                <button

                  onClick={() =>

                    exportApplicants(

                      applicants.filter(

                        item =>

                          item.status ===

                          "Ditolak"

                      ),

                      "Pendaftar-Ditolak"

                    )

                  }

                  className="rounded-2xl bg-red-600 px-6 py-4 font-semibold text-white hover:bg-red-700"

                >

                  Ditolak

                </button>

              </div>

            </div>
                        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

              <table className="w-full">

                <thead className="bg-red-700 text-white">

                  <tr>

                    <th className="px-5 py-4 text-left">
                      No
                    </th>

                    <th className="px-5 py-4 text-left">
                      Nomor
                    </th>

                    <th className="px-5 py-4 text-left">
                      Nama
                    </th>

                    <th className="px-5 py-4 text-left">
                      Kelas
                    </th>

                    <th className="px-5 py-4 text-left">
                      Status
                    </th>

                    <th className="px-5 py-4 text-center">
                      Aksi
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredApplicants.length === 0 ? (

                      <tr>

                        <td
                          colSpan={6}
                          className="py-10"
                        >

                          <EmptyState />

                        </td>

                      </tr>

                    ) : (

                      filteredApplicants.map(

                        (item, index) => (

                          <tr

                            key={item.id}

                            className="border-b hover:bg-gray-50"

                          >

                            <td className="px-5 py-4">

                              {index + 1}

                            </td>

                            <td className="px-5 py-4 font-semibold">

                              {item.registration_number}

                            </td>

                            <td className="px-5 py-4">

                              {item.full_name}

                            </td>

                            <td className="px-5 py-4">

                              {item.class}

                            </td>

                            <td className="px-5 py-4">

                              <StatusBadge

                                status={item.status}

                              />

                            </td>

                            <td className="px-5 py-4 text-center">

                              <button

                                onClick={() =>

                                  setSelectedApplicant(

                                    item

                                  )

                                }

                                className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"

                              >

                                Detail

                              </button>

                            </td>

                          </tr>

                        )

                      )

                    )

                  }

                </tbody>

              </table>

            </div>

          </>

        )}

        {

          selectedApplicant && (

            <ApplicantModal

              applicant={selectedApplicant}

              onClose={() =>

                setSelectedApplicant(null)

              }

              onRefresh={loadData}

            />

          )

        }

      </main>

    </div>

  );

}
/* ==========================================
   DASHBOARD CARD
========================================== */

function DashboardCard({

  title,

  value,

  color,

  icon,

}) {

  return (

    <div

      className={`${color} rounded-3xl p-7 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}

    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm opacity-90">

            {title}

          </p>

          <h2 className="mt-3 text-5xl font-black">

            {value}

          </h2>

        </div>

        <div className="rounded-2xl bg-white/20 p-4">

          {icon}

        </div>

      </div>

    </div>

  );

}

/* ==========================================
   EMPTY STATE
========================================== */

function EmptyState() {

  return (

    <div className="flex flex-col items-center justify-center py-16">

      <img

        src="/images/empty-data.svg"

        alt="Empty"

        className="mb-6 h-40"

        onError={(e)=>{

          e.currentTarget.style.display="none";

        }}

      />

      <h2 className="text-2xl font-bold text-gray-700">

        Belum Ada Data

      </h2>

      <p className="mt-2 text-gray-500">

        Belum ada peserta yang mendaftar.

      </p>

    </div>

  );

}

/* ==========================================
   TABLE LOADING
========================================== */

function TableLoading(){

  return(

    <div className="flex items-center justify-center">

      <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-200 border-t-red-700"/>

    </div>

  );

}

export default Admin;