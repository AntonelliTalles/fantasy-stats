import React from "react";
import { Box, Flex, HStack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
        <Text
          fontSize="xl"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          Fantasy Stats
        </Text>

        <HStack spacing={6}>
          <Button variant="ghost" onClick={() => navigate("/histories")}>
            Stats
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