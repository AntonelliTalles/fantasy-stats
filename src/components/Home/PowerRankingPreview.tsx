import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

type RankingPlayer = {
  position: number;
  playerId: string;
  playerName: string;
  totalScore: number;
  averageScore: number;
  seasonsPlayed: number;
  gold: number;
  silver: number;
  bronze: number;
};

type PowerRankingResponse = {
  ranking: RankingPlayer[];
};

const medalBg = (position: number) => {
  if (position === 1) return "yellow.50";
  if (position === 2) return "gray.50";
  return "orange.50";
};

const medalEmoji = (position: number) => {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  return "🥉";
};

export default function PowerRankingPreview() {
  const navigate = useNavigate();

  const [ranking, setRanking] = useState<RankingPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await api.get<PowerRankingResponse>("/power-ranking");

        setRanking(response.data.ranking.slice(0, 3));
      } catch (error) {
        console.error("Erro ao buscar preview do Power Ranking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <Box px={{ base: 5, md: 8 }} py={8}>
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={6}
      >
        <Box>
          <Badge
            colorScheme="green"
            mb={3}
            px={3}
            py={1}
            borderRadius="full"
          >
            Power Ranking
          </Badge>

          <Heading size="lg">Quem está no topo?</Heading>

          <Text color="gray.600" mt={2}>
            Veja os jogadores com maior pontuação histórica considerando
            campanhas, playoffs, posições finais e conquistas.
          </Text>
        </Box>

        <Button
          rightIcon={<ArrowRight size={18} />}
          colorScheme="green"
          variant="outline"
          onClick={() => navigate("/power-ranking")}
        >
          Ver ranking completo
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justify="center" py={10}>
          <Spinner color="green.500" />
        </Flex>
      ) : ranking.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {ranking.map((player) => (
            <Box
              key={player.playerId}
              bg={medalBg(player.position)}
              borderRadius="2xl"
              p={5}
              shadow="md"
              transition="all 0.25s ease"
              _hover={{
                transform: "translateY(-4px)",
                shadow: "xl",
              }}
            >
              <HStack justify="space-between" mb={4}>
                <Text fontSize="3xl">{medalEmoji(player.position)}</Text>

                <Badge colorScheme="green">
                  {player.totalScore} pts
                </Badge>
              </HStack>

              <HStack spacing={4}>
                <Avatar
                  name={player.playerName}
                  cursor="pointer"
                  onClick={() =>
                    navigate(`/profile/${player.playerId}`)
                  }
                />

                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() =>
                      navigate(`/profile/${player.playerId}`)
                    }
                  >
                    {player.playerName}
                  </Text>

                  <Text fontSize="sm" color="gray.600">
                    {player.seasonsPlayed} temporada(s)
                  </Text>

                  <Text fontSize="sm" color="gray.600">
                    Média: {player.averageScore}
                  </Text>
                </Box>
              </HStack>

              <VStack
                align="stretch"
                spacing={2}
                mt={5}
                pt={4}
                borderTop="1px solid"
                borderColor="blackAlpha.100"
              >
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    🥇 Títulos
                  </Text>
                  <Text fontWeight="bold">{player.gold}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    🥈 Vice-campeonatos
                  </Text>
                  <Text fontWeight="bold">{player.silver}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    🥉 Terceiros lugares
                  </Text>
                  <Text fontWeight="bold">{player.bronze}</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Box
          bg="white"
          p={8}
          borderRadius="2xl"
          shadow="md"
          textAlign="center"
          color="gray.500"
        >
          Ainda não há dados suficientes para gerar o Power Ranking.
        </Box>
      )}
    </Box>
  );
}