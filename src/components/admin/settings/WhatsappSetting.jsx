import { useState } from "react";

import {
  Save,
  MessageCircle,
} from "lucide-react";

import {
  updateSettings,
} from "../../../services/settingsApi";

function WhatsappSetting({

  settings,

  onRefresh,

}) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      whatsapp_group_link:
        settings.whatsapp_group_link || "",

    });

  function change(value) {

    setForm({

      whatsapp_group_link: value,

    });

  }

  async function save() {

    try {

      setLoading(true);

      await updateSettings({

        whatsapp_group_link:
          form.whatsapp_group_link,

      });

      await onRefresh();

      alert(

        "Link WhatsApp berhasil disimpan."

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

  return (

    <div className="rounded-3xl bg-white p-8 shadow">

      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-green-100 p-4">

          <MessageCircle

            className="text-green-600"

            size={28}

          />

        </div>

        <div>

          <h2 className="text-3xl font-black">

            WhatsApp Grup

          </h2>

          <p className="text-gray-500">

            Link grup resmi untuk peserta yang dinyatakan diterima.

          </p>

        </div>

      </div>

      <div>

        <label className="mb-3 block font-bold">

          Link Grup WhatsApp

        </label>

        <input

          value={form.whatsapp_group_link}

          onChange={(e)=>

            change(

              e.target.value

            )

          }

          placeholder="https://chat.whatsapp.com/..."

          className="w-full rounded-2xl border px-5 py-4 outline-none focus:border-green-600"

        />

      </div>

      <div className="mt-8">

        <button

          disabled={loading}

          onClick={save}

          className="flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700 disabled:opacity-60"

        >

          <Save size={20}/>

          Simpan Link

        </button>

      </div>

    </div>

  );

}

export default WhatsappSetting;