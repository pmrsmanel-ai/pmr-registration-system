import { useState } from "react";

import {
  X,
  Save,
} from "lucide-react";

import {
  createTimeline,
  updateTimeline,
} from "../../services/timelineApi";

function TimelineModal({

  item,

  onClose,

}) {

  const isEdit = !!item;

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      title:
        item?.title || "",

      description:
        item?.description || "",

      start_date:
        item?.start_date || "",

      end_date:
        item?.end_date || "",

      icon:
        item?.icon || "CalendarDays",

      color:
        item?.color || "red",

      sort_order:
        item?.sort_order || 1,

      is_active:
        item?.is_active ?? true,

    });

  function change(

    field,

    value,

  ) {

    setForm((prev) => ({

      ...prev,

      [field]: value,

    }));

  }

  async function save() {

    try {

      setSaving(true);

      if (isEdit) {

        await updateTimeline(

          item.id,

          form,

        );

      } else {

        await createTimeline(

          form,

        );

      }

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

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* ================= HEADER ================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">

          <div>

            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">

              {isEdit
                ? "Edit Timeline"
                : "Tambah Timeline"}

            </h2>

            <p className="mt-1 text-sm text-gray-500">

              Kelola tahapan pendaftaran PMR SMANEL.

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl p-2 transition hover:bg-gray-100"

          >

            <X size={26} />

          </button>

        </div>

        {/* ================= BODY ================= */}

        <div className="flex-1 overflow-y-auto p-6">

          <div className="space-y-6">
                        {/* ================= INFORMASI DASAR ================= */}

            <div className="rounded-3xl border border-gray-200 p-6">

              <h3 className="mb-5 text-lg font-bold text-gray-900">

                Informasi Timeline

              </h3>

              <div className="grid gap-5 lg:grid-cols-2">

                <Input

                  label="Judul Timeline"

                  placeholder="Contoh : Pendaftaran"

                  value={form.title}

                  onChange={(v) =>
                    change("title", v)
                  }

                />

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

              </div>

              <div className="mt-5">

                <label className="text-sm font-semibold text-gray-700">

                  Deskripsi

                </label>

                <textarea

                  rows={4}

                  value={form.description}

                  onChange={(e) =>
                    change(
                      "description",
                      e.target.value
                    )
                  }

                  placeholder="Masukkan deskripsi timeline..."

                  className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

                />

              </div>

            </div>

            {/* ================= PERIODE ================= */}

            <div className="rounded-3xl border border-gray-200 p-6">

              <h3 className="mb-5 text-lg font-bold text-gray-900">

                Periode Pelaksanaan

              </h3>

              <div className="grid gap-5 lg:grid-cols-2">

                <div>

                  <label className="text-sm font-semibold text-gray-700">

                    Tanggal Mulai

                  </label>

                  <input

                    type="date"

                    value={form.start_date}

                    onChange={(e) =>
                      change(
                        "start_date",
                        e.target.value
                      )
                    }

                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

                  />

                </div>

                <div>

                  <label className="text-sm font-semibold text-gray-700">

                    Tanggal Selesai

                  </label>

                  <input

                    type="date"

                    value={form.end_date}

                    onChange={(e) =>
                      change(
                        "end_date",
                        e.target.value
                      )
                    }

                    className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

                  />

                </div>

              </div>

            </div>
                        {/* ================= TAMPILAN ================= */}

            <div className="rounded-3xl border border-gray-200 p-6">

              <h3 className="mb-5 text-lg font-bold text-gray-900">

                Tampilan Timeline

              </h3>

              <div className="grid gap-5 lg:grid-cols-2">

                <div>

                  <label className="text-sm font-semibold text-gray-700">

                    Icon

                  </label>

                  <select

                    value={form.icon}

                    onChange={(e) =>
                      change("icon", e.target.value)
                    }

                    className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

                  >

                    <option value="CalendarDays">📅 Calendar</option>

                    <option value="ClipboardCheck">📋 Clipboard</option>

                    <option value="ShieldCheck">🛡 Shield</option>

                    <option value="Users">👥 Users</option>

                    <option value="Award">🏅 Award</option>

                    <option value="Trophy">🏆 Trophy</option>

                    <option value="HeartHandshake">❤️ Heart Handshake</option>

                  </select>

                </div>

                <div>

                  <label className="text-sm font-semibold text-gray-700">

                    Warna

                  </label>

                  <select

                    value={form.color}

                    onChange={(e) =>
                      change("color", e.target.value)
                    }

                    className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

                  >

                    <option value="red">🔴 Merah</option>

                    <option value="green">🟢 Hijau</option>

                    <option value="blue">🔵 Biru</option>

                    <option value="yellow">🟡 Kuning</option>

                  </select>

                </div>

              </div>

            </div>

            {/* ================= STATUS ================= */}

            <div className="rounded-3xl border border-gray-200 p-6">

              <h3 className="mb-5 text-lg font-bold text-gray-900">

                Status Timeline

              </h3>

              <select

                value={form.is_active ? "true" : "false"}

                onChange={(e) =>
                  change(
                    "is_active",
                    e.target.value === "true"
                  )
                }

                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

              >

                <option value="true">

                  🟢 Aktif

                </option>

                <option value="false">

                  ⚪ Non Aktif

                </option>

              </select>

            </div>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-5">

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button

              onClick={onClose}

              disabled={saving}

              className="rounded-2xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100 disabled:opacity-60"

            >

              Batal

            </button>

            <button

              onClick={save}

              disabled={saving}

              className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"

            >

              <Save size={18} />

              {saving
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Tambah Timeline"}

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

  placeholder = "",

  type = "text",

}) {

  return (

    <div>

      <label className="text-sm font-semibold text-gray-700">

        {label}

      </label>

      <input

        type={type}

        value={value ?? ""}

        placeholder={placeholder}

        onChange={(e) =>
          onChange(e.target.value)
        }

        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

      />

    </div>

  );

}

export default TimelineModal;