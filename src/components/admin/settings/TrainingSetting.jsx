import { useState } from "react";

import {
  Save,
  CalendarDays,
  Clock3,
  MapPin,
  Backpack,
  Shirt,
} from "lucide-react";

import {
  updateSettings,
} from "../../../services/settingsApi";

function TrainingSetting({

  settings,

  onRefresh,

}) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      training_schedule:
        settings.training_schedule || "",

      training_time:
        settings.training_time || "",

      training_location:
        settings.training_location || "",

      training_dresscode:
        settings.training_dresscode || "",

      training_equipment:
        settings.training_equipment || "",

    });

  function change(key, value) {

    setForm({

      ...form,

      [key]: value,

    });

  }

  async function save() {

    try {

      setLoading(true);

      await updateSettings({

        training_schedule:
          form.training_schedule,

        training_time:
          form.training_time,

        training_location:
          form.training_location,

        training_dresscode:
          form.training_dresscode,

        training_equipment:
          form.training_equipment,

      });

      await onRefresh();

      alert("Informasi latihan berhasil disimpan.");

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

      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">

          <CalendarDays

            size={28}

            className="text-blue-700"

          />

        </div>

        <div>

          <h2 className="text-3xl font-black">

            Latihan Perdana

          </h2>

          <p className="text-gray-500">

            Informasi yang akan ditampilkan kepada peserta yang diterima.

          </p>

        </div>

      </div>

      <div className="grid gap-6">

        <div>

          <label className="mb-2 flex items-center gap-2 font-bold">

            <CalendarDays size={18}/>

            Tanggal Latihan

          </label>

          <input

            type="date"

            value={form.training_schedule}

            onChange={(e)=>

              change(

                "training_schedule",

                e.target.value

              )

            }

            className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 font-bold">

            <Clock3 size={18}/>

            Jam Latihan

          </label>

          <input

            type="time"

            value={form.training_time}

            onChange={(e)=>

              change(

                "training_time",

                e.target.value

              )

            }

            className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 font-bold">

            <MapPin size={18}/>

            Lokasi

          </label>

          <textarea

            rows={3}

            value={form.training_location}

            onChange={(e)=>

              change(

                "training_location",

                e.target.value

              )

            }

            className="w-full rounded-2xl border p-4 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 font-bold">

            <Shirt size={18}/>

            Dresscode

          </label>

          <input

            value={form.training_dresscode}

            onChange={(e)=>

              change(

                "training_dresscode",

                e.target.value

              )

            }

            placeholder="Contoh: Seragam sekolah dan sepatu olahraga"

            className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-red-600"

          />

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 font-bold">

            <Backpack size={18}/>

            Perlengkapan yang Dibawa

          </label>

          <textarea

            rows={5}

            value={form.training_equipment}

            onChange={(e)=>

              change(

                "training_equipment",

                e.target.value

              )

            }

            placeholder="Contoh:
- Buku tulis
- Alat tulis
- Botol minum
- Topi"

            className="w-full rounded-2xl border p-4 outline-none focus:border-red-600"

          />

        </div>

      </div>

      <div className="mt-8">

        <button

          disabled={loading}

          onClick={save}

          className="flex items-center gap-3 rounded-2xl bg-blue-700 px-8 py-4 font-bold text-white transition hover:bg-blue-800 disabled:opacity-60"

        >

          <Save size={20}/>

          Simpan Informasi

        </button>

      </div>

    </div>

  );

}

export default TrainingSetting;