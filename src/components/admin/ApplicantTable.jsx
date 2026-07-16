import StatusBadge from "./StatusBadge";

function ApplicantTable({
  applicants,
  onDetail,
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

      <table className="w-full">

        <thead className="bg-red-700 text-white">

          <tr>

            <th className="px-5 py-4 text-left">No</th>

            <th className="px-5 py-4 text-left">
              Nomor
            </th>

            <th className="px-5 py-4 text-left">
              Nama
            </th>

            <th className="px-5 py-4 text-left">
              Kelas
            </th>

            <th className="px-5 py-4 text-left">
              Status
            </th>

            <th className="px-5 py-4 text-center">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          {applicants.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="py-16 text-center text-gray-500"
              >

                Belum ada data.

              </td>

            </tr>

          ) : (

            applicants.map((item, index) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-5 py-4">

                  {index + 1}

                </td>

                <td className="px-5 py-4 font-semibold">

                  {item.registration_number}

                </td>

                <td className="px-5 py-4">

                  {item.full_name}

                </td>

                <td className="px-5 py-4">

                  {item.class}

                </td>

                <td className="px-5 py-4">

                  <StatusBadge
                    status={item.status}
                  />

                </td>

                <td className="px-5 py-4 text-center">

                  <button

                    onClick={() => onDetail(item)}

                    className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"

                  >

                    Detail

                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );
}

export default ApplicantTable;