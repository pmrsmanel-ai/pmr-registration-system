import html2canvas from "html2canvas";

export async function downloadAnnouncement() {

  const element = document.getElementById(
    "announcement-card"
  );

  if (!element) {

    alert("Announcement Card tidak ditemukan.");

    return;

  }

  try {

    const canvas = await html2canvas(

      element,

      {

        scale: 3,

        useCORS: true,

        backgroundColor: "#ffffff",

        logging: false,

      }

    );

    const image = canvas.toDataURL(
      "image/png",
      1
    );

    const link =
      document.createElement("a");

    link.href = image;

    link.download =
      `PMR-SMANEL-${Date.now()}.png`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  }

  catch (err) {

    console.error(err);

    alert(
      "Gagal membuat gambar."
    );

  }

}