import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";

import FaqTable from "../../components/admin/FaqTable";

import {

  getFaq,

} from "../../services/faqApi";

function Faq() {

  const [loading, setLoading] =
    useState(true);

  const [faq, setFaq] =
    useState([]);

  async function loadData() {

    try {

      setLoading(true);

      const data =
        await getFaq();

      setFaq(data);

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

            FAQ CMS

          </h1>

          <p className="mt-2 text-gray-500">

            Kelola seluruh pertanyaan yang tampil di Homepage.

          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <FaqTable

            faq={faq}

            refresh={loadData}

          />

        </div>

      </div>

    </Layout>

  );

}

export default Faq;