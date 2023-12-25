import { SERVER_HOST } from "../../config/config";

export async function fetchVideos() {
  const response = await fetch(`${SERVER_HOST}/videos`);
  const videos = await response.json();
  return videos;
}
