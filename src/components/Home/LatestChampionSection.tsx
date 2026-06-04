import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import api from "../../services/api";

type Player = {
  _id: string;
  name: string;
};

type League = {
  _id: string;
  name: string;
  leagueType: string;
  year?: number;
  champion?: Player | null;
};

const getLeagueIcon = (leagueType?: string) => {
  if (leagueType === "NFL") return "🏈";
  if (leagueType === "NBA") return "🏀";
  if (leagueType === "MLB") return "⚾";
  return "🏆";
};

export default function LatestChampionsSection() {
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await api.get("/leagues");
        setLeagues(response.data);
      } catch (error) {
        console.error("Erro ao buscar últimos campeões:", error);
      }
    };

    fetchLeagues();
  }, []);

  const latestChampions = useMemo(() => {
    return leagues
      .filter((league) => league.champion)
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
      .slice(0, 4);
  }, [leagues]);

  return (
    <Box px={{ base: 5, md: 8 }} py={8}>
      <Heading size="lg" mb={5}>
        Últimos campeões
      </Heading>

      {latestChampions.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6}>
          {latestChampions.map((league) => (
            <Box
              key={league._id}
              bg="white"
              p={5}
              borderRadius="2xl"
              shadow="md"
              transition="all 0.25s ease"
              _hover={{
                transform: "translateY(-5px)",
                shadow: "xl",
              }}
            >
              <HStack justify="space-between" mb={4}>
                <Badge colorScheme="green">{league.leagueType}</Badge>
                <Text fontSize="2xl">{getLeagueIcon(league.leagueType)}</Text>
              </HStack>

              <VStack align="start" spacing={3}>
                <Text fontWeight="bold" fontSize="lg">
                  {league.name}
                </Text>

                <Text color="gray.500" fontSize="sm">
                  Temporada {league.year ?? "-"}
                </Text>

                <HStack>
                  <Avatar size="sm" name={league.champion?.name} bg="yellow.400" />
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Campeão
                    </Text>
                    <Text fontWeight="bold">
                      🏆 {league.champion?.name}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Box bg="white" p={8} borderRadius="2xl" shadow="md" color="gray.500">
          Nenhum campeão cadastrado ainda.
        </Box>
      )}
    </Box>
  );
}