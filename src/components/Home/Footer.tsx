import React from "react";
import { Box, Flex, HStack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box bg="white" borderTop="1px solid" borderColor="gray.100" mt={8}>
      <Flex
        px={{ base: 5, md: 8 }}
        py={6}
        align="center"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Text color="gray.600">
          © 2025 Fantasy Stats
        </Text>

        <HStack>
          <Button variant="ghost" size="sm" onClick={() => navigate("/players-list")}>
            Jogadores
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/h2h")}>
            H2H
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/histories")}>
            Históricos
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}