import React, { useState, useEffect } from "react";
import { Select, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import axios from "axios";

const PlayerHistoryForm = () => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [regularWins, setRegularWins] = useState(0);
  const [regularLosses, setRegularLosses] = useState(0);
  const [playoffsWins, setPlayoffsWins] = useState(0);
  const [playoffsLosses, setPlayoffsLosses] = useState(0);
  const [pointsScored, setPointsScored] = useState(0);
  const [pointsConceded, setPointsConceded] = useState(0);
  const [pointDifference, setPointDifference] = useState(0); // Saldo de pontos
  const [finalPosition, setFinalPosition] = useState(1);
  const [seasonYear, setSeasonYear] = useState(new Date().getFullYear());
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaguesResponse = await axios.get("http://localhost:5000/api/leagues");
        const playersResponse = await axios.get("http://localhost:5000/api/players");

        setLeagues(leaguesResponse.data);
        setPlayers(playersResponse.data);
      } catch (error) {
        console.error("Erro ao buscar ligas e jogadores", error);
      }
    };

    fetchData();
  }, []);

  // Atualiza o saldo de pontos automaticamente
  useEffect(() => {
    setPointDifference(pointsScored - pointsConceded);
  }, [pointsScored, pointsConceded]); // Só recalcula quando os pontos marcados ou sofridos mudam

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const historyData = {
      league: selectedLeague,
      player: selectedPlayer,
      regularWins,
      regularLosses,
      playoffsWins,
      playoffsLosses,
      pointsScored,
      pointsConceded,
      pointDifference,
      finalPosition,
      seasonYear,
    };

     try {
        // Garantindo que o axios está aguardando a resposta da API corretamente
        const response = await axios.post("http://localhost:5000/api/player-history", historyData);
        
        if (response.status === 201) {
        toast({
            title: "Histórico Cadastrado",
            description: "O histórico foi cadastrado com sucesso.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        } else {
        throw new Error("Erro ao salvar o histórico");
        }
    } catch (error: any) {
        console.error("Erro ao salvar histórico:", error);

        toast({
        title: "Erro ao Salvar Histórico",
        description: error.message || "Houve um erro ao salvar o histórico.",
        status: "error",
        duration: 3000,
        isClosable: true,
        });
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="league">
        <FormLabel>Liga</FormLabel>
        <Select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          placeholder="Selecione a Liga"
        >
          {leagues.map((league) => (
            <option key={league._id} value={league._id}>
              {league.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="player" mt={4}>
        <FormLabel>Jogador</FormLabel>
        <Select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          placeholder="Selecione o Jogador"
        >
          {players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Fase Regular */}
      <FormControl id="regularWins" mt={4}>
        <FormLabel>Vitórias Fase Regular</FormLabel>
        <Input
          type="number"
          value={regularWins}
          onChange={(e) => setRegularWins(Number(e.target.value))}
        />
      </FormControl>

      <FormControl id="regularLosses" mt={4}>
        <FormLabel>Derrotas Fase Regular</FormLabel>
        <Input
          type="number"
          value={regularLosses}
          onChange={(e) => setRegularLosses(Number(e.target.value))}
        />
      </FormControl>

      {/* Playoffs */}
      <FormControl id="playoffsWins" mt={4}>
        <FormLabel>Vitórias Playoffs</FormLabel>
        <Input
          type="number"
          value={playoffsWins}
          onChange={(e) => setPlayoffsWins(Number(e.target.value))}
        />
      </FormControl>

      <FormControl id="playoffsLosses" mt={4}>
        <FormLabel>Derrotas Playoffs</FormLabel>
        <Input
          type="number"
          value={playoffsLosses}
          onChange={(e) => setPlayoffsLosses(Number(e.target.value))}
        />
      </FormControl>

      <FormControl id="pointsScored" mt={4}>
        <FormLabel>Pontos Marcados</FormLabel>
        <Input
          type="number"
          value={pointsScored}
          onChange={(e) => setPointsScored(Number(e.target.value))}
        />
      </FormControl>

      <FormControl id="pointsConceded" mt={4}>
        <FormLabel>Pontos Concedidos</FormLabel>
        <Input
          type="number"
          value={pointsConceded}
          onChange={(e) => setPointsConceded(Number(e.target.value))}
        />
      </FormControl>

      <FormControl id="pointDifference" mt={4}>
        <FormLabel>Saldo de Pontos</FormLabel>
        <Input
          type="number"
          value={pointDifference} // O saldo de pontos é calculado automaticamente
          readOnly // Tornamos esse campo somente leitura
        />
      </FormControl>

      <FormControl id="finalPosition" mt={4}>
        <FormLabel>Posição Final</FormLabel>
        <Input
          type="number"
          value={finalPosition}
          onChange={(e) => setFinalPosition(Number(e.target.value))}
        />
      </FormControl>

      <FormControl id="seasonYear" mt={4}>
        <FormLabel>Ano da Temporada</FormLabel>
        <Input
          type="number"
          value={seasonYear}
          onChange={(e) => setSeasonYear(Number(e.target.value))}
        />
      </FormControl>

      <Button mt={4} colorScheme="blue" type="submit">
        Cadastrar Histórico
      </Button>
    </form>
  );
};

export default PlayerHistoryForm;
