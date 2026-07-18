import { toJpeg } from "html-to-image";

async function waitForImages(container) {
  const images = Array.from(container.querySelectorAll("img"));

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
}

export async function downloadCard(cardRef, registrationNumber) {
  if (!cardRef.current) return;

  try {
    if (document.fonts) {
      await document.fonts.ready;
    }

    await waitForImages(cardRef.current);

    await new Promise((resolve) => setTimeout(resolve, 150));

    const dataUrl = await toJpeg(cardRef.current, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: "#ffffff",
      cacheBust: true,
      width: cardRef.current.scrollWidth,
      height: cardRef.current.scrollHeight,
    });

    const link = document.createElement("a");
    link.download = `Bukti-Pendaftaran-${registrationNumber}.jpg`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("Gagal mengunduh kartu:", err);
  }
}