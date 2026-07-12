function StatusBadge({ status }) {

  let color =
    "bg-gray-200 text-gray-700";

  if (status === "Menunggu Verifikasi") {
    color =
      "bg-yellow-100 text-yellow-700";
  }

  if (status === "Diterima") {
    color =
      "bg-green-100 text-green-700";
  }

  if (status === "Ditolak") {
    color =
      "bg-red-100 text-red-700";
  }

  return (

    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${color}`}
    >
      {status}
    </span>

  );

}

export default StatusBadge;