import { globalVideos } from "../video/global-videos";

export default function HomePage() {
  const videos = globalVideos;

  return (
    <div>
      <h1 className="text-center pt-12 mb-2 text-[64px]">
        Video streaming in{" "}
        <span className="text-emerald-800 font-custom--kalnia">Kafka</span>
      </h1>
      <p className="text-center mb-12">
        Click on any video to start streaming it!
      </p>
    </div>
  );
}
