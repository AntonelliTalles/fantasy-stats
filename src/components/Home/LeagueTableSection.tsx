import { Box, Flex, Heading, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function LeagueTableSection() {
  // Exemplo de dados fictícios
  const teams = [
    { name: "Team A", wins: 10, losses: 4 },
    { name: "Team B", wins: 9, losses: 5 },
    { name: "Team C", wins: 8, losses: 6 },
    { name: "Team D", wins: 7, losses: 7 }
  ];

  return (
    <Flex py={16} px={8} direction={{ base: "column", md: "row" }} gap={12}>
      <Box flex={1}>
        <Heading size="xl" mb={4}>Current League</Heading>
        <Text color="gray.600">Check the standings and performance of each team in the league.</Text>
      </Box>
      <Box flex={1} overflowX="auto">
        <Table variant="simple" bg="white" shadow="md" borderRadius="md">
          <Thead>
            <Tr>
              <Th>Team</Th>
              <Th>Wins</Th>
              <Th>Losses</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teams.map((team, idx) => (
              <Tr key={idx}>
                <Td>{team.name}</Td>
                <Td>{team.wins}</Td>
                <Td>{team.losses}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
