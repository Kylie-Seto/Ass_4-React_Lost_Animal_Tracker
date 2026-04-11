// The photo must be uploaded to ImgBB (https://api.imgbb.com) and the returned hosted URL stored as part of the report — do not store raw image data in JSONbin

// two diff versions of images returned by ImgBB API
interface ImgBBUrls {
  full: string;
  thumb: string;
}

export async function uploadImg(photo: File): Promise<ImgBBUrls> {
  const KEY = import.meta.env.VITE_IMGBB_KEY as string;
  const BASE = "https://api.imgbb.com/1/upload";

  if (!KEY) throw new Error("VITE_IMGBB_KEY is not set in .env");

  const form = new FormData();
  form.append("image", photo); // API expects form-data with "image" 

  const res = await fetch(`${BASE}?key=${KEY}`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error(`ImgBB upload failed: ${res.status}`);

  const json = await res.json();
  return {
    full: json.data.url,
    thumb: json.data.thumb.url,
  };
}
