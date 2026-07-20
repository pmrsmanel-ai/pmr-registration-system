import { useMemo, useState } from "react";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
} from "lucide-react";

import FaqModal from "./FaqModal";

import {
  deleteFaq,
} from "../../services/faqApi";

function FaqTable({

  faq,

  refresh,

}) {

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [keyword, setKeyword] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [showDelete, setShowDelete] =
    useState(false);

  const [selectedDelete, setSelectedDelete] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const filteredFaq = useMemo(() => {

    return faq.filter((item) => {

      const matchKeyword =
        item.question
          ?.toLowerCase()
          .includes(
            keyword.toLowerCase()
          ) ||
        item.answer
          ?.toLowerCase()
          .includes(
            keyword.toLowerCase()
          );

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? item.is_active
          : !item.is_active;

      return (
        matchKeyword &&
        matchStatus
      );

    });

  }, [

    faq,

    keyword,

    statusFilter,

  ]);

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

    try {

      setDeleting(true);

      await deleteFaq(
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

      setDeleting(false);

    }

  }

  return (

    <>

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-black">

            Frequently Asked Questions

          </h2>

          <p className="mt-1 text-sm text-gray-500">

            Kelola pertanyaan yang sering diajukan.

          </p>

        </div>

        <button

          onClick={openCreate}

          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800 lg:w-auto"

        >

          <Plus size={20} />

          Tambah FAQ

        </button>

      </div>
            {/* ================= TOOLBAR ================= */}

      <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-3">

          {/* Search */}

          <div className="relative lg:col-span-2">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input

              type="text"

              value={keyword}

              onChange={(e) =>
                setKeyword(e.target.value)
              }

              placeholder="Cari pertanyaan atau jawaban..."

              className="w-full rounded-2xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

            />

          </div>

          {/* Filter */}

          <select

            value={statusFilter}

            onChange={(e) =>
              setStatusFilter(e.target.value)
            }

            className="rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"

          >

            <option value="all">

              Semua Status

            </option>

            <option value="active">

              Aktif

            </option>

            <option value="inactive">

              Non Aktif

            </option>

          </select>

        </div>

        {/* Statistik */}

        <div className="mt-5 flex flex-wrap items-center gap-3">

          <div className="rounded-2xl bg-red-50 px-4 py-2">

            <span className="text-sm font-semibold text-red-700">

              Total FAQ : {faq.length}

            </span>

          </div>

          <div className="rounded-2xl bg-green-50 px-4 py-2">

            <span className="text-sm font-semibold text-green-700">

              Ditampilkan : {filteredFaq.length}

            </span>

          </div>

          <div className="rounded-2xl bg-blue-50 px-4 py-2">

            <span className="text-sm font-semibold text-blue-700">

              Aktif : {

                faq.filter(
                  (item) => item.is_active
                ).length

              }

            </span>

          </div>

          <div className="rounded-2xl bg-gray-100 px-4 py-2">

            <span className="text-sm font-semibold text-gray-700">

              Non Aktif : {

                faq.filter(
                  (item) => !item.is_active
                ).length

              }

            </span>

          </div>

        </div>

      </div>
            {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:block">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="w-[35%] px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-500">

                Pertanyaan

              </th>

              <th className="w-[40%] px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-500">

                Jawaban

              </th>

              <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-500">

                Urutan

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

            {filteredFaq.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="px-6 py-16 text-center"
                >

                  <HelpCircle
                    size={48}
                    className="mx-auto mb-4 text-gray-300"
                  />

                  <h3 className="text-lg font-bold text-gray-700">

                    Tidak ada FAQ ditemukan

                  </h3>

                  <p className="mt-2 text-sm text-gray-500">

                    Coba ubah kata kunci pencarian atau filter.

                  </p>

                </td>

              </tr>

            ) : (

              filteredFaq.map((item) => (

                <tr

                  key={item.id}

                  className="border-t transition hover:bg-gray-50"

                >

                  {/* Pertanyaan */}

                  <td className="px-6 py-5 align-top">

                    <div className="flex gap-4">

                      <div className="rounded-2xl bg-red-100 p-3 text-red-600">

                        <HelpCircle size={20} />

                      </div>

                      <div>

                        <h3 className="font-bold text-gray-900">

                          {item.question}

                        </h3>

                      </div>

                    </div>

                  </td>

                  {/* Jawaban */}

                  <td className="px-6 py-5 align-top">

                    <p className="line-clamp-2 text-sm leading-6 text-gray-600">

                      {item.answer}

                    </p>

                  </td>

                  {/* Sort */}

                  <td className="px-6 py-5 text-center">

                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">

                      {item.sort_order}

                    </span>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5 text-center">

                    {item.is_active ? (

                      <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                        Aktif

                      </span>

                    ) : (

                      <span className="inline-flex rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">

                        Non Aktif

                      </span>

                    )}

                  </td>

                  {/* Action */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button

                        onClick={() => openEdit(item)}

                        className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"

                      >

                        <Pencil size={18} />

                      </button>

                      <button

                        onClick={() => openDelete(item)}

                        className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"

                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
            {/* ================= MOBILE CARD ================= */}

      <div className="space-y-5 lg:hidden">

        {filteredFaq.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">

            <HelpCircle
              size={48}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-lg font-bold text-gray-800">

              FAQ Tidak Ditemukan

            </h3>

            <p className="mt-2 text-sm text-gray-500">

              Coba ubah pencarian atau tambahkan FAQ baru.

            </p>

          </div>

        ) : (

          filteredFaq.map((item) => (

            <div

              key={item.id}

              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"

            >

              {/* Header */}

              <div className="flex items-start gap-4 border-b border-gray-100 p-5">

                <div className="rounded-2xl bg-red-100 p-3 text-red-600">

                  <HelpCircle size={22} />

                </div>

                <div className="flex-1">

                  <h3 className="font-bold text-gray-900">

                    {item.question}

                  </h3>

                </div>

              </div>

              {/* Body */}

              <div className="space-y-5 p-5">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">

                    Jawaban

                  </p>

                  <p className="mt-2 text-sm leading-7 text-gray-600">

                    {item.answer}

                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">

                      Urutan

                    </p>

                    <span className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">

                      {item.sort_order}

                    </span>

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">

                      Status

                    </p>

                    <div className="mt-2">

                      {item.is_active ? (

                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                          Aktif

                        </span>

                      ) : (

                        <span className="rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">

                          Non Aktif

                        </span>

                      )}

                    </div>

                  </div>

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

          ))

        )}

      </div>
            {/* ================= DELETE CONFIRMATION ================= */}

      {showDelete && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

            <div className="p-6">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">

                <Trash2
                  size={28}
                  className="text-red-600"
                />

              </div>

              <h3 className="text-2xl font-black text-gray-900">

                Hapus FAQ

              </h3>

              <p className="mt-3 leading-7 text-gray-500">

                Apakah Anda yakin ingin menghapus FAQ berikut?

              </p>

              <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">

                <p className="font-semibold text-red-700">

                  {selectedDelete?.question}

                </p>

              </div>

              <p className="mt-4 text-sm text-red-500">

                Tindakan ini tidak dapat dibatalkan.

              </p>

            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-6 sm:flex-row sm:justify-end">

              <button

                onClick={() => {

                  setShowDelete(false);

                  setSelectedDelete(null);

                }}

                disabled={deleting}

                className="rounded-2xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100 disabled:opacity-60"

              >

                Batal

              </button>

              <button

                onClick={handleDelete}

                disabled={deleting}

                className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"

              >

                {deleting

                  ? "Menghapus..."

                  : "Ya, Hapus"}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= FAQ MODAL ================= */}

      {openModal && (

        <FaqModal

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

export default FaqTable;