import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";

import TimelineTable from "../../components/admin/TimelineTable";

import {
  getTimeline,
} from "../../services/timelineApi";

function Timeline() {

  const [loading, setLoading] =
    useState(true);

  const [timeline, setTimeline] =
    useState([]);

  async function loadData() {

    try {

      setLoading(true);

      const data =
        await getTimeline();

      setTimeline(data);

    }

    catch(err){

      console.error(err);

      alert(err.message);

    }

    finally{

      setLoading(false);

    }

  }

  useEffect(()=>{

    loadData();

  },[]);

  if(loading){

    return(

      <Layout>

        <div className="flex h-[70vh] items-center justify-center">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-200 border-t-red-700"/>

        </div>

      </Layout>

    );

  }

  return (

  <Layout>

    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      <div className="mb-8">

        <h1 className="text-3xl font-black sm:text-4xl">

          Timeline CMS

        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">

          Kelola seluruh timeline pendaftaran PMR.

        </p>

      </div>

      <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-6">

        <div className="mb-6">

          <h2 className="text-xl font-bold sm:text-2xl">

            Data Timeline

          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">

            Tambah, ubah, hapus, dan atur urutan timeline pendaftaran.

          </p>

        </div>

        <TimelineTable
          timeline={timeline}
          refresh={loadData}
        />

      </div>

    </div>

  </Layout>

);

}
export default Timeline;