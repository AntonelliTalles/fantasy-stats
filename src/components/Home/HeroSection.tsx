import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import PlayerPerformanceChart from "../Home2/PlayerPerformanceChart";

export default function HeroSection() {
  return (
    <Flex
      bg="gray.50"
      py={16}
      px={8}
      align="center"
      justify="space-between"
      direction={{ base: "column", md: "row" }}
    >
      <Box maxW="lg" mb={{ base: 8, md: 0 }}>
        <Heading size="2xl" mb={4}>Get Started</Heading>
        <Text fontSize="lg" color="gray.600">
          Explore player stats, historical results, and fantasy league standings.
        </Text>
        <Button mt={6} colorScheme="green">Go to Dashboard</Button>
      </Box>
      <Box w={{ base: "100%", md: "50%" }} h="300px">
        <PlayerPerformanceChart season={2025} leagueId="1" playerId="1" />
      </Box>
    </Flex>
  );
}
