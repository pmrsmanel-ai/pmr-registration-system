import { useState } from "react";

import {
  Download,
  Loader2,
} from "lucide-react";

import { downloadAnnouncement } from "../../utils/downloadAnnouncement";

function DownloadButton() {

  const [loading, setLoading] =
    useState(false);

  async function handleDownload() {

    try {

      setLoading(true);

      await downloadAnnouncement();

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <button

      onClick={handleDownload}

      disabled={loading}

      className="
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-red-700
        px-8
        py-4
        font-bold
        text-white
        shadow-lg
        transition
        hover:bg-red-800
        disabled:cursor-not-allowed
        disabled:opacity-70
      "

    >

      {

        loading

        ? (

          <>

            <Loader2

              size={20}

              className="animate-spin"

            />

            Membuat Gambar...

          </>

        )

        : (

          <>

            <Download size={20} />

            Simpan sebagai Gambar

          </>

        )

      }

    </button>

  );

}

export default DownloadButton;