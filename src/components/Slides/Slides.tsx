import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { IImageProduct } from "./../../interfaces/product";
import { Box, Image } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./stytes.css";

const Slides = ({ images }: { images: IImageProduct[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Box maxW={"450px"}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        style={{
          width: "100%",
          height: "500px",
          marginBottom: "32px",
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          "--swiper-navigation-size": "26px",
          "--swiper-pagination-size": "26px",
        }}
      >
        {images.map((image) => {
          const { id, src, alt } = image;

          return (
            <SwiperSlide
              key={id}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={src}
                alt={alt}
                width={"100%"}
                height={"100%"}
                objectFit={"cover"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image) => {
            const { id, src, alt } = image;

            return (
              <SwiperSlide
                key={id}
                style={{
                  width: "125px",
                  height: "125px",
                  // padding: 0,
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  w={"100%"}
                  h={"100%"}
                  paddingX={"12px"}
                  objectFit={"cover"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Box>
  );
};

export default Slides;
