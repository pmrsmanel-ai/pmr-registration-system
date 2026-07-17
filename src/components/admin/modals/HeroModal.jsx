import { useState } from "react";

import {
  X,
  Save,
} from "lucide-react";

import {
  updateHomepageSettings,
} from "../../../services/homepageApi";

function HeroModal({

  settings,

  onClose,

}) {

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      hero_badge:
        settings.hero_badge || "",

      hero_title:
        settings.hero_title || "",

      hero_subtitle:
        settings.hero_subtitle || "",

      hero_button_text:
        settings.hero_button_text || "",

      hero_button_link:
        settings.hero_button_link || "",

      learn_more_link:
        settings.learn_more_link || "",

      registration_status:
        settings.registration_status || "OPEN",

      hero_image:
        settings.hero_image || "",

    });

  function change(

    field,

    value

  ) {

    setForm({

      ...form,

      [field]: value,

    });

  }

  async function save() {

    try {

      setSaving(true);

      await updateHomepageSettings(

        form

      );

      alert(

        "Hero berhasil diperbarui."

      );

      onClose();

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setSaving(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-black">

              Edit Hero Homepage

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola seluruh tampilan Hero Homepage.

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl p-2 hover:bg-gray-100"

          >

            <X size={26} />

          </button>

        </div>

        <div className="space-y-8 p-8">
                      {/* ==========================================
              HERO CONTENT
          ========================================== */}

          <div>

            <h3 className="text-xl font-bold">

              Hero Content

            </h3>

            <p className="mt-1 text-gray-500">

              Informasi utama yang tampil pada Hero Homepage.

            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Input

              label="Hero Badge"

              value={form.hero_badge}

              onChange={(v)=>

                change(

                  "hero_badge",

                  v

                )

              }

            />

            <Input

              label="Hero Button"

              value={form.hero_button_text}

              onChange={(v)=>

                change(

                  "hero_button_text",

                  v

                )

              }

            />

          </div>

          <Input

            label="Hero Title"

            value={form.hero_title}

            onChange={(v)=>

              change(

                "hero_title",

                v

              )

            }

          />

          <div>

            <label className="font-semibold">

              Hero Subtitle

            </label>

            <textarea

              rows={4}

              value={form.hero_subtitle}

              onChange={(e)=>

                change(

                  "hero_subtitle",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Input

              label="Button Link"

              value={form.hero_button_link}

              onChange={(v)=>

                change(

                  "hero_button_link",

                  v

                )

              }

            />

            <Input

              label="Learn More Link"

              value={form.learn_more_link}

              onChange={(v)=>

                change(

                  "learn_more_link",

                  v

                )

              }

            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="font-semibold">

                Status Pendaftaran

              </label>

              <select

                value={form.registration_status}

                onChange={(e)=>

                  change(

                    "registration_status",

                    e.target.value

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

              >

                <option value="OPEN">

                  🟢 OPEN

                </option>

                <option value="CLOSED">

                  🔴 CLOSED

                </option>

              </select>

            </div>

            <Input

              label="Hero Image"

              value={form.hero_image}

              onChange={(v)=>

                change(

                  "hero_image",

                  v

                )

              }

            />

          </div>
                    {/* ==========================================
              ACTION BUTTON
          ========================================== */}

          <div className="flex justify-end gap-4 border-t pt-8">

            <button

              onClick={onClose}

              className="rounded-2xl border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100"

            >

              Batal

            </button>

            <button

              onClick={save}

              disabled={saving}

              className="flex items-center gap-2 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"

            >

              <Save size={18} />

              {

                saving

                  ? "Menyimpan..."

                  : "Simpan"

              }

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

function Input({

  label,

  value,

  onChange,

  type = "text",

}) {

  return (

    <div>

      <label className="font-semibold">

        {label}

      </label>

      <input

        type={type}

        value={

          value === null ||

          value === undefined

            ? ""

            : value

        }

        onChange={(e)=>

          onChange(

            e.target.value

          )

        }

        className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

      />

    </div>

  );

}
export default HeroModal;