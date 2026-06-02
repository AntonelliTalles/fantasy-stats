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
  Input,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import api from "../../services/api";

type HeadToHeadMatch = {
  _id: string;
  league?: {
    _id: string;
    name: string;
  };
  player1?: {
    _id: string;
    name: string;
  };
  player2?: {
    _id: string;
    name: string;
  };
  player1Wins: number;
  player2Wins: number;
  player1PlayoffsWins?: number;
  player2PlayoffsWins?: number;
  totalMatches: number;
  matchName?: string;
};

const getWinnerColor = (valueA: number, valueB: number, side: "left" | "right") => {
  if (valueA === valueB) return "gray";
  if (side === "left") return valueA > valueB ? "green" : "red";
  return valueB > valueA ? "green" : "red";
};

const ComparisonRow = ({
  label,
  player1Value,
  player2Value,
}: {
  label: string;
  player1Value: number;
  player2Value: number;
}) => {
  const total = player1Value + player2Value;
  const player1Percent = total > 0 ? (player1Value / total) * 100 : 50;
  const player2Percent = total > 0 ? (player2Value / total) * 100 : 50;

  return (
    <Box bg="gray.50" borderRadius="xl" p={4}>
      <Flex justify="space-between" mb={2}>
        <Badge colorScheme={getWinnerColor(player1Value, player2Value, "left")}>
          {player1Value}
        </Badge>

        <Text fontWeight="bold" color="gray.700">
          {label}
        </Text>

        <Badge colorScheme={getWinnerColor(player1Value, player2Value, "right")}>
          {player2Value}
        </Badge>
      </Flex>

      <HStack spacing={3}>
        <Progress value={player1Percent} colorScheme="green" flex={1} borderRadius="full" />
        <Progress value={player2Percent} colorScheme="blue" flex={1} borderRadius="full" />
      </HStack>
    </Box>
  );
};

export default function HeadToHeadViewPage() {
  const [matches, setMatches] = useState<HeadToHeadMatch[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get("/head-to-head");
        setMatches(response.data);
      } catch (error) {
        console.error("Erro ao buscar confrontos H2H:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const term = search.toLowerCase();

      return (
        match.league?.name?.toLowerCase().includes(term) ||
        match.player1?.name?.toLowerCase().includes(term) ||
        match.player2?.name?.toLowerCase().includes(term) ||
        match.matchName?.toLowerCase().includes(term)
      );
    });
  }, [matches, search]);

  if (isLoading) {
    return (
      <Flex minH="80vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" px={{ base: 5, md: 10 }} py={10}>
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={5}
        mb={8}
      >
        <Box>
          <Badge colorScheme="green" mb={3} px={3} py={1} borderRadius="full">
            Head-to-Head
          </Badge>

          <Heading size="xl">Confrontos Diretos</Heading>

          <Text color="gray.600" mt={2}>
            Compare rivalidades, vitórias totais, playoffs e desempenho entre jogadores.
          </Text>
        </Box>

        <Box position="relative" w={{ base: "100%", md: "360px" }}>
          <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400">
            <Search size={18} />
          </Box>

          <Input
            bg="white"
            pl={10}
            placeholder="Buscar por jogador ou liga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Flex>

      <VStack spacing={5} align="stretch">
        {filteredMatches.map((match) => {
          const player1Name = match.player1?.name || "Jogador 1";
          const player2Name = match.player2?.name || "Jogador 2";

          const player1Playoffs = match.player1PlayoffsWins || 0;
          const player2Playoffs = match.player2PlayoffsWins || 0;

          const player1Total = match.player1Wins + player1Playoffs;
          const player2Total = match.player2Wins + player2Playoffs;

          const leader =
            player1Total === player2Total
              ? "Empate geral"
              : player1Total > player2Total
              ? `${player1Name} lidera`
              : `${player2Name} lidera`;

          const isExpanded = expandedId === match._id;

          return (
            <Box
              key={match._id}
              bg="white"
              borderRadius="2xl"
              shadow="md"
              overflow="hidden"
              transition="all 0.25s ease"
              _hover={{ shadow: "xl", transform: "translateY(-3px)" }}
            >
              <Flex
                p={6}
                align="center"
                justify="space-between"
                gap={6}
                direction={{ base: "column", md: "row" }}
              >
                <HStack spacing={5} flex={1}>
                  <Avatar name={player1Name} bg="green.500" color="white" />
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      {player1Name} vs {player2Name}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      {match.league?.name || "Liga não informada"}
                    </Text>
                  </Box>
                  <Avatar name={player2Name} bg="blue.500" color="white" />
                </HStack>

                <HStack spacing={4}>
                  <Badge colorScheme={player1Total === player2Total ? "gray" : "green"} px={3} py={1}>
                    {leader}
                  </Badge>

                  <Text fontWeight="bold">
                    {player1Total} - {player2Total}
                  </Text>

                  <Button
                    size="sm"
                    colorScheme="green"
                    variant={isExpanded ? "solid" : "outline"}
                    onClick={() => setExpandedId(isExpanded ? null : match._id)}
                  >
                    {isExpanded ? "Fechar" : "Comparar"}
                  </Button>
                </HStack>
              </Flex>

              <Collapse in={isExpanded} animateOpacity>
                <Box px={6} pb={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={5}>
                    <Box bg="green.50" borderRadius="xl" p={5}>
                      <HStack spacing={4}>
                        <Avatar name={player1Name} bg="green.500" color="white" />
                        <Box>
                          <Text fontSize="xl" fontWeight="bold">
                            {player1Name}
                          </Text>
                          <Text color="gray.600">
                            Total geral: {player1Total} vitórias
                          </Text>
                        </Box>
                      </HStack>
                    </Box>

                    <Box bg="blue.50" borderRadius="xl" p={5}>
                      <HStack spacing={4}>
                        <Avatar name={player2Name} bg="blue.500" color="white" />
                        <Box>
                          <Text fontSize="xl" fontWeight="bold">
                            {player2Name}
                          </Text>
                          <Text color="gray.600">
                            Total geral: {player2Total} vitórias
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  </SimpleGrid>

                  <VStack spacing={4} align="stretch">
                    <ComparisonRow
                      label="Vitórias na fase regular"
                      player1Value={match.player1Wins}
                      player2Value={match.player2Wins}
                    />

                    <ComparisonRow
                      label="Vitórias em playoffs"
                      player1Value={player1Playoffs}
                      player2Value={player2Playoffs}
                    />

                    <ComparisonRow
                      label="Total geral"
                      player1Value={player1Total}
                      player2Value={player2Total}
                    />
                  </VStack>
                </Box>
              </Collapse>
            </Box>
          );
        })}

        {filteredMatches.length === 0 && (
          <Box bg="white" p={8} borderRadius="2xl" textAlign="center" color="gray.500">
            Nenhum confronto encontrado.
          </Box>
        )}
      </VStack>
    </Box>
  );
}