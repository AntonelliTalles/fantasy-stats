import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Select, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EditHeadToHeadModal = ({ match, isOpen, onClose, onSave }: any) => {
  const [player1, setPlayer1] = useState(match.player1);
  const [player2, setPlayer2] = useState(match.player2);
  const [player1Wins, setPlayer1Wins] = useState(match.player1Wins);
  const [player2Wins, setPlayer2Wins] = useState(match.player2Wins);
  const [player1PlayoffsWins, setPlayer1PlayoffsWins] = useState(match.player1PlayoffsWins);
  const [player2PlayoffsWins, setPlayer2PlayoffsWins] = useState(match.player2PlayoffsWins);
  const [totalMatches, setTotalMatches] = useState(match.totalMatches);
  const [league, setLeague] = useState(match.league._id);
  const [players, setPlayers] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);

  const toast = useToast();

  useEffect(() => {
    // Carregar jogadores e ligas
    const fetchPlayersAndLeagues = async () => {
      try {
        const playersResponse = await axios.get("http://localhost:5000/api/players");
        setPlayers(playersResponse.data);

        const leaguesResponse = await axios.get("http://localhost:5000/api/leagues");
        setLeagues(leaguesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar jogadores e ligas", error);
      }
    };

    fetchPlayersAndLeagues();
  }, []);

  useEffect(() => {
    setTotalMatches(player1Wins + player2Wins + player1PlayoffsWins + player2PlayoffsWins);
  }, [player1Wins, player2Wins, player1PlayoffsWins, player2PlayoffsWins]);

  const handleSave = async () => {
    const updatedMatch = {
      ...match,
      player1,
      player2,
      player1Wins,
      player2Wins,
      player1PlayoffsWins,
      player2PlayoffsWins,
      totalMatches,
      league,
      matchName: `${player1.name} X ${player2.name}`, // Nome do confronto
    };

    try {
      await axios.put(`http://localhost:5000/api/head-to-head/${match._id}`, updatedMatch);
      toast({
        title: "Confronto Atualizado!",
        description: "O confronto foi atualizado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSave(updatedMatch);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar confronto", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Confronto Direto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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

          <FormControl id="player1" mt={4}>
            <FormLabel>Jogador 1</FormLabel>
            <Select
              value={player1._id}
              onChange={(e) => {
                const selectedPlayer = players.find((p) => p._id === e.target.value);
                if (selectedPlayer) {
                  setPlayer1(selectedPlayer);
                }
              }}
            >
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="player2" mt={4}>
            <FormLabel>Jogador 2</FormLabel>
            <Select
              value={player2._id}
              onChange={(e) => {
                const selectedPlayer = players.find((p) => p._id === e.target.value);
                if (selectedPlayer) {
                  setPlayer2(selectedPlayer);
                }
              }}
            >
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="player1Wins" mt={4}>
            <FormLabel>Vitórias Jogador 1</FormLabel>
            <Input
              type="number"
              value={player1Wins}
              onChange={(e) => setPlayer1Wins(Number(e.target.value))}
              placeholder="Vitórias do Jogador 1"
            />
          </FormControl>

          <FormControl id="player2Wins" mt={4}>
            <FormLabel>Vitórias Jogador 2</FormLabel>
            <Input
              type="number"
              value={player2Wins}
              onChange={(e) => setPlayer2Wins(Number(e.target.value))}
              placeholder="Vitórias do Jogador 2"
            />
          </FormControl>

          <FormControl id="player1Wins" mt={4}>
            <FormLabel>Vitórias Jogador 1 em Playoffs</FormLabel>
            <Input
              type="number"
              value={player1PlayoffsWins}
              onChange={(e) => setPlayer1PlayoffsWins(Number(e.target.value))}
              placeholder="Vitórias do Jogador 1"
            />
          </FormControl>

          <FormControl id="player2Wins" mt={4}>
            <FormLabel>Vitórias Jogador 2 em Playoffs</FormLabel>
            <Input
              type="number"
              value={player2PlayoffsWins}
              onChange={(e) => setPlayer2PlayoffsWins(Number(e.target.value))}
              placeholder="Vitórias do Jogador 2"
            />
          </FormControl>

          <FormControl id="totalMatches" mt={4}>
            <FormLabel>Total de Partidas</FormLabel>
            <Input
              type="number"
              value={totalMatches}
              isReadOnly
              placeholder="Total de partidas"
            />
          </FormControl>
        </ModalBody>

        <Button colorScheme="blue" onClick={handleSave} mt={4}>
          Salvar
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default EditHeadToHeadModal;
