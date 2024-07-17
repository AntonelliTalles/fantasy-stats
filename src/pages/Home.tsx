// src/pages/Home.tsx
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Carousel from '../components/Carousel';

const Home: React.FC = () => {
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Box w="full" maxW="container.lg">
        <Carousel />
      </Box>
    </Flex>
  );
};

export default Home;
