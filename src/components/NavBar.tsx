// src/components/NavBar.tsx
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';

const NavBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const hoverBgColor = useColorModeValue('brand.200', 'brand.700');
  const textColor = useColorModeValue('brand.900', 'brand.50');

  return (
    <Box bg={bgColor} color={textColor}>
      <Container maxW="container.lg">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold">Fantasy Stats</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={'#'}>
                Home
              </Link>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={'#'}>
                About
              </Link>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Services
                </MenuButton>
                <MenuList>
                  <MenuItem>Service 1</MenuItem>
                  <MenuItem>Service 2</MenuItem>
                  <MenuItem>Service 3</MenuItem>
                </MenuList>
              </Menu>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={'#'}>
                Contact
              </Link>
            </HStack>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={'#'}>
                Home
              </Link>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={'#'}>
                About
              </Link>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Services
                </MenuButton>
                <MenuList>
                  <MenuItem>Service 1</MenuItem>
                  <MenuItem>Service 2</MenuItem>
                  <MenuItem>Service 3</MenuItem>
                </MenuList>
              </Menu>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBgColor,
                }}
                href={'#'}>
                Contact
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default NavBar;
