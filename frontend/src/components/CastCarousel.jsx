"use client";

import { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Container,
  Text,
  Center,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

import CastCard from "./CastCard";

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
};
export default function CastCarousel({ credits }) {
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  if (!credits) return <Center>No movie credits data</Center>;

  const { cast } = credits;

  return (
    <Container maxW="container.lg" centerContent>
      <Text fontSize="xx-large"> Cast </Text>
      <Box
        position={"relative"}
        height={"auto"}
        width={"full"}
        overflow={"hidden"}
        py={"1em"}
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
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cast.map((el) => (
            <CastCard
              actorName={el.name}
              characterName={el.chacacter}
              img={el.profile_path}
              id={el.id}
            />
          ))}
        </Slider>
      </Box>
    </Container>
  );
}
