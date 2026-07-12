export function fileToBase64(file) {
  return new Promise((resolve, reject) => {

    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

  });
}