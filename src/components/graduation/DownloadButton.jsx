import { useRef } from "react";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

import ParticipantCard from "./ParticipantCard";

function DownloadButton({ applicant }) {

  const cardRef = useRef(null);

  const handleDownload = async () => {

    if (!cardRef.current) return;

    try {

        const node = cardRef.current;

        const dataUrl = await toPng(node, {

            cacheBust: true,

            pixelRatio: 2,

            canvasWidth: 1080,

            canvasHeight: 1350,

            width: 1080,

            height: 1350,

            backgroundColor: "#ffffff",

            skipFonts: false,

            style: {
                margin: "0",
                transform: "none",
                transformOrigin: "top left",
            }

        });

        saveAs(
            dataUrl,
            `${applicant.registration_number}.png`
        );

    } catch (err) {

        console.error(err);

    }

};

  return (

    <>

      {/* Area tersembunyi untuk proses export */}

      <div
style={{
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: "1080px",
    height: "1350px",
    overflow: "hidden",
    pointerEvents: "none",
    opacity: 1,
}}
>

        <div
    ref={cardRef}
    style={{
        width: "1080px",
        height: "1350px",
        overflow: "hidden",
        background: "#fff",
    }}
>

          <ParticipantCard applicant={applicant} />

        </div>

      </div>

      {/* Tombol */}

      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-3 rounded-2xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
      >

        <Download size={20} />

        Download Kartu Peserta

      </button>

    </>

  );

}

export default DownloadButton;