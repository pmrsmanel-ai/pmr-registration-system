import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";

import HomepageStats from "../../components/admin/HomepageStats";

import {
  getSettings,
  updateSettings,
} from "../../services/settingsApi";

function Homepage() {

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({

    hero_badge: "",

    hero_title: "",

    hero_subtitle: "",

    hero_button_text: "",

    hero_button_link: "",

    hero_image: "",

    registration_status: "OPEN",

    cta_title: "",

    cta_subtitle: "",

    cta_button_text: "",

    cta_button_link: "",

  });

  async function loadData() {

    try {

      setLoading(true);

      const data = await getSettings();

      setSettings({

        hero_badge:
          data.hero_badge || "",

        hero_title:
          data.hero_title || "",

        hero_subtitle:
          data.hero_subtitle || "",

        hero_button_text:
          data.hero_button_text || "",

        hero_button_link:
          data.hero_button_link || "",

        hero_image:
          data.hero_image || "",

        registration_status:
          data.registration_status ||

          "OPEN",

        cta_title:
          data.cta_title || "",

        cta_subtitle:
          data.cta_subtitle || "",

        cta_button_text:
          data.cta_button_text || "",

        cta_button_link:
          data.cta_button_link || "",

      });

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
    function change(field, value) {

    setSettings((prev) => ({

      ...prev,

      [field]: value,

    }));

  }

  async function saveHomepage() {

    try {

      setSaving(true);

      await updateSettings(settings);

      alert("Homepage berhasil diperbarui.");

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setSaving(false);

    }

  }

  if (loading) {

    return (

      <Layout>

        <div className="flex h-[70vh] items-center justify-center">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-200 border-t-red-700"></div>

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-10">

          <h1 className="text-4xl font-black">

            Homepage CMS

          </h1>

          <p className="mt-2 text-gray-500">

            Kelola tampilan Homepage PMR SMAN 1 AIKMEL.

          </p>

        </div>

        {/* HERO */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold">

            Hero Section

          </h2>

          <p className="mt-2 text-gray-500">

            Informasi utama yang tampil pada halaman depan.

          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <Input

              label="Hero Badge"

              value={settings.hero_badge}

              onChange={(v)=>change("hero_badge",v)}

            />

            <Input

              label="Hero Title"

              value={settings.hero_title}

              onChange={(v)=>change("hero_title",v)}

            />

            <Input

              label="Hero Button"

              value={settings.hero_button_text}

              onChange={(v)=>change("hero_button_text",v)}

            />

            <Input

              label="Hero Button Link"

              value={settings.hero_button_link}

              onChange={(v)=>change("hero_button_link",v)}

            />

          </div>

          <div className="mt-6">

            <label className="font-semibold">

              Hero Subtitle

            </label>

            <textarea

              rows={5}

              value={settings.hero_subtitle}

              onChange={(e)=>

                change(

                  "hero_subtitle",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border p-4"

            />

          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <Input

              label="Hero Image"

              value={settings.hero_image}

              onChange={(v)=>change("hero_image",v)}

            />

            <div>

              <label className="font-semibold">

                Status Pendaftaran

              </label>

              <select

                value={settings.registration_status}

                onChange={(e)=>

                  change(

                    "registration_status",

                    e.target.value

                  )

                }

                className="mt-2 w-full rounded-2xl border p-4"

              >

                <option value="OPEN">

                  OPEN

                </option>

                <option value="CLOSED">

                  CLOSED

                </option>

              </select>

            </div>

          </div>

        </div>
                {/* CTA SECTION */}

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold">

            Call To Action (CTA)

          </h2>

          <p className="mt-2 text-gray-500">

            Bagian ajakan bergabung yang tampil di bagian bawah Homepage.

          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <Input

              label="CTA Title"

              value={settings.cta_title}

              onChange={(v)=>change("cta_title",v)}

            />

            <Input

              label="CTA Button"

              value={settings.cta_button_text}

              onChange={(v)=>change("cta_button_text",v)}

            />

            <Input

              label="CTA Button Link"

              value={settings.cta_button_link}

              onChange={(v)=>change("cta_button_link",v)}

            />

          </div>

          <div className="mt-6">

            <label className="font-semibold">

              CTA Subtitle

            </label>

            <textarea

              rows={4}

              value={settings.cta_subtitle}

              onChange={(e)=>

                change(

                  "cta_subtitle",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border p-4"

            />

          </div>

        </div>

        {/* HOMEPAGE STATISTICS */}

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">

              Homepage Statistics

            </h2>

            <p className="mt-2 text-gray-500">

              Statistik yang tampil pada Hero Homepage.

            </p>

          </div>

          <HomepageStats />

        </div>

        {/* SAVE */}

        <div className="mt-8 flex justify-end">

          <button

            onClick={saveHomepage}

            disabled={saving}

            className="rounded-2xl bg-red-700 px-10 py-4 font-semibold text-white transition hover:bg-red-800 disabled:opacity-50"

          >

            {

              saving

                ? "Menyimpan..."

                : "Simpan Perubahan"

            }

          </button>

        </div>

      </div>

    </Layout>

  );

}

function Input({

  label,

  value,

  onChange,

}) {

  return (

    <div>

      <label className="font-semibold">

        {label}

      </label>

      <input

        value={value}

        onChange={(e)=>

          onChange(e.target.value)

        }

        className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

      />

    </div>

  );

}
export default Homepage;