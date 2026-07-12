const API_URL =
  "https://script.google.com/macros/s/AKfycbzYA1CZTWOGSN2oRUwKzP3lXZdBFaK3TI59GXUizrc96gR_IDVipTH9B4ec5cc1AHcHiw/exec";

export async function postApi(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}