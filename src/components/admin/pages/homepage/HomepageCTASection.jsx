import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import {
  getHomepageSettings,
} from "../../../../services/homepageApi";

import CTAModal from "../../modals/CTAModal";

function HomepageCTASection() {

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

        Memuat CTA...

      </section>

    );

  }

  return (

    <>

      <section className="rounded-3xl bg-white p-8 shadow">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black">

              Call To Action

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola bagian CTA pada Homepage.

            </p>

          </div>

          <button

            onClick={() =>

              setOpenModal(true)

            }

            className="flex items-center gap-2 rounded-2xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"

          >

            <Pencil size={18} />

            Edit CTA

          </button>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          {/* Preview Kiri */}

          <div className="space-y-5">

            <PreviewItem

              label="CTA Badge"

              value={settings.cta_badge}

            />

            <PreviewItem

              label="CTA Title"

              value={settings.cta_title}

            />

            <PreviewItem

              label="CTA Subtitle"

              value={settings.cta_subtitle}

            />

            <PreviewItem

              label="Primary Button"

              value={settings.cta_button_text}

            />

          </div>

          {/* Preview Kanan */}

          <div className="space-y-5">

            <PreviewItem

              label="Primary Link"

              value={settings.cta_button_link}

            />

            <PreviewItem

              label="Secondary Button"

              value={settings.cta_secondary_text}

            />

            <PreviewItem

              label="Secondary Link"

              value={settings.cta_secondary_link}

            />

          </div>

        </div>

      </section>
            {

        openModal && (

          <CTAModal

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

      <p className="mt-2 break-words font-bold text-gray-900">

        {

          value ||

          "-"

        }

      </p>

    </div>

  );

}

export default HomepageCTASection;