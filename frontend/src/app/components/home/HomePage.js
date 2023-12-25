import { fetchVideos } from "../../services/video/fetchVideos";
import SwiperContainer from "../shared/swiper/SwiperContainer";
import VideoCard from "../video/VideoCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => setVideos(await fetchVideos()))();
  }, []);

  function createSwiperSlideElements() {
    return videos.map((video) => ({
      id: video.id,
      component: (
        <VideoCard
          key={video.id}
          video={video}
          imageClass={
            "rounded-tl rounded-tr object-cover w-full h-[240px] flex"
          }
          videoNameClass={"border-b border-x rounded-bl rounded-br p-5"}
          wrapperClass={"w-[540px] flex flex-col"}
        />
      ),
    }));
  }

  return (
    <div>
      <h1 className="text-center pt-12 mb-2 text-[64px]">
        Video streaming in{" "}
        <span className="text-emerald-800 font-custom--kalnia">Kafka</span>
      </h1>
      <p className="text-center mb-12">
        Click on any video to start streaming it!
      </p>
      <div className="w-[1170px] max-w-full mx-auto">
        <SwiperContainer swiperSlideElements={createSwiperSlideElements()} />
      </div>
    </div>
  );
}
