import { useEffect, useState } from "react";
import {
  Pencil,
  BarChart3,
  Users,
  CalendarDays,
  Trophy,
  HeartHandshake,
  ShieldPlus,
} from "lucide-react";

import {
  getHomepageStats,
} from "../../../../services/homepageApi";

import HomepageStatsModal from "../../modals/HomepageStatsModal";

const iconMap = {
  Users,
  CalendarDays,
  Trophy,
  HeartHandshake,
  ShieldPlus,
};

function HomepageStatsSection() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState([]);

  const [selectedItem, setSelectedItem] =
    useState(null);

  async function loadData() {

    try {

      setLoading(true);

      const data =
        await getHomepageStats();

      setStats(data);

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadData();

  }, []);
    if (loading) {

    return (

      <section className="rounded-3xl bg-white p-8 shadow">

        <div className="flex h-48 items-center justify-center">

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-200 border-t-red-700" />

        </div>

      </section>

    );

  }

  return (

    <>

      <section className="rounded-3xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black">

              Statistik Homepage

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola seluruh statistik yang tampil pada Hero Homepage.

            </p>

          </div>
          <div className="mb-8 flex flex-wrap gap-3">

  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

    Total : {stats.length}

  </span>

  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

    Aktif : {stats.filter(item => item.is_active).length}

  </span>

  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">

    Non Aktif : {stats.filter(item => !item.is_active).length}

  </span>

</div>

          <div className="rounded-2xl bg-red-50 px-5 py-3">

            <span className="font-bold text-red-700">

              {stats.length} Statistik

            </span>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {stats.map((item) => {

            const Icon =
              iconMap[item.icon] ||
              BarChart3;

            return (

              <div

                key={item.id}

                className="rounded-3xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"

              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-red-100 p-4">

                      <Icon

                        size={30}

                        className="text-red-700"

                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-black">

                        {item.title}

                      </h3>

                      <p className="mt-1 text-sm text-gray-500">

                        {item.subtitle || "-"}

                      </p>

                    </div>

                  </div>

                  <button

                    onClick={() =>

                      setSelectedItem(item)

                    }

                    className="flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"

                  >

                    <Pencil size={16} />

                    Edit

                  </button>

                </div>

                <div className="mt-8">

                  <h2 className="text-5xl font-black text-red-700">

                    {item.value}

                  </h2>

                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-5">

                  <span

                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}

                  >

                    {item.is_active

                      ? "Aktif"

                      : "Non Aktif"}

                  </span>

                  <span className="text-sm text-gray-500">

                    Urutan :

                    {" "}

                    {item.sort_order}

                  </span>

                </div>

              </div>

            );

          })}

        </div>

        {

  stats.length === 0 && (

    <div className="rounded-3xl border-2 border-dashed border-gray-300 p-12 text-center">

      <BarChart3

        size={48}

        className="mx-auto text-gray-400"

      />

      <h3 className="mt-4 text-xl font-bold text-gray-700">

        Belum Ada Statistik

      </h3>

      <p className="mt-2 text-gray-500">

        Tambahkan statistik Homepage agar tampil pada Hero.

      </p>

    </div>

  )

}

      </section>
            {/* ==========================================
          MODAL EDIT STATISTIK
      ========================================== */}

      {selectedItem && (

        <HomepageStatsModal

          item={selectedItem}

          onClose={async () => {

            setSelectedItem(null);

            await loadData();

          }}

        />

      )}

    </>

  );

}

export default HomepageStatsSection;