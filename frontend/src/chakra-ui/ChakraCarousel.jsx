"use client";

import { Global } from "@emotion/react";
import { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Text,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import CarouselCard from "../components/CarouselCard";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function ChakraCarousel({ carouselData = [], title, type }) {
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });
  const slidesToShow = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });

  return (
    <Container maxW="container.lg" centerContent>
      <Global
        styles={`
    .slick-slide {
      padding: 0 10px;
      box-sizing: border-box;
    }

    .slick-list {
      margin: 0 -10px; 
    }
  `}
      />
      <Text
        w="full"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        textAlign="left"
        mt={8}
        mb={4}
        px={2}
        borderBottom="2px solid"
        borderColor="blue.400"
      >
        {title}
      </Text>
      <Box
        position={"relative"}
        height={"auto"}
        width={"full"}
        overflow={"hidden"}
        py={"2em"}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt />
        </IconButton>
        {/* Slider */}
        <Slider
          {...{
            ...settings,
            slidesToShow: slidesToShow || 1, // fallback to 1
          }}
          ref={(slider) => setSlider(slider)}
          key={carouselData.length} // 👈 this forces Slider to remount when data changes
        >
          {carouselData.map((el) => {
            return (
              <CarouselCard
                key={el.id}
                img={el.img}
                rating={el.rating}
                title={el.title}
                releaseDate={el.releaseDate}
                id={el.id}
                type={type}
              />
            );
          })}
        </Slider>
      </Box>
    </Container>
  );
}
