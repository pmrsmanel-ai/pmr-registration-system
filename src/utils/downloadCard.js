import { toJpeg } from "html-to-image";

export async function downloadCard(cardRef, registrationNumber) {
  if (!cardRef.current) return;

  try {
    const dataUrl = await toJpeg(cardRef.current, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });

    const link = document.createElement("a");

    link.download = `Bukti-Pendaftaran-${registrationNumber}.jpg`;

    link.href = dataUrl;

    link.click();
  } catch (err) {
    console.error(err);
  }
}