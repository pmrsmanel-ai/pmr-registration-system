import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import HomepageStatsModal from "./modals/HomepageStatsModal";

import { getHomepageStats } from "../../services/homepageApi";

function HomepageStats() {

  const [stats, setStats] = useState([]);

  const [loading, setLoading] = useState(true);

 const [selectedStat, setSelectedStat] =
  useState(null);

  async function loadData() {

    try {

      setLoading(true);

      const data = await getHomepageStats();

      setStats(data);

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

  },[]);

  if(loading){

    return (

      <div className="py-10 text-center">

        Memuat Statistik...

      </div>

    );

  }

  return (

    <>

      <div className="space-y-4">

        {

          stats.map((item)=>(

            <div

              key={item.id}

              className="flex items-center justify-between rounded-2xl border p-5"

            >

              <div>

                <h3 className="text-xl font-bold">

                  {item.title}

                </h3>

                <p className="text-gray-500">

                  {item.value}

                </p>

              </div>

              <button

                onClick={()=>

  setSelectedStat(item)

}

                className="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-white"

              >

                <Pencil size={18}/>

                Edit

              </button>

            </div>

          ))

        }

      </div>

      {

  selectedStat && (

    <HomepageStatsModal

      item={selectedStat}

      onClose={()=>{

        setSelectedStat(null);

        loadData();

      }}

    />

  )

}
    </>

  );

}

export default HomepageStats;