import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  HStack,
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
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

type RankingPlayer = {
  position: number;
  playerId: string;
  playerName: string;

  totalScore: number;
  seasonsPlayed: number;
  averageScore: number;

  gold: number;
  silver: number;
  bronze: number;

  regularWins: number;
  regularLosses: number;
  regularTies: number;

  playoffAppearances: number;
  playoffsWins: number;
  playoffsLosses: number;

  positionPoints: number;
};

type PowerRankingResponse = {
  filter: {
    leagueType: string;
  };

  totalPlayers: number;

  ranking: RankingPlayer[];
};

const getPositionMedal = (position: number) => {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";

  return `${position}º`;
};

const getScoreBreakdown = (player: RankingPlayer) => {
  return {
    regularWins: player.regularWins * 3,
    regularTies: player.regularTies * 1,
    regularLosses: player.regularLosses * -1,

    playoffAppearances: player.playoffAppearances * 15,
    playoffsWins: player.playoffsWins * 8,
    playoffsLosses: player.playoffsLosses * -2,

    gold: player.gold * 100,
    silver: player.silver * 60,
    bronze: player.bronze * 35,

    positionPoints: player.positionPoints,
  };
};

export default function PowerRankingPage() {
  const navigate = useNavigate();

  const [ranking, setRanking] = useState<RankingPlayer[]>([]);
  const [selectedLeagueType, setSelectedLeagueType] = useState("ALL");
  const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setIsLoading(true);

        const url =
          selectedLeagueType === "ALL"
            ? "/power-ranking"
            : `/power-ranking?leagueType=${selectedLeagueType}`;

        const response = await api.get<PowerRankingResponse>(url);

        setRanking(response.data.ranking);
      } catch (error) {
        console.error("Erro ao buscar Power Ranking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, [selectedLeagueType]);

  const podium = useMemo(() => ranking.slice(0, 3), [ranking]);

  const leader = ranking[0];

  const toggleBreakdown = (playerId: string) => {
    setExpandedPlayerId((current) =>
      current === playerId ? null : playerId
    );
  };

  if (isLoading) {
    return (
      <Flex minH="80vh" justify="center" align="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      px={{ base: 5, md: 10 }}
      py={10}
    >
      <VStack align="stretch" spacing={8}>
        <Flex
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Box>
            <Badge
              colorScheme="green"
              px={3}
              py={1}
              borderRadius="full"
              mb={3}
            >
              Power Ranking
            </Badge>

            <Heading size="xl">
              Ranking Histórico
            </Heading>

            <Text color="gray.600" mt={2}>
              Ranking calculado com base em campanhas, playoffs,
              posições finais e conquistas.
            </Text>
          </Box>

          <Select
            maxW={{ base: "100%", md: "250px" }}
            bg="white"
            value={selectedLeagueType}
            onChange={(e) =>
              setSelectedLeagueType(e.target.value)
            }
          >
            <option value="ALL">
              Todas as modalidades
            </option>

            <option value="NFL">
              NFL
            </option>

            <option value="NBA">
              NBA
            </option>

            <option value="MLB">
              MLB
            </option>
          </Select>
        </Flex>

        {leader && (
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={5}
          >
            <Box
              bg="white"
              p={5}
              borderRadius="2xl"
              shadow="md"
            >
              <Stat>
                <StatLabel>Líder atual</StatLabel>

                <StatNumber fontSize="xl">
                  🥇 {leader.playerName}
                </StatNumber>
              </Stat>
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="2xl"
              shadow="md"
            >
              <Stat>
                <StatLabel>Maior pontuação</StatLabel>

                <StatNumber>
                  {leader.totalScore}
                </StatNumber>
              </Stat>
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="2xl"
              shadow="md"
            >
              <Stat>
                <StatLabel>Média do líder</StatLabel>

                <StatNumber>
                  {leader.averageScore}
                </StatNumber>
              </Stat>
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="2xl"
              shadow="md"
            >
              <Stat>
                <StatLabel>Temporadas</StatLabel>

                <StatNumber>
                  {leader.seasonsPlayed}
                </StatNumber>
              </Stat>
            </Box>
          </SimpleGrid>
        )}

        {podium.length > 0 && (
          <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            shadow="md"
          >
            <Heading size="md" mb={6}>
              Pódio
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={5}
            >
              {podium.map((player) => {
                const breakdown =
                  getScoreBreakdown(player);

                const isExpanded =
                  expandedPlayerId === player.playerId;

                return (
                  <Box
                    key={player.playerId}
                    bg={
                      player.position === 1
                        ? "yellow.50"
                        : player.position === 2
                        ? "gray.50"
                        : "orange.50"
                    }
                    borderRadius="2xl"
                    p={5}
                    textAlign="center"
                    transition="all 0.25s ease"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "md",
                    }}
                  >
                    <Text fontSize="4xl" mb={3}>
                      {getPositionMedal(player.position)}
                    </Text>

                    <Avatar
                      name={player.playerName}
                      size="lg"
                      mb={3}
                      cursor="pointer"
                      onClick={() =>
                        navigate(`/profile/${player.playerId}`)
                      }
                    />

                    <Heading
                      size="md"
                      cursor="pointer"
                      _hover={{
                        textDecoration: "underline",
                      }}
                      onClick={() =>
                        navigate(`/profile/${player.playerId}`)
                      }
                    >
                      {player.playerName}
                    </Heading>

                    <Text
                      fontWeight="bold"
                      color="green.600"
                      fontSize="2xl"
                      mt={2}
                    >
                      {player.totalScore} pts
                    </Text>

                    <Text
                      fontSize="sm"
                      color="gray.500"
                      mt={1}
                    >
                      Média: {player.averageScore}
                    </Text>

                    <Text
                      fontSize="sm"
                      color="gray.500"
                    >
                      {player.seasonsPlayed} temporada(s)
                    </Text>

                    <HStack
                      justify="center"
                      mt={4}
                      spacing={3}
                    >
                      <Badge colorScheme="yellow">
                        🥇 {player.gold}
                      </Badge>

                      <Badge colorScheme="gray">
                        🥈 {player.silver}
                      </Badge>

                      <Badge colorScheme="orange">
                        🥉 {player.bronze}
                      </Badge>
                    </HStack>

                    <Button
                      mt={5}
                      size="sm"
                      variant="ghost"
                      rightIcon={
                        isExpanded
                          ? <ChevronUp size={16} />
                          : <ChevronDown size={16} />
                      }
                      onClick={() =>
                        toggleBreakdown(player.playerId)
                      }
                    >
                      {isExpanded
                        ? "Ocultar pontuação"
                        : "Ver pontuação detalhada"}
                    </Button>

                    <Collapse
                      in={isExpanded}
                      animateOpacity
                    >
                      <Box
                        mt={4}
                        bg="white"
                        p={4}
                        borderRadius="xl"
                        textAlign="left"
                      >
                        <VStack
                          align="stretch"
                          spacing={2}
                        >
                          <ScoreRow
                            label="Vitórias regular"
                            value={breakdown.regularWins}
                          />

                          <ScoreRow
                            label="Empates regular"
                            value={breakdown.regularTies}
                          />

                          <ScoreRow
                            label="Derrotas regular"
                            value={breakdown.regularLosses}
                          />

                          <ScoreRow
                            label="Classificação playoffs"
                            value={breakdown.playoffAppearances}
                          />

                          <ScoreRow
                            label="Vitórias playoffs"
                            value={breakdown.playoffsWins}
                          />

                          <ScoreRow
                            label="Derrotas playoffs"
                            value={breakdown.playoffsLosses}
                          />

                          <ScoreRow
                            label="Títulos"
                            value={breakdown.gold}
                          />

                          <ScoreRow
                            label="Vice-campeonatos"
                            value={breakdown.silver}
                          />

                          <ScoreRow
                            label="Terceiros lugares"
                            value={breakdown.bronze}
                          />

                          <ScoreRow
                            label="Posições finais"
                            value={breakdown.positionPoints}
                          />

                          <Box
                            borderTop="1px solid"
                            borderColor="gray.200"
                            pt={3}
                            mt={2}
                          >
                            <HStack justify="space-between">
                              <Text fontWeight="bold">
                                Total
                              </Text>

                              <Text
                                fontWeight="bold"
                                color="green.600"
                              >
                                {player.totalScore} pts
                              </Text>
                            </HStack>
                          </Box>
                        </VStack>
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        )}

        <Box
          bg="white"
          borderRadius="2xl"
          shadow="md"
          overflowX="auto"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Jogador</Th>
                <Th>Pontos</Th>
                <Th>Média</Th>
                <Th>Temporadas</Th>
                <Th>🥇</Th>
                <Th>🥈</Th>
                <Th>🥉</Th>
                <Th>Regular</Th>
                <Th>Playoffs</Th>
                <Th>Classificações</Th>
                <Th>Detalhes</Th>
              </Tr>
            </Thead>

            <Tbody>
            {ranking.map((player) => {
                const breakdown = getScoreBreakdown(player);
                const isExpanded = expandedPlayerId === player.playerId;

                return (
                <React.Fragment key={player.playerId}>
                    <Tr
                    transition="all 0.2s ease"
                    _hover={{
                        bg: "gray.50",
                    }}
                    >
                    <Td fontWeight="bold">
                        {getPositionMedal(player.position)}
                    </Td>

                    <Td>
                        <HStack>
                        <Avatar
                            size="sm"
                            name={player.playerName}
                            cursor="pointer"
                            onClick={() =>
                            navigate(`/profile/${player.playerId}`)
                            }
                        />

                        <Text
                            fontWeight="bold"
                            cursor="pointer"
                            _hover={{
                            textDecoration: "underline",
                            }}
                            onClick={() =>
                            navigate(`/profile/${player.playerId}`)
                            }
                        >
                            {player.playerName}
                        </Text>
                        </HStack>
                    </Td>

                    <Td>
                        <Badge
                        colorScheme="green"
                        fontSize="sm"
                        >
                        {player.totalScore}
                        </Badge>
                    </Td>

                    <Td>{player.averageScore}</Td>

                    <Td>{player.seasonsPlayed}</Td>

                    <Td>{player.gold}</Td>

                    <Td>{player.silver}</Td>

                    <Td>{player.bronze}</Td>

                    <Td>
                        {player.regularWins}-
                        {player.regularLosses}-
                        {player.regularTies}
                    </Td>

                    <Td>
                        {player.playoffsWins}-
                        {player.playoffsLosses}
                    </Td>

                    <Td>{player.playoffAppearances}</Td>

                    <Td>
                        <Button
                        size="sm"
                        variant="ghost"
                        rightIcon={
                            isExpanded
                            ? <ChevronUp size={16} />
                            : <ChevronDown size={16} />
                        }
                        onClick={() =>
                            toggleBreakdown(player.playerId)
                        }
                        >
                        {isExpanded
                            ? "Ocultar"
                            : "Detalhes"}
                        </Button>
                    </Td>
                    </Tr>

                    <Tr>
                    <Td colSpan={12} p={0} border="none">
                        <Collapse in={isExpanded} animateOpacity>
                        <Box
                            px={6}
                            py={5}
                            bg="gray.50"
                            borderBottom="1px solid"
                            borderColor="gray.200"
                        >
                            <SimpleGrid
                            columns={{
                                base: 1,
                                md: 2,
                                xl: 3,
                            }}
                            spacing={6}
                            >
                            <Box>
                                <Text
                                fontWeight="bold"
                                mb={3}
                                >
                                Temporada Regular
                                </Text>

                                <VStack
                                align="stretch"
                                spacing={2}
                                >
                                <ScoreRow
                                    label="Vitórias"
                                    value={breakdown.regularWins}
                                />

                                <ScoreRow
                                    label="Empates"
                                    value={breakdown.regularTies}
                                />

                                <ScoreRow
                                    label="Derrotas"
                                    value={breakdown.regularLosses}
                                />
                                </VStack>
                            </Box>

                            <Box>
                                <Text
                                fontWeight="bold"
                                mb={3}
                                >
                                Playoffs
                                </Text>

                                <VStack
                                align="stretch"
                                spacing={2}
                                >
                                <ScoreRow
                                    label="Classificações"
                                    value={breakdown.playoffAppearances}
                                />

                                <ScoreRow
                                    label="Vitórias"
                                    value={breakdown.playoffsWins}
                                />

                                <ScoreRow
                                    label="Derrotas"
                                    value={breakdown.playoffsLosses}
                                />
                                </VStack>
                            </Box>

                            <Box>
                                <Text
                                fontWeight="bold"
                                mb={3}
                                >
                                Conquistas
                                </Text>

                                <VStack
                                align="stretch"
                                spacing={2}
                                >
                                <ScoreRow
                                    label="Títulos"
                                    value={breakdown.gold}
                                />

                                <ScoreRow
                                    label="Vice-campeonatos"
                                    value={breakdown.silver}
                                />

                                <ScoreRow
                                    label="Terceiros lugares"
                                    value={breakdown.bronze}
                                />

                                <ScoreRow
                                    label="Posições finais"
                                    value={breakdown.positionPoints}
                                />
                                </VStack>
                            </Box>
                            </SimpleGrid>

                            <Flex
                            mt={5}
                            pt={4}
                            borderTop="1px solid"
                            borderColor="gray.200"
                            justify="space-between"
                            align="center"
                            flexWrap="wrap"
                            gap={3}
                            >
                            <Box>
                                <Text
                                fontSize="sm"
                                color="gray.500"
                                >
                                Power Score
                                </Text>

                                <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="green.600"
                                >
                                {player.totalScore} pts
                                </Text>
                            </Box>

                            <Box textAlign={{ base: "left", md: "right" }}>
                                <Text
                                fontSize="sm"
                                color="gray.500"
                                >
                                Média por temporada
                                </Text>

                                <Text fontWeight="bold">
                                {player.averageScore}
                                </Text>
                            </Box>
                            </Flex>
                        </Box>
                        </Collapse>
                    </Td>
                    </Tr>
                </React.Fragment>
                );
            })}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}

type ScoreRowProps = {
  label: string;
  value: number;
};

const ScoreRow = ({
  label,
  value,
}: ScoreRowProps) => {
  const isPositive = value > 0;
  const isNegative = value < 0;

  return (
    <HStack justify="space-between">
      <Text
        fontSize="sm"
        color="gray.600"
      >
        {label}
      </Text>

      <Text
        fontSize="sm"
        fontWeight="bold"
        color={
          isPositive
            ? "green.600"
            : isNegative
            ? "red.500"
            : "gray.500"
        }
      >
        {isPositive ? "+" : ""}
        {value}
      </Text>
    </HStack>
  );
};