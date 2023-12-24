import VideoCard from "./VideoCard";

export default function OtherVideosContainer(props) {
  const { otherVideos } = props;

  return (
    <div>
      {otherVideos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          imageClass={"rounded object-cover w-full h-[120px] flex"}
          videoNameClass={"font-bold"}
        />
      ))}
    </div>
  );
}
