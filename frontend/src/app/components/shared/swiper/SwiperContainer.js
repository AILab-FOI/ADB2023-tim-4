import Swiper from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useEffect } from "react";

export default function SwiperContainer(props) {
  const { swiperSlideElements } = props;

  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Autoplay],
      loop: true,
      slidesPerView: 2,
      centeredSlides: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });

    return () => swiper.destroy();
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {swiperSlideElements.map((swiperSlideElement) => (
          <div key={swiperSlideElement.id} className="swiper-slide">
            {swiperSlideElement.component}
          </div>
        ))}
      </div>
    </div>
  );
}
