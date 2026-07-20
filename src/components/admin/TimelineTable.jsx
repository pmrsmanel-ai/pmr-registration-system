import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  ClipboardCheck,
  ShieldCheck,
  Users,
  Award,
  Trophy,
  HeartHandshake,
} from "lucide-react";

import TimelineModal from "./TimelineModal";

import {
  deleteTimeline,
} from "../../services/timelineApi";

const iconMap = {
  CalendarDays,
  ClipboardCheck,
  ShieldCheck,
  Users,
  Award,
  Trophy,
  HeartHandshake,
};

function formatDate(date) {

  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

}

function badgeColor(color) {

  switch (color) {

    case "green":

      return "bg-green-100 text-green-700";

    case "blue":

      return "bg-blue-100 text-blue-700";

    case "yellow":

      return "bg-yellow-100 text-yellow-700";

    default:

      return "bg-red-100 text-red-700";

  }

}

function TimelineTable({

  timeline,

  refresh,

}) {

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [deleting, setDeleting] =
    useState(null);

  const [showDelete, setShowDelete] =
    useState(false);

  const [selectedDelete, setSelectedDelete] =
    useState(null);

  function openCreate() {

    setSelectedItem(null);

    setOpenModal(true);

  }

  function openEdit(item) {

    setSelectedItem(item);

    setOpenModal(true);

  }

  function openDelete(item) {

    setSelectedDelete(item);

    setShowDelete(true);

  }

  async function handleDelete() {

    if (!selectedDelete) return;

    try {

      setDeleting(selectedDelete.id);

      await deleteTimeline(
        selectedDelete.id
      );

      setShowDelete(false);

      setSelectedDelete(null);

      refresh();

    }

    catch (err) {

      console.error(err);

      alert(err.message);

    }

    finally {

      setDeleting(null);

    }

  }

  return (

    <>

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-black">

            Timeline Pendaftaran

          </h2>

          <p className="mt-1 text-sm text-gray-500">

            Kelola seluruh tahapan pendaftaran PMR SMANEL.

          </p>

        </div>

        <button

          onClick={openCreate}

          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800 lg:w-auto"

        >

          <Plus size={20}/>

          Tambah Timeline

        </button>

      </div>
            {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:block">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-500">

                Timeline

              </th>

              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-500">

                Periode

              </th>

              <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-500">

                Status

              </th>

              <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-500">

                Aksi

              </th>

            </tr>

          </thead>

          <tbody>

            {timeline.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="px-6 py-16 text-center text-gray-400"
                >

                  Belum ada Timeline.

                </td>

              </tr>

            ) : (

              timeline.map((item) => {

                const Icon =
                  iconMap[item.icon] ||
                  CalendarDays;

                return (

                  <tr
                    key={item.id}
                    className="border-t transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-start gap-4">

                        <div
                          className={`rounded-2xl p-3 ${badgeColor(
                            item.color
                          )}`}
                        >

                          <Icon size={22} />

                        </div>

                        <div>

                          <h3 className="font-bold text-gray-900">

                            {item.title}

                          </h3>

                          <p className="mt-1 max-w-md text-sm text-gray-500">

                            {item.description}

                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="space-y-1">

                        <div className="font-semibold">

                          {formatDate(
                            item.start_date
                          )}

                        </div>

                        <div className="text-xs text-gray-400">

                          sampai

                        </div>

                        <div className="font-semibold">

                          {formatDate(
                            item.end_date
                          )}

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-center">

                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${badgeColor(
                          item.color
                        )}`}
                      >

                        {item.is_active
                          ? "Aktif"
                          : "Non Aktif"}

                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            openEdit(item)
                          }
                          className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                        >

                          <Pencil size={18} />

                        </button>

                        <button
                          onClick={() =>
                            openDelete(item)
                          }
                          className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>
            {/* ================= MOBILE CARD ================= */}

      <div className="space-y-5 lg:hidden">

        {timeline.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">

            <CalendarDays
              size={48}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-lg font-bold text-gray-800">

              Belum Ada Timeline

            </h3>

            <p className="mt-2 text-sm text-gray-500">

              Tambahkan timeline pertama untuk memulai proses
              pendaftaran PMR.

            </p>

          </div>

        ) : (

          timeline.map((item) => {

            const Icon =
              iconMap[item.icon] || CalendarDays;

            return (

              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >

                {/* Header Card */}

                <div className="flex items-start gap-4 border-b border-gray-100 p-5">

                  <div
                    className={`rounded-2xl p-3 ${badgeColor(
                      item.color
                    )}`}
                  >

                    <Icon size={24} />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-lg font-bold text-gray-900">

                      {item.title}

                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-gray-500">

                      {item.description}

                    </p>

                  </div>

                </div>

                {/* Body */}

                <div className="space-y-4 p-5">

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">

                        Mulai

                      </p>

                      <p className="mt-1 font-semibold text-gray-900">

                        {formatDate(item.start_date)}

                      </p>

                    </div>

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">

                        Selesai

                      </p>

                      <p className="mt-1 font-semibold text-gray-900">

                        {formatDate(item.end_date)}

                      </p>

                    </div>

                  </div>

                  <div className="flex items-center justify-between">

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor(
                        item.color
                      )}`}
                    >

                      {item.is_active
                        ? "Aktif"
                        : "Non Aktif"}

                    </span>

                    <span className="text-xs text-gray-400">

                      Urutan : {item.sort_order}

                    </span>

                  </div>

                </div>

                {/* Footer */}

                <div className="grid grid-cols-2 gap-3 border-t border-gray-100 bg-gray-50 p-4">

                  <button
                    onClick={() => openEdit(item)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >

                    <Pencil size={18} />

                    Edit

                  </button>

                  <button
                    onClick={() => openDelete(item)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                  >

                    <Trash2 size={18} />

                    Hapus

                  </button>

                </div>

              </div>

            );

          })

        )}

      </div>
            {/* ================= DELETE CONFIRMATION ================= */}

      {showDelete && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <div className="mb-6">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                <Trash2
                  size={28}
                  className="text-red-600"
                />

              </div>

              <h3 className="text-2xl font-black text-gray-900">

                Hapus Timeline

              </h3>

              <p className="mt-2 text-gray-500">

                Apakah Anda yakin ingin menghapus timeline

                <span className="font-semibold text-gray-900">

                  {" "}
                  "{selectedDelete?.title}"

                </span>

                ?

              </p>

              <p className="mt-2 text-sm text-red-500">

                Data yang dihapus tidak dapat dikembalikan.

              </p>

            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button

                onClick={() => {

                  setShowDelete(false);

                  setSelectedDelete(null);

                }}

                disabled={deleting !== null}

                className="rounded-2xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100 disabled:opacity-60"

              >

                Batal

              </button>

              <button

                onClick={handleDelete}

                disabled={deleting !== null}

                className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"

              >

                {deleting

                  ? "Menghapus..."

                  : "Ya, Hapus"}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= TIMELINE MODAL ================= */}

      {openModal && (

        <TimelineModal

          item={selectedItem}

          onClose={() => {

            setOpenModal(false);

            setSelectedItem(null);

            refresh();

          }}

        />

      )}

    </>

  );

}

export default TimelineTable;