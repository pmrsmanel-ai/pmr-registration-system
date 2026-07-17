import { useEffect, useMemo, useState } from "react";

import { supabase } from "../services/supabase";
import { exportApplicants } from "../utils/exportExcel";

import Sidebar from "../components/admin/Sidebar";
import ApplicantModal from "../components/admin/ApplicantModal";

import HomepagePage from "../components/admin/pages/HomepagePage";
import TimelinePage from "../components/admin/pages/TimelinePage";
import FAQManager from "../components/admin/FAQManager";
import GraduationPage from "../components/admin/GraduationPage";

import DashboardPage from "../components/admin/pages/DashboardPage";
import ApplicantsPage from "../components/admin/pages/ApplicantsPage";

import SettingsPage from "../components/admin/SettingsPage";

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

  const [applicants, setApplicants] =
    useState([]);

  const [selectedApplicant, setSelectedApplicant] =
    useState(null);

  const [search, setSearch] =
    useState("");

  async function loadData(){

    try{

      setLoading(true);

      const [

        dashboard,

        data,

      ] = await Promise.all([

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

    const channel =

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

  const filteredApplicants =

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
  return (

  <div className="flex min-h-screen bg-gray-100">

    <Sidebar

      selected={selectedMenu}

      setSelected={setSelectedMenu}

    />

    <main className="flex-1 p-8">

      {/* ==========================================
          DASHBOARD
      ========================================== */}

      {selectedMenu === "dashboard" && (

        <DashboardPage

          stats={stats}

        />

      )}

      {/* ==========================================
          DATA PENDAFTAR
      ========================================== */}

      {selectedMenu === "applicants" && (

        <ApplicantsPage

          applicants={filteredApplicants}

          search={search}

          setSearch={setSearch}

          onDetail={setSelectedApplicant}

          onExport={() =>

            exportApplicants(

              applicants,

              "Semua-Pendaftar"

            )

          }

        />

      )}

      {/* ==========================================
    HOMEPAGE
========================================== */}

{selectedMenu === "homepage" && (

  <HomepagePage />

)}

      {/* ==========================================
          TIMELINE
      ========================================== */}

      {selectedMenu === "timeline" && (

    <TimelinePage />

)}

      {/* ==========================================
          FAQ
      ========================================== */}

      {selectedMenu === "faq" && (

        <FAQManager />

      )}

      {/* ==========================================
          KELULUSAN
      ========================================== */}

      {selectedMenu === "graduation" && (

  <GraduationPage

    applicants={applicants}

    onRefresh={loadData}

  />

)}

      {/* ==========================================
          SETTINGS
      ========================================== */}

      {selectedMenu === "settings" && (

        <SettingsPage />

      )}

      {/* ==========================================
          EXPORT
      ========================================== */}

      {selectedMenu === "export" && (

        <ApplicantsPage

          applicants={filteredApplicants}

          search={search}

          setSearch={setSearch}

          onDetail={setSelectedApplicant}

          onExport={() =>

            exportApplicants(

              applicants,

              "Semua-Pendaftar"

            )

          }

        />

      )}

      {selectedApplicant && (

        <ApplicantModal

          applicant={selectedApplicant}

          onClose={() =>

            setSelectedApplicant(null)

          }

          onRefresh={loadData}

        />

      )}

    </main>

  </div>

);

/* ==========================================
   TABLE LOADING
========================================== */

function TableLoading() {

  return (

    <div className="flex items-center justify-center">

      <div
        className="h-14 w-14 animate-spin rounded-full border-4 border-red-200 border-t-red-700"
      />

    </div>

  );

}}

export default Admin;