// src/components/Footer.tsx
import React from 'react';
import { Box, Text, Link, Stack, useColorModeValue, Container } from '@chakra-ui/react';

const Footer: React.FC = () => {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const color = useColorModeValue('brand.900', 'brand.50');
  const borderColor = useColorModeValue('brand.200', 'brand.700');

  return (
    <Box bg={bgColor} color={color}>
      <Container maxW="container.lg">
        <Box borderTopWidth={1} borderStyle={'solid'} borderColor={borderColor} py={4}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justifyContent="space-between" alignItems="center">
            <Text>&copy; {new Date().getFullYear()} Fantasy Stats. All rights reserved.</Text>
            <Stack direction={'row'} spacing={6}>
              <Link href={'#'}>Home</Link>
              <Link href={'#'}>About</Link>
              <Link href={'#'}>Contact</Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
