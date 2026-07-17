import { useEffect, useState } from "react";
import { Pencil, ShieldCheck } from "lucide-react";

import {
  getHomepageSettings,
} from "../../../../services/homepageApi";

import HeroModal from "../../modals/HeroModal";

function HomepageHeroSection() {

  const [loading, setLoading] =
    useState(true);

  const [settings, setSettings] =
    useState({});

  const [openModal, setOpenModal] =
    useState(false);

  async function loadData() {

    try {

      setLoading(true);

      const data =
        await getHomepageSettings();

      setSettings(data);

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

        Memuat Hero...

      </section>

    );

  }

  return (

    <>

      <section className="rounded-3xl bg-white p-8 shadow">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black">

              Hero Section

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola tampilan Hero Homepage.

            </p>

          </div>

          <button

            onClick={() =>

              setOpenModal(true)

            }

            className="flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"

          >

            <Pencil size={18} />

            Edit Hero

          </button>

        </div>
                <div className="mt-10 grid gap-6 lg:grid-cols-2">

          {/* Preview Kiri */}

          <div className="space-y-5">

            <PreviewItem
              label="Hero Badge"
              value={settings.hero_badge}
            />

            <PreviewItem
              label="Hero Title"
              value={settings.hero_title}
            />

            <PreviewItem
              label="Hero Subtitle"
              value={settings.hero_subtitle}
            />

            <PreviewItem
              label="Button Utama"
              value={settings.hero_button_text}
            />

          </div>

          {/* Preview Kanan */}

          <div className="space-y-5">

            <PreviewItem
              label="Button Link"
              value={settings.hero_button_link}
            />

            <PreviewItem
              label="Learn More Link"
              value={settings.learn_more_link}
            />

            <PreviewItem
              label="Status Pendaftaran"
              value={settings.registration_status}
            />

            <PreviewItem
              label="Hero Image"
              value={settings.hero_image}
            />

          </div>

        </div>

      </section>

      {

        openModal && (

          <HeroModal

            settings={settings}

            onClose={async () => {

              setOpenModal(false);

              await loadData();

            }}

          />

        )

      }

    </>

  );

}

function PreviewItem({

  label,

  value,

}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

      <p className="text-sm font-semibold text-gray-500">

        {label}

      </p>

      <p className="mt-2 font-bold text-gray-900 break-words">

        {value || "-"}

      </p>

    </div>

  );

}

export default HomepageHeroSection;