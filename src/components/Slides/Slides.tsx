import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { IImageProduct } from "./../../interfaces/product";
import { Box, Image } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const Slides = ({ images }: { images: IImageProduct[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Box w={"450px"}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        // className="mySwiper2"
      >
        {images.map((image) => {
          const { id, src, alt } = image;

          return (
            <SwiperSlide
              key={id}
              style={{
                width: "100%",
                height: "100%",
                color: "red",
              }}
            >
              <Image src={src} alt={alt} className="swiper_image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={24}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper "
      >
        {images.map((image) => {
          const { id, src, alt } = image;

          return (
            <SwiperSlide key={id} className="swiper_image_perview_container">
              <Image src={src} alt={alt} className="swiper_image_perview" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Slides;
