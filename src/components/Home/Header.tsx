
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import logo from "../../images/fs.png";

const menuItems = [
  { label: "Stats", path: "/histories" },
  { label: "All-Time", path: "/all-time" },
  { label: "H2H", path: "/h2h" },
  { label: "Ligas", path: "/leagues/view" },
  { label: "Ranking", path: "/power-ranking" },
];

export default function Header() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      width="100%"
    >
      <Flex
        h="64px"
        px={{ base: 5, md: 8 }}
        align="center"
        justify="space-between"
        gap={4}
      >
        <Image
          src={logo}
          alt="Fantasy Stats"
          w={{ base: "140px", md: "170px" }}
          maxH="48px"
          objectFit="contain"
          cursor="pointer"
          flexShrink={0}
          onClick={() => handleNavigate("/")}
        />

        {/* Navegação desktop */}
        <HStack
          spacing={6}
          display={{ base: "none", md: "flex" }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </HStack>

        {/* Botão hambúrguer mobile */}
        <IconButton
          aria-label="Abrir menu de navegação"
          icon={<HamburgerIcon boxSize={6} />}
          variant="ghost"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />
      </Flex>

      {/* Menu lateral mobile */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="xs"
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader
            borderBottomWidth="1px"
            pr={12}
          >
            Menu
          </DrawerHeader>

          <DrawerBody pt={6}>
            <VStack spacing={3} align="stretch">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  justifyContent="flex-start"
                  width="100%"
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
