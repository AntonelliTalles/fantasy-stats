import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import api from "../../services/api";

interface Player {
  _id: string;
  name: string;
  favoriteTeams?: string[];
  leagueTypes?: string[];
  titlesWon?: string[];
}

const LeaguePlayersPage: React.FC = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.get("/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [players, searchTerm]);

  const handleToggleExpand = (playerId: string) => {
    setExpandedId((currentId) => (currentId === playerId ? null : playerId));
  };

  const handleNavigateToProfile = (playerId: string) => {
    navigate(`/profile/${playerId}`);
  };

  if (isLoading) {
    return (
      <Flex minH="80vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  return (
    <Box px={{ base: 5, md: 10 }} py={10} bg="gray.50" minH="100vh">
      <VStack align="stretch" spacing={6}>
        <Box>
          <Badge colorScheme="green" mb={3} px={3} py={1} borderRadius="full">
            Players
          </Badge>

          <Heading size="xl">Jogadores da Liga</Heading>

          <Text color="gray.600" mt={2}>
            Explore os participantes cadastrados, seus times favoritos,
            modalidades e títulos conquistados.
          </Text>
        </Box>

        <Flex
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <InputGroup maxW={{ base: "100%", md: "420px" }}>
            <InputLeftElement pointerEvents="none">
              <Search size={18} color="gray" />
            </InputLeftElement>

            <Input
              placeholder="Buscar jogador por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
            />
          </InputGroup>

          <Badge
            alignSelf={{ base: "flex-start", md: "center" }}
            colorScheme="blue"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="full"
          >
            {filteredPlayers.length} jogador(es) encontrado(s)
          </Badge>
        </Flex>

        <VStack spacing={4} align="stretch">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => {
              const isExpanded = expandedId === player._id;

              return (
                <Box
                  key={player._id}
                  bg="white"
                  p={5}
                  borderRadius="2xl"
                  shadow="md"
                  transition="all 0.25s ease"
                  _hover={{
                    transform: "translateY(-3px)",
                    shadow: "xl",
                  }}
                >
                  <Flex align="center" justify="space-between" gap={4}>
                    <HStack spacing={4}>
                      <Avatar
                        name={player.name}
                        bg="green.500"
                        color="white"
                        size="md"
                      />

                      <Box>
                        <Text fontWeight="bold" fontSize="lg">
                          {player.name}
                        </Text>

                        <Text fontSize="sm" color="gray.500">
                          {player.leagueTypes?.length ?? 0} modalidade(s) •{" "}
                          {player.titlesWon?.length ?? 0} título(s)
                        </Text>
                      </Box>
                    </HStack>

                    <IconButton
                      aria-label="Expandir jogador"
                      icon={isExpanded ? <ChevronUp /> : <ChevronDown />}
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleExpand(player._id)}
                    />
                  </Flex>

                  <Collapse in={isExpanded} animateOpacity>
                    <Box mt={5} pl={{ base: 0, md: 14 }}>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="bold" mb={2}>
                            Times que torce
                          </Text>

                          {(player.favoriteTeams ?? []).length > 0 ? (
                            <HStack spacing={2} flexWrap="wrap">
                              {player.favoriteTeams?.map((team) => (
                                <Badge key={team} colorScheme="green" mb={2}>
                                  {team}
                                </Badge>
                              ))}
                            </HStack>
                          ) : (
                            <Text color="gray.500" fontSize="sm">
                              Nenhum time cadastrado.
                            </Text>
                          )}
                        </Box>

                        <Box>
                          <Text fontWeight="bold" mb={2}>
                            Modalidades de Fantasy
                          </Text>

                          {(player.leagueTypes ?? []).length > 0 ? (
                            <HStack spacing={2} flexWrap="wrap">
                              {player.leagueTypes?.map((league) => (
                                <Badge key={league} colorScheme="purple" mb={2}>
                                  {league}
                                </Badge>
                              ))}
                            </HStack>
                          ) : (
                            <Text color="gray.500" fontSize="sm">
                              Nenhuma modalidade cadastrada.
                            </Text>
                          )}
                        </Box>

                        <Box>
                          <Text fontWeight="bold" mb={2}>
                            Títulos conquistados
                          </Text>

                          {(player.titlesWon ?? []).length > 0 ? (
                            <HStack spacing={2} flexWrap="wrap">
                              {player.titlesWon?.map((title) => (
                                <Badge key={title} colorScheme="yellow" mb={2}>
                                  🏆 {title}
                                </Badge>
                              ))}
                            </HStack>
                          ) : (
                            <Text color="gray.500" fontSize="sm">
                              Nenhum título registrado.
                            </Text>
                          )}
                        </Box>

                        <Button
                          alignSelf="flex-start"
                          colorScheme="green"
                          size="sm"
                          onClick={() => handleNavigateToProfile(player._id)}
                        >
                          Ver perfil completo
                        </Button>
                      </VStack>
                    </Box>
                  </Collapse>
                </Box>
              );
            })
          ) : (
            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              textAlign="center"
              color="gray.500"
            >
              Nenhum jogador encontrado.
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default LeaguePlayersPage;