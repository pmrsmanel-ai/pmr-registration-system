import { useState } from "react";

import {
  Save,
  Trophy,
  Lock,
  Unlock,
} from "lucide-react";

import {
  updateSettings,
} from "../../../services/settingsApi";

function GraduationSetting({

  settings,

  onRefresh,

}) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      graduation_open:
        settings.graduation_open || "false",

      graduation_title:
        settings.graduation_title ||

        "Pengumuman Kelulusan",

      graduation_subtitle:
        settings.graduation_subtitle ||

        "",

      graduation_message:
        settings.graduation_message ||

        "",

      rejection_message:
        settings.rejection_message ||

        "",

      announcement_date:
        settings.announcement_date ||

        "",

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

        graduation_open:
          form.graduation_open,

        graduation_title:
          form.graduation_title,

        graduation_subtitle:
          form.graduation_subtitle,

        graduation_message:
          form.graduation_message,

        rejection_message:
          form.rejection_message,

        announcement_date:
          form.announcement_date,

      });

      await onRefresh();

      alert(

        "Pengaturan kelulusan berhasil disimpan."

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

      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-red-100 p-4">

          <Trophy

            className="text-red-700"

            size={28}

          />

        </div>

        <div>

          <h2 className="text-3xl font-black">

            Pengumuman Kelulusan

          </h2>

          <p className="text-gray-500">

            Kelola seluruh informasi pengumuman kelulusan.

          </p>

        </div>

      </div>

      {/* STATUS */}

      <div className="rounded-2xl border p-6">

        <label className="mb-4 block font-bold">

          Status Portal Kelulusan

        </label>

        <div className="flex flex-wrap gap-4">

          <button

            type="button"

            onClick={()=>

              change(

                "graduation_open",

                "true"

              )

            }

            className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-bold transition

            ${

              form.graduation_open==="true"

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

                "graduation_open",

                "false"

              )

            }

            className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-bold transition

            ${

              form.graduation_open==="false"

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

      <div className="mt-8 grid gap-6">

        <div>

          <label className="mb-2 block font-bold">

            Judul Pengumuman

          </label>

          <input

            value={form.graduation_title}

            onChange={(e)=>

              change(

                "graduation_title",

                e.target.value

              )

            }

            className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 block font-bold">

            Sub Judul

          </label>

          <textarea

            rows={3}

            value={form.graduation_subtitle}

            onChange={(e)=>

              change(

                "graduation_subtitle",

                e.target.value

              )

            }

            className="w-full rounded-2xl border p-5 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 block font-bold">

            Pesan Kelulusan

          </label>

          <textarea

            rows={5}

            value={form.graduation_message}

            onChange={(e)=>

              change(

                "graduation_message",

                e.target.value

              )

            }

            className="w-full rounded-2xl border p-5 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 block font-bold">

            Pesan Tidak Lolos

          </label>

          <textarea

            rows={5}

            value={form.rejection_message}

            onChange={(e)=>

              change(

                "rejection_message",

                e.target.value

              )

            }

            className="w-full rounded-2xl border p-5 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 block font-bold">

            Tanggal Pengumuman

          </label>

          <input

            type="datetime-local"

            value={form.announcement_date}

            onChange={(e)=>

              change(

                "announcement_date",

                e.target.value

              )

            }

            className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

          />

        </div>

      </div>

      <div className="mt-10">

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

export default GraduationSetting;