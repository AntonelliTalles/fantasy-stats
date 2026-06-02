import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PlayerHistoryRecord } from "./Homepage";

type LeagueTableSectionProps = {
  histories: PlayerHistoryRecord[];
};

export default function LeagueTableSection({ histories }: LeagueTableSectionProps) {
  const navigate = useNavigate();

  const latestHistories = histories.slice(0, 5);

  return (
    <Flex
      py={16}
      px={{ base: 6, md: 10 }}
      direction={{ base: "column", md: "row" }}
      gap={12}
      align="center"
    >
      <Box flex={1}>
        <Badge colorScheme="green" mb={4} px={3} py={1} borderRadius="full">
          Season overview
        </Badge>

        <Heading size="xl" mb={4}>
          Últimos históricos cadastrados
        </Heading>

        <Text color="gray.600" lineHeight="1.7" mb={6}>
          Acompanhe rapidamente os desempenhos mais recentes dos jogadores por liga,
          temporada, recorde e pontuação.
        </Text>

        <Button colorScheme="green" onClick={() => navigate("/player-history/manage")}>
          Abrir histórico completo
        </Button>
      </Box>

      <Box flex={1.4} overflowX="auto" bg="white" shadow="md" borderRadius="2xl" p={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Jogador</Th>
              <Th>Liga</Th>
              <Th>Temporada</Th>
              <Th>Regular</Th>
              <Th>Playoffs</Th>
              <Th>Saldo</Th>
            </Tr>
          </Thead>

          <Tbody>
            {latestHistories.length > 0 ? (
              latestHistories.map((history) => (
                <Tr
                  key={history._id}
                  transition="all 0.2s"
                  _hover={{ bg: "gray.50", cursor: "pointer" }}
                  onClick={() => navigate("/player-history/manage")}
                >
                  <Td fontWeight="medium">{history.player?.name || "-"}</Td>
                  <Td>{history.league?.name || "-"}</Td>
                  <Td>{history.seasonYear}</Td>
                  <Td>
                    {history.regularWins}-{history.regularLosses}
                  </Td>
                  <Td>
                    {history.playoffsWins}-{history.playoffsLosses}
                  </Td>
                  <Td>
                    <Badge colorScheme={history.pointDifference >= 0 ? "green" : "red"}>
                      {history.pointDifference}
                    </Badge>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center" color="gray.500" py={8}>
                  Nenhum histórico cadastrado ainda.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}