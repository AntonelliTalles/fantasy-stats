import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Medal,
  Users,
  Calendar,
  Gamepad2,
  BarChart3,
  Swords,
  ListOrdered,
} from "lucide-react";

import api from "../../services/api";

type Player = {
  _id: string;
  name: string;
};

type League = {
  _id: string;
  name: string;
  leagueType: string;
  teamCount?: number;
  teamsQuantity?: number;
  platform?: string;
  year?: number;
  champion?: Player | null;
  runnerUp?: Player | null;
  thirdPlace?: Player | null;
  players?: Player[];
};

type HeadToHead = {
  _id: string;
  league?: {
    _id: string;
    name: string;
  };
};

type PlayerHistory = {
  _id: string;
  league?: {
    _id: string;
    name: string;
  };
};

const getLeagueIcon = (leagueType?: string) => {
  if (leagueType === "NFL") return "🏈";
  if (leagueType === "NBA") return "🏀";
  if (leagueType === "MLB") return "⚾";
  return "🏆";
};

export default function FeaturedLeagueSection() {
  const navigate = useNavigate();

  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [headToHeadList, setHeadToHeadList] = useState<HeadToHead[]>([]);
  const [playerHistories, setPlayerHistories] = useState<PlayerHistory[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [leaguesResponse, headToHeadResponse, historiesResponse] =
          await Promise.all([
            api.get("/leagues"),
            api.get("/head-to-head"),
            api.get("/player-history"),
          ]);

        setLeagues(leaguesResponse.data);
        setHeadToHeadList(headToHeadResponse.data);
        setPlayerHistories(historiesResponse.data);

        if (leaguesResponse.data.length > 0) {
          setSelectedLeagueId(leaguesResponse.data[0]._id);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da Home:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const selectedLeague = useMemo(() => {
    return leagues.find((league) => league._id === selectedLeagueId);
  }, [leagues, selectedLeagueId]);

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  if (!selectedLeague) {
    return (
      <Box px={{ base: 5, md: 8 }} py={12}>
        <Box bg="white" p={8} borderRadius="2xl" shadow="md" textAlign="center">
          <Heading size="md">Nenhuma liga cadastrada ainda.</Heading>
          <Text color="gray.600" mt={2}>
            Cadastre ligas no painel administrativo para visualizar dados na Home.
          </Text>
        </Box>
      </Box>
    );
  }

  const teamsCount =
    selectedLeague.teamCount ??
    selectedLeague.teamsQuantity ??
    selectedLeague.players?.length ??
    0;

  const selectedLeagueH2HCount = headToHeadList.filter(
    (h2h) => h2h.league?._id === selectedLeague._id
  ).length;

  const selectedLeagueHistoriesCount = playerHistories.filter(
    (history) => history.league?._id === selectedLeague._id
  ).length;

  const selectedLeaguePlayersCount = selectedLeague.players?.length ?? teamsCount;

  const championName = selectedLeague.champion?.name ?? "Não definido";

  return (
    <Box px={{ base: 5, md: 8 }} py={8}>
      <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={6}>
        <Box gridColumn={{ lg: "span 3" }}>
          <Box bg="white" p={5} borderRadius="2xl" shadow="md">
            <Heading size="md" mb={5}>
              Principais ligas
            </Heading>

            <VStack align="stretch" spacing={2}>
              {leagues.map((league) => {
                const isSelected = league._id === selectedLeagueId;

                return (
                  <Flex
                    key={league._id}
                    align="center"
                    gap={3}
                    p={3}
                    borderRadius="xl"
                    cursor="pointer"
                    bg={isSelected ? "green.50" : "transparent"}
                    border="1px solid"
                    borderColor={isSelected ? "green.200" : "transparent"}
                    _hover={{ bg: "gray.50" }}
                    onClick={() => setSelectedLeagueId(league._id)}
                  >
                    <Text fontSize="xl">{getLeagueIcon(league.leagueType)}</Text>

                    <Box>
                      <Text fontWeight="bold">{league.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {league.leagueType} • {league.year ?? "-"}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </VStack>
          </Box>
        </Box>

        <Box gridColumn={{ lg: "span 6" }}>
          <Box bg="white" p={6} borderRadius="2xl" shadow="md" minH="100%">
            <HStack justify="space-between" align="start" mb={6}>
              <Box>
                <Badge colorScheme="green" mb={3} borderRadius="full" px={3}>
                  Liga em destaque
                </Badge>

                <Heading size="lg">{selectedLeague.name}</Heading>

                <Text color="gray.500" mt={1}>
                  {selectedLeague.leagueType} • Temporada {selectedLeague.year ?? "-"}
                </Text>
              </Box>

              <Text fontSize="4xl">{getLeagueIcon(selectedLeague.leagueType)}</Text>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
              <Box bg="yellow.50" p={4} borderRadius="xl" textAlign="center">
                <Trophy color="#D69E2E" style={{ margin: "0 auto" }} />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Campeão
                </Text>
                <Text fontWeight="bold">
                  {selectedLeague.champion?.name ?? "Não definido"}
                </Text>
              </Box>

              <Box bg="gray.50" p={4} borderRadius="xl" textAlign="center">
                <Medal color="#718096" style={{ margin: "0 auto" }} />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Vice
                </Text>
                <Text fontWeight="bold">
                  {selectedLeague.runnerUp?.name ?? "Não definido"}
                </Text>
              </Box>

              <Box bg="orange.50" p={4} borderRadius="xl" textAlign="center">
                <Medal color="#DD6B20" style={{ margin: "0 auto" }} />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Terceiro
                </Text>
                <Text fontWeight="bold">
                  {selectedLeague.thirdPlace?.name ?? "Não definido"}
                </Text>
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <HStack bg="gray.50" p={4} borderRadius="xl">
                <Users size={20} />
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Times
                  </Text>
                  <Text fontWeight="bold">{teamsCount}</Text>
                </Box>
              </HStack>

              <HStack bg="gray.50" p={4} borderRadius="xl">
                <Gamepad2 size={20} />
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Plataforma
                  </Text>
                  <Text fontWeight="bold">
                    {selectedLeague.platform || "Não informado"}
                  </Text>
                </Box>
              </HStack>

              <HStack bg="gray.50" p={4} borderRadius="xl">
                <Calendar size={20} />
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Ano
                  </Text>
                  <Text fontWeight="bold">{selectedLeague.year ?? "-"}</Text>
                </Box>
              </HStack>
            </SimpleGrid>
          </Box>
        </Box>

        <Box gridColumn={{ lg: "span 3" }}>
          <Box bg="white" p={5} borderRadius="2xl" shadow="md" minH="100%">
            <Heading size="md" mb={2}>
              Atalhos da liga
            </Heading>

            <Text fontSize="sm" color="gray.500" mb={5}>
              Navegue rapidamente pelos dados relacionados à liga selecionada.
            </Text>

            <VStack align="stretch" spacing={3}>
              <Button
                justifyContent="flex-start"
                leftIcon={<ListOrdered size={18} />}
                colorScheme="green"
                onClick={() => navigate(`/view-league/${selectedLeague._id}`)}
              >
                Ver detalhes da liga
              </Button>

              <Button
                justifyContent="flex-start"
                leftIcon={<Users size={18} />}
                variant="outline"
                onClick={() => navigate("/players-list")}
              >
                Ver jogadores
              </Button>

              <Button
                justifyContent="flex-start"
                leftIcon={<BarChart3 size={18} />}
                variant="outline"
                onClick={() => navigate("/histories")}
              >
                Ver históricos
              </Button>

              <Button
                justifyContent="flex-start"
                leftIcon={<Swords size={18} />}
                variant="outline"
                onClick={() => navigate("/h2h")}
              >
                Ver H2H
              </Button>
            </VStack>

            <Box mt={6}>
              <Text fontWeight="bold" mb={3}>
                Resumo rápido
              </Text>

              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between" bg="gray.50" p={3} borderRadius="xl">
                  <Text fontSize="sm" color="gray.600">
                    👥 Jogadores
                  </Text>
                  <Text fontWeight="bold">{selectedLeaguePlayersCount}</Text>
                </HStack>

                <HStack justify="space-between" bg="gray.50" p={3} borderRadius="xl">
                  <Text fontSize="sm" color="gray.600">
                    ⚔️ H2H
                  </Text>
                  <Text fontWeight="bold">{selectedLeagueH2HCount}</Text>
                </HStack>

                <HStack justify="space-between" bg="gray.50" p={3} borderRadius="xl">
                  <Text fontSize="sm" color="gray.600">
                    📈 Históricos
                  </Text>
                  <Text fontWeight="bold">{selectedLeagueHistoriesCount}</Text>
                </HStack>

                <HStack justify="space-between" bg="yellow.50" p={3} borderRadius="xl">
                  <Text fontSize="sm" color="gray.600">
                    🏆 Campeão
                  </Text>
                  <Text fontWeight="bold" textAlign="right">
                    {championName}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}