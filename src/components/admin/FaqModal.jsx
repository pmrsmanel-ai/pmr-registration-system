import { useState } from "react";

import {
  X,
  Save,
} from "lucide-react";

import {
  createFaq,
  updateFaq,
} from "../../services/faqApi";

function FaqModal({

  item,

  onClose,

}) {

  const isEdit = !!item;

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({

      question:
        item?.question || "",

      answer:
        item?.answer || "",

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

        await updateFaq(

          item.id,

          form,

        );

      }

      else {

        await createFaq(

          form,

        );

      }

      onClose();

    }

    catch(err){

      console.error(err);

      alert(err.message);

    }

    finally{

      setSaving(false);

    }

  }

  return(

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-3xl font-black">

              {

                isEdit

                  ? "Edit FAQ"

                  : "Tambah FAQ"

              }

            </h2>

            <p className="mt-2 text-gray-500">

              Kelola pertanyaan yang tampil pada Homepage.

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
            
                  <div>

            <label className="font-semibold">

              Pertanyaan

            </label>

            <input

              type="text"

              value={form.question}

              onChange={(e)=>

                change(

                  "question",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

              placeholder="Masukkan pertanyaan"

            />

          </div>

          <div>

            <label className="font-semibold">

              Jawaban

            </label>

            <textarea

              rows={6}

              value={form.answer}

              onChange={(e)=>

                change(

                  "answer",

                  e.target.value

                )

              }

              className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

              placeholder="Masukkan jawaban"

            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="font-semibold">

                Urutan

              </label>

              <input

                type="number"

                value={form.sort_order}

                onChange={(e)=>

                  change(

                    "sort_order",

                    Number(e.target.value)

                  )

                }

                className="mt-2 w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"

              />

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

                  : "Tambah FAQ"

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
function TextArea({

  label,

  value,

  onChange,

  rows = 5,

}) {

  return (

    <div>

      <label className="font-semibold">

        {label}

      </label>

      <textarea

        rows={rows}

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
export default FaqModal;