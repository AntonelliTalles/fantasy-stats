import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box maxW="container.lg" mx="auto" p={5}>
      <Slider {...settings}>
        <Box>
          <Image src="/assets/nfl-fantasy.jpg" alt="Slide 1" />
        </Box>
        <Box>
          <Image src="/assets/nba-fantasy.jpg" alt="Slide 2" />
        </Box>
        <Box>
          <Image src="/assets/mlb-fantasy.jpg" alt="Slide 3" />
        </Box>
      </Slider>
    </Box>
  );
};

export default Carousel;
