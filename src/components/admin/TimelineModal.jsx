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

    setForm({

      ...form,

      [field]: value,

    });

  }

  async function save() {

    try {

      setSaving(true);

      if (isEdit) {

        await updateTimeline(

          item.id,

          form,

        );

      }

      else {

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

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-black">

              {

                isEdit

                  ? "Edit Timeline"

                  : "Tambah Timeline"

              }

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola timeline pendaftaran PMR.

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl p-2 hover:bg-gray-100"

          >

            <X size={28}/>

          </button>

        </div>

        <div className="space-y-6 p-8">
                      <div className="grid gap-6 md:grid-cols-2">

            <Input

              label="Judul Timeline"

              value={form.title}

              onChange={(v)=>

                change("title",v)

              }

            />

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

          </div>

          <div>

            <label className="font-semibold">

              Deskripsi

            </label>

            <textarea

              rows={4}

              value={form.description}

              onChange={(e)=>

                change(

                  "description",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="font-semibold">

                Tanggal Mulai

              </label>

              <input

                type="date"

                value={form.start_date}

                onChange={(e)=>

                  change(

                    "start_date",

                    e.target.value

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4"

              />

            </div>

            <div>

              <label className="font-semibold">

                Tanggal Selesai

              </label>

              <input

                type="date"

                value={form.end_date}

                onChange={(e)=>

                  change(

                    "end_date",

                    e.target.value

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4"

              />

            </div>

          </div>
                    <div className="grid gap-6 md:grid-cols-2">

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

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4"

              >

                <option value="CalendarDays">

                  CalendarDays

                </option>

                <option value="ClipboardCheck">

                  ClipboardCheck

                </option>

                <option value="ShieldCheck">

                  ShieldCheck

                </option>

                <option value="Users">

                  Users

                </option>

                <option value="Award">

                  Award

                </option>

                <option value="Trophy">

                  Trophy

                </option>

                <option value="HeartHandshake">

                  HeartHandshake

                </option>

              </select>

            </div>

            <div>

              <label className="font-semibold">

                Warna

              </label>

              <select

                value={form.color}

                onChange={(e)=>

                  change(

                    "color",

                    e.target.value

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4"

              >

                <option value="red">

                  Merah

                </option>

                <option value="green">

                  Hijau

                </option>

                <option value="blue">

                  Biru

                </option>

                <option value="yellow">

                  Kuning

                </option>

              </select>

            </div>

          </div>

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

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4"

            >

              <option value="true">

                Aktif

              </option>

              <option value="false">

                Non Aktif

              </option>

            </select>

          </div>
                    <div className="flex justify-end gap-4 border-t pt-6">

            <button

              onClick={onClose}

              className="rounded-2xl border border-gray-300 px-8 py-4 font-semibold hover:bg-gray-100"

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

                  : isEdit

                  ? "Simpan Perubahan"

                  : "Tambah Timeline"

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

          onChange(e.target.value)

        }

        className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

      />

    </div>

  );

}
export default TimelineModal;