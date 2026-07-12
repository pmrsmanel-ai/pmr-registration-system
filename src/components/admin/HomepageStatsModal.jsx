import { useState } from "react";

import {
  X,
  Save,
} from "lucide-react";

import {
  updateHomepageStat,
} from "../../services/homepageApi";

function HomepageStatsModal({

  item,

  onClose,

}) {

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      ...item,

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

      await updateHomepageStat(

        form.id,

        {

          title: form.title,

          value: form.value,

          subtitle: form.subtitle,

          description:
            form.description,

          detail:
            form.detail,

          icon:
            form.icon,

          sort_order:
            form.sort_order,

          is_active:
            form.is_active,

        }

      );

      alert(

        "Statistik berhasil diperbarui."

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

      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-black">

              Edit Statistik

            </h2>

            <p className="mt-2 text-gray-500">

              Perbarui informasi statistik Homepage.

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl p-2 hover:bg-gray-100"

          >

            <X size={28} />

          </button>

        </div>

        <div className="space-y-6 p-8">
                      <div className="grid gap-5 md:grid-cols-2">

            <Input
              label="Judul"
              value={form.title}
              onChange={(v) =>
                change("title", v)
              }
            />

            <Input
              label="Angka"
              value={form.value}
              onChange={(v) =>
                change("value", v)
              }
            />

            <Input
              label="Sub Judul"
              value={form.subtitle}
              onChange={(v) =>
                change("subtitle", v)
              }
            />

            <Input
              label="Icon"
              value={form.icon}
              onChange={(v) =>
                change("icon", v)
              }
            />

          </div>

          <div>

            <label className="font-semibold">

              Deskripsi Singkat

            </label>

            <textarea

              rows={3}

              value={form.description || ""}

              onChange={(e) =>

                change(

                  "description",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

            />

          </div>

          <div>

            <label className="font-semibold">

              Detail Lengkap

            </label>

            <textarea

              rows={6}

              value={form.detail || ""}

              onChange={(e) =>

                change(

                  "detail",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <Input

              label="Urutan"

              type="number"

              value={form.sort_order}

              onChange={(v) =>

                change(

                  "sort_order",

                  Number(v)

                )

              }

            />

            <div>

              <label className="font-semibold">

                Status

              </label>

              <select

                value={

                  form.is_active

                    ? "true"

                    : "false"

                }

                onChange={(e) =>

                  change(

                    "is_active",

                    e.target.value === "true"

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

              >

                <option value="true">

                  Aktif

                </option>

                <option value="false">

                  Non Aktif

                </option>

              </select>

            </div>

          </div>
                    <div className="flex justify-end gap-4 border-t pt-6">

            <button

              onClick={onClose}

              className="rounded-2xl border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100"

            >

              Batal

            </button>

            <button

              onClick={save}

              disabled={saving}

              className="flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"

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

  disabled = false,

  type = "text",

}) {

  return (

    <div>

      <label className="font-semibold">

        {label}

      </label>

      <input

        type={type}

        disabled={disabled}

        value={

          value === null ||

          value === undefined

            ? ""

            : value

        }

        onChange={(e) =>

          onChange(e.target.value)

        }

        className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600 disabled:cursor-not-allowed disabled:bg-gray-100"

      />

    </div>

  );

}
export default HomepageStatsModal;