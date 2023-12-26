import { HOME_PAGE } from "../router/AppRouter";
import OtherVideosContainer from "./OtherVideosContainer";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import Hls from "hls.js";
import { useEffect, useState } from "react";
import { fetchVideos } from "../../services/video/fetchVideos";

export default function VideoPage() {
  const { name } = useParams();
  const video = queryString.parse(useLocation().search);
  const [otherVideos, setOtherVideos] = useState([]);
  const hlsPlaylistUrl = "http://localhost:3000/hlsPlaylist";

  useEffect(() => {
    (async () => setOtherVideos(await fetchVideos()))();
  }, []);

  useEffect(() => {
    const hls = new Hls();
    const videoTag = document.getElementById("my-video");
    const url = hlsPlaylistUrl + "?name=" + video.videoPath;
    if (Hls.isSupported()) {
      hls.loadSource(url);
      hls.attachMedia(videoTag);
    } else if (videoTag?.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support
      videoTag.src = url;
    } else {
      console.error(
        "HLS.js is not supported, and native HLS is not supported on this browser."
      );
    }
    return () => hls.destroy();
  }, [video.name]);

  return (
    <div className="w-[1170px] max-w-full mx-auto pt-12">
      <a href={HOME_PAGE} className="flex gap-2 text-emerald-700">
        <span className="material-symbols-outlined"> arrow_back </span>
        <span>Go back</span>
      </a>
      <h1 className="text-[48px] mb-6">{name}</h1>
      <div className="grid grid-cols-12 gap-10 mb-6">
        <video
          controls
          id="my-video"
          type="video/mp4"
          className="col-span-8 w-full"
        ></video>
        <div className="col-span-4 rounded pb-1 pr-12">
          <h2 className="text-3xl pb-2 mb-2">Other videos</h2>
          <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-4">
            <OtherVideosContainer otherVideos={otherVideos} />
          </div>
        </div>
      </div>
    </div>
  );
}
