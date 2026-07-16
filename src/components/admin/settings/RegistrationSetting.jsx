import { useState } from "react";

import {
  Save,
  Lock,
  Unlock,
} from "lucide-react";

import {
  updateSettings,
} from "../../../services/settingsApi";

function RegistrationSetting({

  settings,

  onRefresh,

}) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      registration_open:
        settings.registration_open || "false",

      registration_closed_message:
        settings.registration_closed_message ||

        "Pendaftaran telah ditutup.",

    });

  function change(

    key,

    value,

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

        registration_open:
          form.registration_open,

        registration_closed_message:
          form.registration_closed_message,

      });

      await onRefresh();

      alert(

        "Pengaturan berhasil disimpan."

      );

    }

    catch(err){

      console.error(err);

      alert(err.message);

    }

    finally{

      setLoading(false);

    }

  }

  return(

    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="text-3xl font-black">

        Portal Pendaftaran

      </h2>

      <p className="mt-2 text-gray-500">

        Buka atau tutup portal pendaftaran anggota baru.

      </p>

      <div className="mt-8 space-y-8">

        {/* STATUS */}

        <div className="rounded-2xl border p-6">

          <label className="mb-4 block font-bold">

            Status Portal

          </label>

          <div className="flex flex-wrap gap-4">

            <button

              type="button"

              onClick={()=>

                change(

                  "registration_open",

                  "true"

                )

              }

              className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-bold transition

              ${

                form.registration_open==="true"

                ? "bg-green-600 text-white"

                : "border"

              }

              `}

            >

              <Unlock size={20}/>

              Dibuka

            </button>

            <button

              type="button"

              onClick={()=>

                change(

                  "registration_open",

                  "false"

                )

              }

              className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-bold transition

              ${

                form.registration_open==="false"

                ? "bg-red-700 text-white"

                : "border"

              }

              `}

            >

              <Lock size={20}/>

              Ditutup

            </button>

          </div>

        </div>

        {/* PESAN */}

        <div>

          <label className="mb-3 block font-bold">

            Pesan Saat Ditutup

          </label>

          <textarea

            rows={5}

            value={

              form.registration_closed_message

            }

            onChange={(e)=>

              change(

                "registration_closed_message",

                e.target.value

              )

            }

            className="w-full rounded-2xl border p-5 outline-none focus:border-red-600"

          />

        </div>

      </div>

      <div className="mt-8">

        <button

          disabled={loading}

          onClick={save}

          className="flex items-center gap-3 rounded-2xl bg-red-700 px-8 py-4 font-bold text-white transition hover:bg-red-800 disabled:opacity-60"

        >

          <Save size={20}/>

          Simpan Pengaturan

        </button>

      </div>

    </div>

  );

}

export default RegistrationSetting;