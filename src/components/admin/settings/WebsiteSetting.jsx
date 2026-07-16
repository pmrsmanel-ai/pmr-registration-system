import { useState } from "react";

import {
  Save,
} from "lucide-react";

import {
  updateSettings,
} from "../../../services/settingsApi";

function WebsiteSetting({

  settings,

  onRefresh,

}) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      organization_name:
        settings.organization_name || "",

      registration_year:
        settings.registration_year || "",

      recruitment_year:
        settings.recruitment_year || "",

    });

  function change(

    key,

    value

  ) {

    setForm({

      ...form,

      [key]: value,

    });

  }

  async function save() {

    try {

      setLoading(true);

      await updateSettings({

        organization_name:
          form.organization_name,

        registration_year:
          form.registration_year,

        recruitment_year:
          form.recruitment_year,

      });

      await onRefresh();

      alert("Pengaturan berhasil disimpan.");

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="text-3xl font-black">

        Website

      </h2>

      <p className="mt-2 text-gray-500">

        Informasi dasar website.

      </p>

      <div className="mt-8 grid gap-6">

        <div>

          <label className="mb-2 block font-semibold">

            Nama Organisasi

          </label>

          <input

            value={form.organization_name}

            onChange={(e)=>

              change(

                "organization_name",

                e.target.value

              )

            }

            className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">

              Tahun Pendaftaran

            </label>

            <input

              value={form.registration_year}

              onChange={(e)=>

                change(

                  "registration_year",

                  e.target.value

                )

              }

              className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">

              Tahun Rekrutmen

            </label>

            <input

              value={form.recruitment_year}

              onChange={(e)=>

                change(

                  "recruitment_year",

                  e.target.value

                )

              }

              className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

            />

          </div>

        </div>

      </div>

      <div className="mt-8">

        <button

          disabled={loading}

          onClick={save}

          className="flex items-center gap-3 rounded-2xl bg-red-700 px-8 py-4 font-bold text-white transition hover:bg-red-800 disabled:opacity-60"

        >

          <Save size={20} />

          Simpan

        </button>

      </div>

    </div>

  );

}

export default WebsiteSetting;