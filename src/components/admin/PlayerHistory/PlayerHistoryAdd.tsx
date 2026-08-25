import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const PlayerHistoryForm = () => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  // Fase regular
  const [regularWins, setRegularWins] = useState(0);
  const [regularLosses, setRegularLosses] = useState(0);
  const [regularTies, setRegularTies] = useState(0);

  // Playoffs
  const [madePlayoffs, setMadePlayoffs] = useState(false);
  const [playoffsWins, setPlayoffsWins] = useState(0);
  const [playoffsLosses, setPlayoffsLosses] = useState(0);

  // Pontuação
  const [pointsScored, setPointsScored] = useState(0);
  const [pointsConceded, setPointsConceded] = useState(0);
  const [pointDifference, setPointDifference] = useState(0);

  // Resultado da temporada
  const [finalPosition, setFinalPosition] = useState(1);
  const [seasonYear, setSeasonYear] = useState(
    new Date().getFullYear()
  );

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaguesResponse, playersResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/leagues"),
          axios.get("http://localhost:5000/api/players"),
        ]);

        setLeagues(leaguesResponse.data);
        setPlayers(playersResponse.data);
      } catch (error) {
        console.error("Erro ao buscar ligas e jogadores:", error);
      }
    };

    fetchData();
  }, []);

  // Calcula automaticamente o saldo de pontos
  useEffect(() => {
    setPointDifference(pointsScored - pointsConceded);
  }, [pointsScored, pointsConceded]);

  // Se desmarcar playoffs, zera os resultados de playoffs
  useEffect(() => {
    if (!madePlayoffs) {
      setPlayoffsWins(0);
      setPlayoffsLosses(0);
    }
  }, [madePlayoffs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const historyData = {
      league: selectedLeague,
      player: selectedPlayer,

      regularWins,
      regularLosses,
      regularTies,

      madePlayoffs,
      playoffsWins,
      playoffsLosses,

      pointsScored,
      pointsConceded,
      pointDifference,

      finalPosition,
      seasonYear,
    };

    try {
      console.log(
        "Dados enviados para criação do histórico:",
        historyData
      );

      const response = await axios.post(
        "http://localhost:5000/api/player-history",
        historyData
      );

      if (response.status === 201) {
        toast({
          title: "Histórico Cadastrado",
          description:
            "O histórico do jogador foi cadastrado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Erro ao salvar histórico:", error);

      toast({
        title: "Erro ao Salvar Histórico",
        description:
          error?.response?.data?.message ||
          error.message ||
          "Houve um erro ao salvar o histórico.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {/* Liga */}
        <FormControl id="league" isRequired>
          <FormLabel>Liga</FormLabel>

          <Select
            value={selectedLeague}
            onChange={(e) =>
              setSelectedLeague(e.target.value)
            }
            placeholder="Selecione a Liga"
          >
            {leagues.map((league) => (
              <option
                key={league._id}
                value={league._id}
              >
                {league.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Jogador */}
        <FormControl id="player" isRequired>
          <FormLabel>Jogador</FormLabel>

          <Select
            value={selectedPlayer}
            onChange={(e) =>
              setSelectedPlayer(e.target.value)
            }
            placeholder="Selecione o Jogador"
          >
            {players.map((player) => (
              <option
                key={player._id}
                value={player._id}
              >
                {player.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Fase Regular */}
        <FormControl id="regularWins">
          <FormLabel>Vitórias - Fase Regular</FormLabel>

          <Input
            type="number"
            min={0}
            value={regularWins}
            onChange={(e) =>
              setRegularWins(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="regularLosses">
          <FormLabel>Derrotas - Fase Regular</FormLabel>

          <Input
            type="number"
            min={0}
            value={regularLosses}
            onChange={(e) =>
              setRegularLosses(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="regularTies">
          <FormLabel>Empates - Fase Regular</FormLabel>

          <Input
            type="number"
            min={0}
            value={regularTies}
            onChange={(e) =>
              setRegularTies(Number(e.target.value))
            }
          />
        </FormControl>

        {/* Classificação para Playoffs */}
        <FormControl id="madePlayoffs">
          <Checkbox
            isChecked={madePlayoffs}
            onChange={(e) =>
              setMadePlayoffs(e.target.checked)
            }
          >
            Classificou para os playoffs
          </Checkbox>

          <Text
            mt={1}
            fontSize="sm"
            color="gray.500"
          >
            Essa informação será utilizada no cálculo do
            Power Ranking.
          </Text>
        </FormControl>

        {/* Playoffs */}
        <FormControl id="playoffsWins">
          <FormLabel>Vitórias - Playoffs</FormLabel>

          <Input
            type="number"
            min={0}
            value={playoffsWins}
            isDisabled={!madePlayoffs}
            onChange={(e) =>
              setPlayoffsWins(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="playoffsLosses">
          <FormLabel>Derrotas - Playoffs</FormLabel>

          <Input
            type="number"
            min={0}
            value={playoffsLosses}
            isDisabled={!madePlayoffs}
            onChange={(e) =>
              setPlayoffsLosses(Number(e.target.value))
            }
          />
        </FormControl>

        {/* Pontos */}
        <FormControl id="pointsScored">
          <FormLabel>Pontos Marcados</FormLabel>

          <Input
            type="number"
            value={pointsScored}
            onChange={(e) =>
              setPointsScored(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="pointsConceded">
          <FormLabel>Pontos Sofridos</FormLabel>

          <Input
            type="number"
            value={pointsConceded}
            onChange={(e) =>
              setPointsConceded(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="pointDifference">
          <FormLabel>Saldo de Pontos</FormLabel>

          <Input
            type="number"
            value={pointDifference}
            isReadOnly
            bg="gray.100"
          />
        </FormControl>

        {/* Resultado Final */}
        <FormControl id="finalPosition" isRequired>
          <FormLabel>Posição Final</FormLabel>

          <Input
            type="number"
            min={1}
            value={finalPosition}
            onChange={(e) =>
              setFinalPosition(Number(e.target.value))
            }
          />
        </FormControl>

        <FormControl id="seasonYear" isRequired>
          <FormLabel>Ano da Temporada</FormLabel>

          <Input
            type="number"
            value={seasonYear}
            onChange={(e) =>
              setSeasonYear(Number(e.target.value))
            }
          />
        </FormControl>

        <Button
          mt={4}
          colorScheme="blue"
          type="submit"
        >
          Cadastrar Histórico
        </Button>
      </Stack>
    </form>
  );
};

export default PlayerHistoryForm;