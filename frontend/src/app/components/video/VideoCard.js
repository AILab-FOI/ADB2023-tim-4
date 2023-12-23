import { createSearchParams } from "react-router-dom";

export default function VideoCard(props) {
  const { video, imageClass, videoNameClass, wrapperClass } = props;
  return (
    <div className={wrapperClass}>
      <a href={`/video/${video.name}?${createSearchParams(video)}`}>
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 translate -translate-x-1/2 -translate-y-1/2">
            <span className="material-symbols-outlined text-white text-[64px]">
              play_circle
            </span>
          </div>
          <div className="bg-black/25 absolute w-full h-full top-0 left-0" />
          <img
            className={imageClass}
            src={video.thumbnailPath}
            alt={video.name}
          />
        </div>
        <div className={videoNameClass}>
          <p>{video.name}</p>
        </div>
      </a>
    </div>
  );
}
