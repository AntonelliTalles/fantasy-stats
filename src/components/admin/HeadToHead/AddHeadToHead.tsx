import React, { useEffect, useState } from "react";
import {
  Select,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import api from "../../../services/api";

const AddHeadToHead = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [player1PlayoffsWins, setPlayer1PlayoffsWins] = useState(0);
  const [player2PlayoffsWins, setPlayer2PlayoffsWins] = useState(0);

  const [totalMatches, setTotalMatches] = useState(0);
  const [league, setLeague] = useState("");
  const [matchName, setMatchName] = useState("");

  const [players, setPlayers] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersResponse, leaguesResponse] = await Promise.all([
          api.get("/players"),
          api.get("/leagues"),
        ]);

        setPlayers(playersResponse.data);
        setLeagues(leaguesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar jogadores e ligas", error);

        toast({
          title: "Erro ao carregar dados",
          description:
            "Não foi possível carregar os jogadores e as ligas.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    if (player1Name && player2Name) {
      setMatchName(`${player1Name} X ${player2Name}`);
    } else {
      setMatchName("");
    }
  }, [player1Name, player2Name]);

  useEffect(() => {
    setTotalMatches(
      player1Wins +
        player2Wins +
        player1PlayoffsWins +
        player2PlayoffsWins
    );
  }, [
    player1Wins,
    player2Wins,
    player1PlayoffsWins,
    player2PlayoffsWins,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const headToHeadData = {
      player1,
      player2,
      player1Wins,
      player2Wins,
      player1PlayoffsWins,
      player2PlayoffsWins,
      totalMatches,
      league,
      matchName,
    };

    try {
      setIsSubmitting(true);

      const response = await api.post(
        "/head-to-head",
        headToHeadData
      );

      console.log("Confronto adicionado:", response.data);

      toast({
        title: "Confronto adicionado!",
        description: "O confronto foi registrado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setPlayer1("");
      setPlayer2("");
      setPlayer1Name("");
      setPlayer2Name("");
      setPlayer1Wins(0);
      setPlayer2Wins(0);
      setPlayer1PlayoffsWins(0);
      setPlayer2PlayoffsWins(0);
      setLeague("");
      setMatchName("");
    } catch (error) {
      console.error("Erro ao adicionar confronto", error);

      toast({
        title: "Erro ao adicionar confronto",
        description: "Não foi possível registrar o confronto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl id="player1" isRequired>
          <FormLabel>Jogador 1</FormLabel>

          <Select
            value={player1}
            onChange={(e) => {
              const selectedPlayer = players.find(
                (player) => player._id === e.target.value
              );

              setPlayer1(e.target.value);
              setPlayer1Name(selectedPlayer?.name || "");
            }}
            placeholder="Selecione o Jogador 1"
          >
            {players.map((player) => (
              <option
                key={player._id}
                value={player._id}
                disabled={player._id === player2}
              >
                {player.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="player2" isRequired>
          <FormLabel>Jogador 2</FormLabel>

          <Select
            value={player2}
            onChange={(e) => {
              const selectedPlayer = players.find(
                (player) => player._id === e.target.value
              );

              setPlayer2(e.target.value);
              setPlayer2Name(selectedPlayer?.name || "");
            }}
            placeholder="Selecione o Jogador 2"
          >
            {players.map((player) => (
              <option
                key={player._id}
                value={player._id}
                disabled={player._id === player1}
              >
                {player.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="player1Wins" isRequired>
          <FormLabel>Vitórias do Jogador 1</FormLabel>

          <Input
            type="number"
            min={0}
            value={player1Wins}
            onChange={(e) =>
              setPlayer1Wins(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="player2Wins" isRequired>
          <FormLabel>Vitórias do Jogador 2</FormLabel>

          <Input
            type="number"
            min={0}
            value={player2Wins}
            onChange={(e) =>
              setPlayer2Wins(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="player1PlayoffsWins" isRequired>
          <FormLabel>
            Vitórias em Playoffs Jogador 1
          </FormLabel>

          <Input
            type="number"
            min={0}
            value={player1PlayoffsWins}
            onChange={(e) =>
              setPlayer1PlayoffsWins(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="player2PlayoffsWins" isRequired>
          <FormLabel>
            Vitórias em Playoffs Jogador 2
          </FormLabel>

          <Input
            type="number"
            min={0}
            value={player2PlayoffsWins}
            onChange={(e) =>
              setPlayer2PlayoffsWins(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="totalMatches">
          <FormLabel>Total de Partidas</FormLabel>

          <Input
            type="number"
            value={totalMatches}
            isReadOnly
          />
        </FormControl>

        <FormControl id="league" isRequired>
          <FormLabel>Liga</FormLabel>

          <Select
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            placeholder="Selecione a Liga"
          >
            {leagues.map((league) => (
              <option key={league._id} value={league._id}>
                {league.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          mt={4}
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          loadingText="Adicionando"
        >
          Adicionar Confronto
        </Button>
      </Stack>
    </form>
  );
};

export default AddHeadToHead;