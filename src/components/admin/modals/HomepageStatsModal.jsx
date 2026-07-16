import { useState } from "react";

import {
  X,
  Save,
} from "lucide-react";

import {
  updateHomepageStat,
} from "../../../services/homepageApi";

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

      if (!form.title?.trim()) {

        alert("Judul wajib diisi.");

        return;

      }

      if (!form.value?.trim()) {

        alert("Value wajib diisi.");

        return;

      }

      if (!form.icon?.trim()) {

        alert("Icon wajib dipilih.");

        return;

      }

      setSaving(true);

      await updateHomepageStat(

        form.id,

        {

          title: form.title,

          value: form.value,

          subtitle: form.subtitle,

          description:
            form.description,

          detail_title:
            form.detail_title,

          detail_content:
            form.detail_content,

          image_url:
            form.image_url,

          button_text:
            form.button_text,

          button_link:
            form.button_link,

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

              Edit Statistik Homepage

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola informasi statistik yang tampil pada Homepage.

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl p-2 transition hover:bg-gray-100"

          >

            <X size={28} />

          </button>

        </div>

        <div className="space-y-8 p-8">

          {/* ==========================================
              HERO STATISTIC CARD
          ========================================== */}

          <div>

            <h3 className="text-xl font-bold">

              Hero Statistic Card

            </h3>

            <p className="mt-1 text-gray-500">

              Informasi yang tampil pada kartu statistik Homepage.

            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <Input

              label="Judul"

              placeholder="Contoh : Anggota Aktif"

              value={form.title}

              onChange={(v)=>

                change("title",v)

              }

            />

            <Input

              label="Value"

              placeholder="150+"

              value={form.value}

              onChange={(v)=>

                change("value",v)

              }

            />

            <Input

              label="Sub Judul"

              placeholder="Aktif Tahun 2026"

              value={form.subtitle}

              onChange={(v)=>

                change("subtitle",v)

              }

            />

            <div>

              <label className="font-semibold">

                Icon

              </label>

              <select

                value={form.icon}

                onChange={(e)=>

                  change(

                    "icon",

                    e.target.value

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

              >

                <option value="Users">

                  👥 Users

                </option>

                <option value="CalendarDays">

                  📅 CalendarDays

                </option>

                <option value="Trophy">

                  🏆 Trophy

                </option>

                <option value="HeartHandshake">

                  ❤️ HeartHandshake

                </option>

                <option value="ShieldPlus">

                  🛡 ShieldPlus

                </option>

              </select>

            </div>

          </div>

          <div>

            <label className="font-semibold">

              Deskripsi Singkat

            </label>

            <textarea

              rows={3}

              value={form.description || ""}

              onChange={(e)=>

                change(

                  "description",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

            />
                      </div>

          {/* ==========================================
              DETAIL MODAL
          ========================================== */}

          <div className="border-t pt-8">

            <h3 className="text-xl font-bold">

              Detail Modal

            </h3>

            <p className="mt-1 text-gray-500">

              Informasi lengkap yang akan ditampilkan ketika pengguna mengklik statistik di Homepage.

            </p>

          </div>

          <Input

            label="Judul Detail"

            placeholder="Contoh : Tentang Anggota PMR"

            value={form.detail_title}

            onChange={(v)=>

              change(

                "detail_title",

                v

              )

            }

          />

          <div>

            <label className="font-semibold">

              Isi Detail

            </label>

            <textarea

              rows={8}

              value={form.detail_content || ""}

              onChange={(e)=>

                change(

                  "detail_content",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <Input

                label="URL Gambar"

                placeholder="https://... atau /images/anggota.jpg"

                value={form.image_url}

                onChange={(v)=>

                  change(

                    "image_url",

                    v

                  )

                }

              />

              <p className="mt-2 text-xs text-gray-500">

                Gunakan URL gambar dari Supabase Storage atau folder public.

              </p>

            </div>

            <Input

              label="Teks Tombol"

              placeholder="Lihat Selengkapnya"

              value={form.button_text}

              onChange={(v)=>

                change(

                  "button_text",

                  v

                )

              }

            />

          </div>

          <Input

            label="Link Tombol"

            placeholder="/anggota"

            value={form.button_link}

            onChange={(v)=>

              change(

                "button_link",

                v

              )

            }

          />
                    {/* ==========================================
              PENGATURAN
          ========================================== */}

          <div className="border-t pt-8">

            <h3 className="text-xl font-bold">

              Pengaturan

            </h3>

            <p className="mt-1 text-gray-500">

              Atur urutan tampil, status, dan lihat ringkasan data sebelum disimpan.

            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <Input

              label="Urutan"

              type="number"

              value={form.sort_order}

              onChange={(v)=>

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

                onChange={(e)=>

                  change(

                    "is_active",

                    e.target.value === "true"

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

              >

                <option value="true">

                  🟢 Aktif

                </option>

                <option value="false">

                  🔴 Non Aktif

                </option>

              </select>

            </div>

          </div>

          {/* ==========================================
              PREVIEW
          ========================================== */}

          <div className="rounded-3xl border border-red-100 bg-red-50 p-6">

            <h3 className="text-lg font-bold text-red-700">

              Preview Statistik

            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">

                  Judul

                </p>

                <p className="font-bold">

                  {form.title || "-"}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Value

                </p>

                <p className="font-bold">

                  {form.value || "-"}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Subtitle

                </p>

                <p>

                  {form.subtitle || "-"}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Icon

                </p>

                <p>

                  {form.icon || "-"}

                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Status

                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    form.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {form.is_active
                    ? "Aktif"
                    : "Non Aktif"}
                </span>

              </div>

              <div>

                <p className="text-sm text-gray-500">

                  Urutan

                </p>

                <p>

                  {form.sort_order}

                </p>

              </div>

            </div>

          </div>

          {/* ==========================================
              ACTION
          ========================================== */}

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

                  : "Simpan Perubahan"

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

  placeholder = "",

}) {

  return (

    <div>

      <label className="font-semibold text-gray-800">

        {label}

      </label>

      <input

        type={type}

        disabled={disabled}

        placeholder={placeholder}

        value={

          value === null ||

          value === undefined

            ? ""

            : value

        }

        onChange={(e)=>

          onChange(e.target.value)

        }

        className="mt-2 w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-100"

      />

    </div>

  );

}

export default HomepageStatsModal;