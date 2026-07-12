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

  return(

    <Layout>

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-10">

          <h1 className="text-4xl font-black">

            Timeline CMS

          </h1>

          <p className="mt-2 text-gray-500">

            Kelola seluruh timeline pendaftaran PMR.

          </p>

        </div>

        <TimelineTable

          timeline={timeline}

          refresh={loadData}

        />
                <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                Data Timeline

              </h2>

              <p className="mt-2 text-gray-500">

                Tambah, ubah, hapus, dan atur urutan timeline pendaftaran.

              </p>

            </div>

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