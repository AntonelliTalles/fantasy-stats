import { SimpleGrid, Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const DashboardCards = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
      <Box p={4} bg="white" borderRadius="md" shadow="sm">
        <Stat>
          <StatLabel>Total de Ligas</StatLabel>
          <StatNumber>12</StatNumber>
        </Stat>
      </Box>
      <Box p={4} bg="white" borderRadius="md" shadow="sm">
        <Stat>
          <StatLabel>Jogadores Cadastrados</StatLabel>
          <StatNumber>48</StatNumber>
        </Stat>
      </Box>
      <Box p={4} bg="white" borderRadius="md" shadow="sm">
        <Stat>
          <StatLabel>Confrontos Diretos</StatLabel>
          <StatNumber>120</StatNumber>
        </Stat>
      </Box>
      <Box p={4} bg="white" borderRadius="md" shadow="sm">
        <Stat>
          <StatLabel>Próximas Partidas</StatLabel>
          <StatNumber>4</StatNumber>
        </Stat>
      </Box>
    </SimpleGrid>
  );
};

export default DashboardCards;
