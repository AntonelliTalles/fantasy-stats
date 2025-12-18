import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import axios from "axios";

const EditPlayerHistoryModal = ({ record, isOpen, onClose, onSave }: any) => {
  const [regularWins, setRegularWins] = useState(record.regularWins);
  const [regularLosses, setRegularLosses] = useState(record.regularLosses);
  const [playoffsWins, setPlayoffsWins] = useState(record.playoffsWins);
  const [playoffsLosses, setPlayoffsLosses] = useState(record.playoffsLosses);
  const [pointsScored, setPointsScored] = useState(record.pointsScored);
  const [pointsConceded, setPointsConceded] = useState(record.pointsConceded);
  const [pointDifference, setPointDifference] = useState(record.pointDifference);
  const [finalPosition, setFinalPosition] = useState(record.finalPosition);
  const [seasonYear, setSeasonYear] = useState(record.seasonYear);  // Adicionando o ano da temporada
  
  const [league, setLeague] = useState(record.league._id);
  const [player, setPlayer] = useState(record.player._id);

  const [leagues, setLeagues] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    setPointDifference(pointsScored - pointsConceded);
  }, [pointsScored, pointsConceded]);

  useEffect(() => {
    const fetchLeaguesAndPlayers = async () => {
      try {
        const leagueResponse = await axios.get("http://localhost:5000/api/leagues");
        const playerResponse = await axios.get("http://localhost:5000/api/players");

        setLeagues(leagueResponse.data);
        setPlayers(playerResponse.data);
      } catch (error) {
        console.error("Erro ao buscar ligas ou jogadores:", error);
      }
    };
    fetchLeaguesAndPlayers();
  }, []);

  const handleSave = async () => {
    const updatedRecord = {
      ...record,
      regularWins,
      regularLosses,
      playoffsWins,
      playoffsLosses,
      pointsScored,
      pointsConceded,
      pointDifference,
      finalPosition,
      league,
      player,
      seasonYear,  // Adicionando o ano da temporada
    };

    try {
      await axios.put(`http://localhost:5000/api/player-history/${record._id}`, updatedRecord);
      onSave(updatedRecord);
      onClose();  
    } catch (error) {
      console.error("Erro ao salvar o histórico", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Histórico</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="league">
            <FormLabel>Liga</FormLabel>
            <Select value={league} onChange={(e) => setLeague(e.target.value)}>
              <option value="">Selecione a Liga</option>
              {leagues.map((league) => (
                <option key={league._id} value={league._id}>
                  {league.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="player" mt={4}>
            <FormLabel>Jogador</FormLabel>
            <Select value={player} onChange={(e) => setPlayer(e.target.value)}>
              <option value="">Selecione o Jogador</option>
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="regularWins" mt={4}>
            <FormLabel>Vitórias Fase Regular</FormLabel>
            <Input value={regularWins} onChange={(e) => setRegularWins(Number(e.target.value))} />
          </FormControl>

          <FormControl id="regularLosses" mt={4}>
            <FormLabel>Derrotas Fase Regular</FormLabel>
            <Input value={regularLosses} onChange={(e) => setRegularLosses(Number(e.target.value))} />
          </FormControl>

          <FormControl id="playoffsWins" mt={4}>
            <FormLabel>Vitórias Playoffs</FormLabel>
            <Input value={playoffsWins} onChange={(e) => setPlayoffsWins(Number(e.target.value))} />
          </FormControl>

          <FormControl id="playoffsLosses" mt={4}>
            <FormLabel>Derrotas Playoffs</FormLabel>
            <Input value={playoffsLosses} onChange={(e) => setPlayoffsLosses(Number(e.target.value))} />
          </FormControl>

          <FormControl id="pointsScored" mt={4}>
            <FormLabel>Pontos Marcados</FormLabel>
            <Input value={pointsScored} onChange={(e) => setPointsScored(Number(e.target.value))} />
          </FormControl>

          <FormControl id="pointsConceded" mt={4}>
            <FormLabel>Pontos Sofridos</FormLabel>
            <Input value={pointsConceded} onChange={(e) => setPointsConceded(Number(e.target.value))} />
          </FormControl>

          <FormControl id="pointDifference" mt={4}>
            <FormLabel>Saldo de Pontos</FormLabel>
            <Input value={pointDifference} readOnly />
          </FormControl>

          <FormControl id="finalPosition" mt={4}>
            <FormLabel>Posição Final</FormLabel>
            <Input value={finalPosition} onChange={(e) => setFinalPosition(Number(e.target.value))} />
          </FormControl>

          {/* Campo de Ano da Temporada */}
          <FormControl id="seasonYear" mt={4}>
            <FormLabel>Ano da Temporada</FormLabel>
            <Input 
              type="number" 
              value={seasonYear} 
              onChange={(e) => setSeasonYear(Number(e.target.value))} 
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

export default EditPlayerHistoryModal;
