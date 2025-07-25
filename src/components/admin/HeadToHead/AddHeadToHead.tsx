import React, { useState, useEffect } from "react";
import { Select, Input, Button, Stack, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "axios";

const AddHeadToHead = () => {
  const [player1, setPlayer1] = useState("");         // ID do Jogador 1
  const [player2, setPlayer2] = useState("");         // ID do Jogador 2
  const [player1Name, setPlayer1Name] = useState(""); // Nome do Jogador 1
  const [player2Name, setPlayer2Name] = useState(""); // Nome do Jogador 2
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
   const [player1PlayoffsWins, setPlayer1PlayoffsWins] = useState(0); // Novo campo para vitórias em Playoffs
  const [player2PlayoffsWins, setPlayer2PlayoffsWins] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [league, setLeague] = useState("");
  const [matchName, setMatchName] = useState("");     // Nome do Confronto (gerado automaticamente)
  const [players, setPlayers] = useState<any[]>([]);  // Lista de jogadores para selecionar
  const [leagues, setLeagues] = useState<any[]>([]);  // Lista de ligas para selecionar

  const toast = useToast();

  // Buscar jogadores cadastrados ao carregar a página
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Erro ao buscar jogadores", error);
      }
    };
    fetchPlayers();
  }, []);

  // Buscar ligas cadastradas ao carregar a página
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leagues");
        setLeagues(response.data);
      } catch (error) {
        console.error("Erro ao buscar ligas", error);
      }
    };
    fetchLeagues();
  }, []);

  // Atualizar o nome do confronto automaticamente
  useEffect(() => {
    if (player1Name && player2Name) {
      setMatchName(`${player1Name} X ${player2Name}`);
    }
  }, [player1Name, player2Name]);

  // Calcular o total de partidas automaticamente
  useEffect(() => {
    setTotalMatches(player1Wins + player2Wins + player1PlayoffsWins + player2PlayoffsWins);
  }, [player1Wins, player2Wins, player1PlayoffsWins, player2PlayoffsWins]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const headToHeadData = {
      player1,      // Passando o ID do jogador 1
      player2,      // Passando o ID do jogador 2
      player1Wins,
      player2Wins,
      player1PlayoffsWins,
      player2PlayoffsWins,
      totalMatches,
      league,
      matchName
    };

     console.log("Dados enviados para o backend:", headToHeadData);

    try {
      const response = await axios.post("http://localhost:5000/api/head-to-head", headToHeadData);
      console.log("Confronto Adicionado:", response.data);

      toast({
        title: "Confronto Adicionado!",
        description: "O confronto foi registrado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Erro ao adicionar confronto", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {/* Player 1 Select */}
        <FormControl id="player1">
          <FormLabel>Jogador 1</FormLabel>
          <Select
            value={player1}
            onChange={(e) => {
              const selectedPlayer = players.find(player => player._id === e.target.value);
              setPlayer1(e.target.value);          // Armazenando o ID do Jogador 1
              if (selectedPlayer) setPlayer1Name(selectedPlayer.name);  // Atualiza o Nome do Jogador 1
            }}
            placeholder="Selecione o Jogador 1"
          >
            {players.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Player 2 Select */}
        <FormControl id="player2">
          <FormLabel>Jogador 2</FormLabel>
          <Select
            value={player2}
            onChange={(e) => {
              const selectedPlayer = players.find(player => player._id === e.target.value);
              setPlayer2(e.target.value);         // Armazenando o ID do Jogador 2
              if (selectedPlayer) setPlayer2Name(selectedPlayer.name);  // Atualiza o Nome do Jogador 2
            }}
            placeholder="Selecione o Jogador 2"
          >
            {players.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Player 1 Wins */}
        <FormControl id="player1Wins">
          <FormLabel>Vitórias do Jogador 1</FormLabel>
          <Input
            type="number"
            value={player1Wins}
            onChange={(e) => setPlayer1Wins(Number(e.target.value))}
            placeholder="Vitórias do Jogador 1"
          />
        </FormControl>

        {/* Player 2 Wins */}
        <FormControl id="player2Wins">
          <FormLabel>Vitórias do Jogador 2</FormLabel>
          <Input
            type="number"
            value={player2Wins}
            onChange={(e) => setPlayer2Wins(Number(e.target.value))}
            placeholder="Vitórias do Jogador 2"
          />
        </FormControl>

        <FormControl id="player1PlayoffsWins" mt={4}>
          <FormLabel>Vitórias em Playoffs Jogador 1</FormLabel>
          <Input
            type="number"
            value={player1PlayoffsWins}
            onChange={(e) => setPlayer1PlayoffsWins(Number(e.target.value))}
            placeholder="Vitórias em Playoffs do Jogador 1"
          />
        </FormControl>

        <FormControl id="player2PlayoffsWins" mt={4}>
          <FormLabel>Vitórias em Playoffs Jogador 2</FormLabel>
          <Input
            type="number"
            value={player2PlayoffsWins}
            onChange={(e) => setPlayer2PlayoffsWins(Number(e.target.value))}
            placeholder="Vitórias em Playoffs do Jogador 2"
          />
        </FormControl>

        {/* Total Matches (calculated automatically) */}
        <FormControl id="totalMatches">
          <FormLabel>Total de Partidas</FormLabel>
          <Input
            type="number"
            value={totalMatches}
            isReadOnly
            placeholder="Total de partidas"
          />
        </FormControl>

        {/* League Select */}
        <FormControl id="league">
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

        <Button mt={4} type="submit">
          Adicionar Confronto
        </Button>
      </Stack>
    </form>
  );
};

export default AddHeadToHead;
