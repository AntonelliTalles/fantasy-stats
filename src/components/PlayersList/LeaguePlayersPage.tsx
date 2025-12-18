import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Text,
  Badge,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Exemplo de tipo de jogador
interface Player {
  id: string;
  name: string;
  age: number;
  favoriteTeams: string[];
  leagueTypes: string[];
  titlesWon: string[];
}

const LeaguePlayersPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock de dados (mais tarde será do backend)
  useEffect(() => {
    const mockPlayers: Player[] = [
      {
        id: "1",
        name: "Alice",
        age: 25,
        favoriteTeams: ["Team A", "Team B"],
        leagueTypes: ["Fantasy NFL", "Fantasy NBA"],
        titlesWon: ["Champion 2023", "MVP 2024"],
      },
      {
        id: "2",
        name: "Bob",
        age: 28,
        favoriteTeams: ["Team C"],
        leagueTypes: ["Fantasy MLB"],
        titlesWon: ["Runner-up 2023"],
      },
      {
        id: "3",
        name: "Charlie",
        age: 22,
        favoriteTeams: ["Team D", "Team A"],
        leagueTypes: ["Fantasy NFL"],
        titlesWon: [],
      },
    ];
    setPlayers(mockPlayers);
  }, []);

  // Filtragem por nome
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading mb={6}>Players List</Heading>

      {/* Campo de busca */}
      <InputGroup mb={6} maxW="400px">
        <InputLeftElement pointerEvents="none">
          <Search color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
        />
      </InputGroup>

      {/* Lista de jogadores */}
      <Flex direction="column" gap={4}>
        {filteredPlayers.map((player) => (
          <Box
            key={player.id}
            bg="white"
            p={4}
            borderRadius="md"
            shadow="sm"
            cursor="pointer"
          >
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={4}>
                {/* Avatar com letra inicial */}
                <Avatar name={player.name} bg="blue.400" color="white" />
                <Text fontWeight="bold">{player.name}</Text>
              </Flex>
              <IconButton
                aria-label="Expand player"
                icon={expandedId === player.id ? <ChevronUp /> : <ChevronDown />}
                size="sm"
                onClick={() =>
                  setExpandedId(expandedId === player.id ? null : player.id)
                }
              />
            </Flex>

            {/* Conteúdo expandido */}
            <Collapse in={expandedId === player.id} animateOpacity>
              <Box mt={4} pl={12}>
                <Text>Age: {player.age}</Text>
                <Text>
                  Favorite Teams:{" "}
                  {player.favoriteTeams.map((team) => (
                    <Badge key={team} mr={2} colorScheme="green">
                      {team}
                    </Badge>
                  ))}
                </Text>
                <Text>
                  League Types:{" "}
                  {player.leagueTypes.map((league) => (
                    <Badge key={league} mr={2} colorScheme="purple">
                      {league}
                    </Badge>
                  ))}
                </Text>
                <Text>
                  Titles Won:{" "}
                  {player.titlesWon.length > 0
                    ? player.titlesWon.map((title) => (
                        <Badge key={title} mr={2} colorScheme="yellow">
                          {title}
                        </Badge>
                      ))
                    : "None"}
                </Text>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default LeaguePlayersPage;
