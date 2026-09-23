import React from "react";
import { Box, Flex, HStack, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import logo from "../../images/fs.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box bg="white" borderBottom="1px solid" borderColor="gray.100">
      <Flex
        h="64px"
        px={{ base: 5, md: 8 }}
        align="center"
        justify="space-between"
      >
        <Image
          src={logo}
          alt="Fantasy Stats"
          w={{ base: "140px", md: "170px" }}
          maxH="48px"
          objectFit="contain"
          cursor="pointer"
          onClick={() => navigate("/")}
        />

        <HStack spacing={6}>
          <Button variant="ghost" onClick={() => navigate("/histories")}>
            Stats
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate("/all-time")}
          >
            All-Time
          </Button>

          <Button variant="ghost" onClick={() => navigate("/h2h")}>
            H2H
          </Button>

          <Button variant="ghost" onClick={() => navigate("/leagues/view")}>
            Ligas
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate("/power-ranking")}
          >
            Ranking
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}