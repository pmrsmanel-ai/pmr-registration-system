import { Download } from "lucide-react";
import { downloadCard } from "../../utils/downloadCard";

function DownloadButton({
  cardRef,
  registrationNumber,
}) {
  return (
    <button
      onClick={() =>
        downloadCard(cardRef, registrationNumber)
      }
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
    >
      <Download size={20} />

      Simpan Bukti Pendaftaran
    </button>
  );
}

export default DownloadButton;