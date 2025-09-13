export async function getVideos() {
  const res = await fetch("http://localhost:5000/api/videos");
  const data = await res.json();
  return data.videos;
}
