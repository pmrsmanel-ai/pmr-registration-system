import { useState } from "react";

import {
  X,
  Save,
} from "lucide-react";

import {
  updateHomepageSettings,
} from "../../../services/homepageApi";

function CTAModal({

  settings,

  onClose,

}) {

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      cta_badge:
        settings.cta_badge || "",

      cta_title:
        settings.cta_title || "",

      cta_subtitle:
        settings.cta_subtitle || "",

      cta_button_text:
        settings.cta_button_text || "",

      cta_button_link:
        settings.cta_button_link || "",

      cta_secondary_text:
        settings.cta_secondary_text || "",

      cta_secondary_link:
        settings.cta_secondary_link || "",

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

        "CTA Homepage berhasil diperbarui."

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

              Edit CTA Homepage

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola bagian Call To Action pada Homepage.

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
              CTA CONTENT
          ========================================== */}

          <div>

            <h3 className="text-xl font-bold">

              CTA Content

            </h3>

            <p className="mt-1 text-gray-500">

              Informasi yang ditampilkan pada bagian Call To Action Homepage.

            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Input

              label="CTA Badge"

              value={form.cta_badge}

              onChange={(v) =>

                change(

                  "cta_badge",

                  v

                )

              }

            />

            <Input

              label="CTA Button"

              value={form.cta_button_text}

              onChange={(v) =>

                change(

                  "cta_button_text",

                  v

                )

              }

            />

          </div>

          <Input

            label="CTA Title"

            value={form.cta_title}

            onChange={(v) =>

              change(

                "cta_title",

                v

              )

            }

          />

          <div>

            <label className="font-semibold">

              CTA Subtitle

            </label>

            <textarea

              rows={4}

              value={form.cta_subtitle}

              onChange={(e) =>

                change(

                  "cta_subtitle",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Input

              label="Button Link"

              value={form.cta_button_link}

              onChange={(v) =>

                change(

                  "cta_button_link",

                  v

                )

              }

            />

            <Input

              label="Secondary Button"

              value={form.cta_secondary_text}

              onChange={(v) =>

                change(

                  "cta_secondary_text",

                  v

                )

              }

            />

          </div>

          <Input

            label="Secondary Button Link"

            value={form.cta_secondary_link}

            onChange={(v) =>

              change(

                "cta_secondary_link",

                v

              )

            }

          />
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

        onChange={(e) =>

          onChange(

            e.target.value

          )

        }

        className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

      />

    </div>

  );

}

export default CTAModal;