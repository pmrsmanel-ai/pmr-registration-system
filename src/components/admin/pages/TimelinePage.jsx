import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import {
  getTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
} from "../../../services/timelineApi";

function TimelinePage() {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [timeline, setTimeline] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [creating, setCreating] =
    useState(false);

  const emptyForm = {

    title: "",

    description: "",

    start_date: "",

    end_date: "",

    icon: "CalendarDays",

    color: "red",

    sort_order: 1,

    is_active: true,

  };

  const [form, setForm] =
    useState(emptyForm);

  async function loadData() {

    try {

      setLoading(true);

      const data =
        await getTimeline();

      setTimeline(data);

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadData();

  }, []);

  const sortedTimeline =
    useMemo(() => {

      return [...timeline].sort(

        (a, b) =>

          a.sort_order -

          b.sort_order

      );

    }, [timeline]);

  function change(

    field,

    value,

  ) {

    setForm({

      ...form,

      [field]: value,

    });

  }

  function addTimeline() {

    setCreating(true);

    setEditingId(null);

    setForm({

      ...emptyForm,

      sort_order:

        timeline.length + 1,

    });

  }

  function editTimeline(item) {

    setCreating(false);

    setEditingId(item.id);

    setForm({

      title: item.title,

      description:
        item.description,

      start_date:
        item.start_date,

      end_date:
        item.end_date,

      icon:
        item.icon,

      color:
        item.color,

      sort_order:
        item.sort_order,

      is_active:
        item.is_active,

    });

  }

  function cancelForm() {

    setCreating(false);

    setEditingId(null);

    setForm(emptyForm);

  }

  async function saveTimeline() {

    try {

      setSaving(true);

      if (creating) {

        await createTimeline(form);

      }

      else {

        await updateTimeline(

          editingId,

          form

        );

      }

      await loadData();

      cancelForm();

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setSaving(false);

    }

  }

  async function removeTimeline(id) {

    const ok = window.confirm(

      "Hapus timeline ini?"

    );

    if (!ok) return;

    try {

      await deleteTimeline(id);

      await loadData();

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

  }

  if (loading) {

    return (

      <div className="flex h-96 items-center justify-center">

        Memuat Timeline...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black">

            Timeline

          </h1>

          <p className="mt-2 text-gray-500">

            Kelola seluruh timeline
            pendaftaran PMR.

          </p>

        </div>

        <button

          onClick={addTimeline}

          className="flex items-center gap-3 rounded-2xl bg-red-700 px-6 py-4 font-bold text-white hover:bg-red-800"

        >

          <Plus size={20}/>

          Tambah Timeline

        </button>

      </div>
            {/* ==========================================
          FORM
      ========================================== */}

      {(creating || editingId) && (

        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-2xl font-black">

              {creating

                ? "Tambah Timeline"

                : "Edit Timeline"}

            </h2>

            <button

              onClick={cancelForm}

              className="rounded-xl p-2 hover:bg-gray-100"

            >

              <X size={24} />

            </button>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Input

              label="Judul"

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

          <div className="mt-6">

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

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-red-600"

            />

          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

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

          <div className="mt-6 grid gap-6 md:grid-cols-2">

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

                <option value="CalendarDays">CalendarDays</option>

                <option value="ClipboardCheck">ClipboardCheck</option>

                <option value="ShieldCheck">ShieldCheck</option>

                <option value="Users">Users</option>

                <option value="Award">Award</option>

                <option value="Trophy">Trophy</option>

                <option value="HeartHandshake">HeartHandshake</option>

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

                <option value="red">Merah</option>

                <option value="green">Hijau</option>

                <option value="blue">Biru</option>

                <option value="yellow">Kuning</option>

              </select>

            </div>

          </div>

          <div className="mt-6">

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

                  e.target.value==="true"

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

          <div className="mt-8 flex justify-end gap-4">

            <button

              onClick={cancelForm}

              className="rounded-2xl border px-8 py-4 font-semibold"

            >

              Batal

            </button>

            <button

              disabled={saving}

              onClick={saveTimeline}

              className="flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"

            >

              <Save size={18}/>

              {

                saving

                  ? "Menyimpan..."

                  : creating

                  ? "Tambah Timeline"

                  : "Simpan"

              }

            </button>

          </div>

        </div>

      )}

      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="overflow-hidden rounded-3xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-red-700 text-white">

            <tr>

              <th className="px-6 py-4 text-left">

                Judul

              </th>

              <th className="px-6 py-4 text-left">

                Periode

              </th>

              <th className="px-6 py-4 text-center">

                Status

              </th>

              <th className="px-6 py-4 text-center">

                Aksi

              </th>

            </tr>

          </thead>

          <tbody>

            {sortedTimeline.length===0 ? (

              <tr>

                <td

                  colSpan={4}

                  className="py-16 text-center text-gray-500"

                >

                  Belum ada Timeline.

                </td>

              </tr>

            ) : (

              sortedTimeline.map((item)=>(

                <tr

                  key={item.id}

                  className="border-t"

                >

                  <td className="px-6 py-5">

                    <h3 className="font-bold">

                      {item.title}

                    </h3>

                    <p className="mt-1 text-sm text-gray-500">

                      {item.description}

                    </p>

                  </td>

                  <td className="px-6 py-5">

                    <div>

                      {item.start_date}

                    </div>

                    <div className="text-gray-400">

                      s/d

                    </div>

                    <div>

                      {item.end_date}

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    {item.is_active ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                        Aktif

                      </span>

                    ) : (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                        Non Aktif

                      </span>

                    )}

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button

                        onClick={()=>

                          editTimeline(item)

                        }

                        className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"

                      >

                        <Pencil size={18}/>

                      </button>

                      <button

                        onClick={()=>

                          removeTimeline(item.id)

                        }

                        className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700"

                      >

                        <Trash2 size={18}/>

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

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

export default TimelinePage;