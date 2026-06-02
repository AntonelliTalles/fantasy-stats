import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import api from "../../services/api";

type PlayerHistory = {
  _id: string;
  league?: {
    _id: string;
    name: string;
  };
  player?: {
    _id: string;
    name: string;
  };
  regularWins: number;
  regularLosses: number;
  playoffsWins: number;
  playoffsLosses: number;
  pointsScored: number;
  pointsConceded: number;
  pointDifference: number;
  finalPosition: number;
  seasonYear: number;
};

export default function PlayerHistoryViewPage() {
  const [histories, setHistories] = useState<PlayerHistory[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const response = await api.get("/player-history");
        setHistories(response.data);
      } catch (error) {
        console.error("Erro ao buscar históricos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const players = useMemo(() => {
    const map = new Map<string, string>();

    histories.forEach((history) => {
      if (history.player?._id && history.player?.name) {
        map.set(history.player._id, history.player.name);
      }
    });

    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [histories]);

  const leagues = useMemo(() => {
    const playerHistories = selectedPlayer
      ? histories.filter((history) => history.player?._id === selectedPlayer)
      : histories;

    const map = new Map<string, string>();

    playerHistories.forEach((history) => {
      if (history.league?._id && history.league?.name) {
        map.set(history.league._id, history.league.name);
      }
    });

    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [histories, selectedPlayer]);

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(histories.map((history) => history.seasonYear))
    );

    return uniqueYears.sort((a, b) => b - a);
  }, [histories]);

  const filteredHistories = useMemo(() => {
    return histories.filter((history) => {
      const matchesPlayer = selectedPlayer
        ? history.player?._id === selectedPlayer
        : true;

      const matchesLeague = selectedLeague
        ? history.league?._id === selectedLeague
        : true;

      const matchesYear = selectedYear
        ? String(history.seasonYear) === selectedYear
        : true;

      const matchesSearch = search
        ? history.player?.name?.toLowerCase().includes(search.toLowerCase()) ||
          history.league?.name?.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchesPlayer && matchesLeague && matchesYear && matchesSearch;
    });
  }, [histories, selectedPlayer, selectedLeague, selectedYear, search]);

  const totals = useMemo(() => {
    return filteredHistories.reduce(
      (acc, history) => {
        acc.regularWins += history.regularWins;
        acc.regularLosses += history.regularLosses;
        acc.playoffsWins += history.playoffsWins;
        acc.playoffsLosses += history.playoffsLosses;
        acc.pointsScored += history.pointsScored;
        acc.pointsConceded += history.pointsConceded;
        acc.pointDifference += history.pointDifference;

        return acc;
      },
      {
        regularWins: 0,
        regularLosses: 0,
        playoffsWins: 0,
        playoffsLosses: 0,
        pointsScored: 0,
        pointsConceded: 0,
        pointDifference: 0,
      }
    );
  }, [filteredHistories]);

  if (isLoading) {
    return (
      <Flex minH="80vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" px={{ base: 5, md: 10 }} py={10}>
      <VStack align="stretch" spacing={8}>
        <Box>
          <Badge colorScheme="green" mb={3} px={3} py={1} borderRadius="full">
            Player History
          </Badge>

          <Heading size="xl">Histórico de Temporadas</Heading>

          <Text color="gray.600" mt={2}>
            Consulte o desempenho dos jogadores por liga, temporada regular,
            playoffs, pontos e posição final.
          </Text>
        </Box>

        <Box bg="white" p={5} borderRadius="2xl" shadow="md">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            <Box position="relative">
              <Box
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                color="gray.400"
                zIndex={1}
              >
                <Search size={18} />
              </Box>

              <Input
                pl={10}
                placeholder="Buscar jogador ou liga..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>

            <Select
              placeholder="Selecionar jogador"
              value={selectedPlayer}
              onChange={(e) => {
                setSelectedPlayer(e.target.value);
                setSelectedLeague("");
              }}
            >
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Selecionar liga"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
            >
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Selecionar ano"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </SimpleGrid>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5}>
          <Box bg="white" p={5} borderRadius="2xl" shadow="md">
            <Stat>
              <StatLabel>Recorde Regular</StatLabel>
              <StatNumber>
                {totals.regularWins}-{totals.regularLosses}
              </StatNumber>
            </Stat>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" shadow="md">
            <Stat>
              <StatLabel>Recorde Playoffs</StatLabel>
              <StatNumber>
                {totals.playoffsWins}-{totals.playoffsLosses}
              </StatNumber>
            </Stat>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" shadow="md">
            <Stat>
              <StatLabel>Pontos Marcados</StatLabel>
              <StatNumber>{totals.pointsScored}</StatNumber>
            </Stat>
          </Box>

          <Box bg="white" p={5} borderRadius="2xl" shadow="md">
            <Stat>
              <StatLabel>Saldo de Pontos</StatLabel>
              <StatNumber color={totals.pointDifference >= 0 ? "green.500" : "red.500"}>
                {totals.pointDifference}
              </StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>

        <Box bg="white" borderRadius="2xl" shadow="md" overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Jogador</Th>
                <Th>Liga</Th>
                <Th>Ano</Th>
                <Th>Regular</Th>
                <Th>Playoffs</Th>
                <Th>Pontos Marcados</Th>
                <Th>Pontos Sofridos</Th>
                <Th>Saldo</Th>
                <Th>Posição Final</Th>
              </Tr>
            </Thead>

            <Tbody>
              {filteredHistories.length > 0 ? (
                filteredHistories.map((history) => (
                  <Tr key={history._id} _hover={{ bg: "gray.50" }}>
                    <Td fontWeight="bold">{history.player?.name || "-"}</Td>
                    <Td>{history.league?.name || "-"}</Td>
                    <Td>{history.seasonYear}</Td>
                    <Td>
                      {history.regularWins}-{history.regularLosses}
                    </Td>
                    <Td>
                      {history.playoffsWins}-{history.playoffsLosses}
                    </Td>
                    <Td>{history.pointsScored}</Td>
                    <Td>{history.pointsConceded}</Td>
                    <Td>
                      <Badge colorScheme={history.pointDifference >= 0 ? "green" : "red"}>
                        {history.pointDifference}
                      </Badge>
                    </Td>
                    <Td>{history.finalPosition}º</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={9} textAlign="center" py={8} color="gray.500">
                    Nenhum histórico encontrado.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}