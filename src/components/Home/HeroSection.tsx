import { Box, Flex, Heading, Text, Button, HStack, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PlayerPerformanceChart from "../Home2/PlayerPerformanceChart";
import { HomeStats, PlayerHistoryRecord } from "./Homepage";

type HeroSectionProps = {
  stats: HomeStats;
  histories: PlayerHistoryRecord[];
};

export default function HeroSection({ stats, histories }: HeroSectionProps) {
  const navigate = useNavigate();

  const firstHistory = histories[0];

  return (
    <Flex
      bg="gray.50"
      py={16}
      px={{ base: 6, md: 10 }}
      align="center"
      justify="space-between"
      gap={10}
      direction={{ base: "column", md: "row" }}
    >
      <Box maxW="lg">
        <HStack mb={4}>
          <Badge colorScheme="green" px={3} py={1} borderRadius="full">
            Fantasy Stats
          </Badge>
          <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
            Dashboard ativo
          </Badge>
        </HStack>

        <Heading size="2xl" mb={4}>
          Acompanhe sua liga fantasy com dados reais
        </Heading>

        <Text fontSize="lg" color="gray.600" lineHeight="1.7">
          Consulte jogadores, ligas, confrontos diretos, históricos por temporada,
          rankings e estatísticas completas dos seus campeonatos com seus amigos.
        </Text>

        <HStack mt={6} spacing={4} color="gray.600" fontSize="sm">
          <Text>{stats.totalPlayers} jogadores</Text>
          <Text>•</Text>
          <Text>{stats.totalLeagues} ligas</Text>
          <Text>•</Text>
          <Text>{stats.totalHeadToHead} H2H</Text>
        </HStack>
      </Box>

      <Box
        w={{ base: "100%", md: "50%" }}
        minH="320px"
        bg="white"
        borderRadius="2xl"
        shadow="md"
        p={6}
      >
        {firstHistory ? (
          <PlayerPerformanceChart
            season={firstHistory.seasonYear}
            leagueId={firstHistory.league?._id}
            playerId={firstHistory.player?._id}
          />
        ) : (
          <Flex h="260px" align="center" justify="center" color="gray.500">
            Cadastre históricos para visualizar gráficos aqui.
          </Flex>
        )}
      </Box>
    </Flex>
  );
}