import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button, Select, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";

const EditLeagueModal = ({ league, isOpen, onClose, onSave }: any) => {
  const [name, setName] = useState(league.name);
  const [leagueType, setLeagueType] = useState(league.leagueType);
  const [teamCount, setTeamCount] = useState(league.teamCount);
  const [platform, setPlatform] = useState(league.platform);
  const [year, setYear] = useState(league.year);
  const [champion, setChampion] = useState(league.champion);
  const [runnerUp, setRunnerUp] = useState(league.runnerUp);
  const [thirdPlace, setThirdPlace] = useState(league.thirdPlace);
  const [players, setPlayers] = useState<string[]>(league.players);
  const [availablePlayers, setAvailablePlayers] = useState<any[]>([]); // Lista de jogadores cadastrados

  useEffect(() => {
    setName(league.name);
    setLeagueType(league.leagueType);
    setTeamCount(league.teamCount);
    setPlatform(league.platform);
    setYear(league.year);
    setChampion(league.champion);
    setRunnerUp(league.runnerUp);
    setThirdPlace(league.thirdPlace);
    setPlayers(league.players);
  }, [league]);

  useEffect(() => {
    // Fetch players from the backend to populate the select options
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/players");
        setAvailablePlayers(response.data);
      } catch (error) {
        console.error("Erro ao carregar jogadores:", error);
      }
    };
    fetchPlayers();
  }, []);

  const handleSave = async () => {
    const updatedLeague = {
      ...league,
      name,
      leagueType,
      teamCount,
      platform,
      year,
      champion,
      runnerUp,
      thirdPlace,
      players, // Jogadores selecionados
    };

    try {
      await axios.put(`http://localhost:5000/api/leagues/${league._id}`, updatedLeague);
      onSave(updatedLeague);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar liga", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
    const value = e.target.value;
    if (field === "champion") setChampion(value);
    if (field === "runnerUp") setRunnerUp(value);
    if (field === "thirdPlace") setThirdPlace(value);
  };

  const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlayer = e.target.value;
    if (!players.includes(selectedPlayer) && players.length < teamCount) {
      setPlayers([...players, selectedPlayer]);
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(players.filter(player => player !== playerId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Liga</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da Liga" />
          <Input value={leagueType} onChange={(e) => setLeagueType(e.target.value)} mt={2} placeholder="Tipo da Liga" />
          <Input value={teamCount} onChange={(e) => setTeamCount(Number(e.target.value))} mt={2} placeholder="Quantidade de Times" />
          <Input value={platform} onChange={(e) => setPlatform(e.target.value)} mt={2} placeholder="Plataforma" />
          <Input value={year} onChange={(e) => setYear(Number(e.target.value))} mt={2} placeholder="Ano" />
          
          {/* Seleção do Campeão */}
          <Select value={champion} onChange={(e) => handleSelectChange(e, "champion")} mt={2} placeholder="Selecione o Campeão">
            {availablePlayers.map((player) => (
              <option key={player._id} value={player._id} disabled={player._id === runnerUp || player._id === thirdPlace}>
                {player.name}
              </option>
            ))}
          </Select>
          
          {/* Seleção do Vice-campeão */}
          <Select value={runnerUp} onChange={(e) => handleSelectChange(e, "runnerUp")} mt={2} placeholder="Selecione o Vice-campeão">
            {availablePlayers.map((player) => (
              <option key={player._id} value={player._id} disabled={player._id === champion || player._id === thirdPlace}>
                {player.name}
              </option>
            ))}
          </Select>
          
          {/* Seleção do Terceiro Lugar */}
          <Select value={thirdPlace} onChange={(e) => handleSelectChange(e, "thirdPlace")} mt={2} placeholder="Selecione o Terceiro Lugar">
            {availablePlayers.map((player) => (
              <option key={player._id} value={player._id} disabled={player._id === champion || player._id === runnerUp}>
                {player.name}
              </option>
            ))}
          </Select>
          
          {/* Seleção de Jogadores */}
          <Select value="" onChange={handlePlayerSelect} mt={2} placeholder="Selecione um Jogador">
            {availablePlayers.map((player) => (
              <option key={player._id} value={player._id} disabled={players.includes(player._id)}>
                {player.name}
              </option>
            ))}
          </Select>

          {/* Exibindo os jogadores selecionados */}
          <Wrap spacing={2} mt={4}>
            {players.map((playerId) => {
              const player = availablePlayers.find((p) => p._id === playerId);
              return (
                player && (
                  <WrapItem key={player._id}>
                    <Button size="sm" onClick={() => handleRemovePlayer(player._id)} colorScheme="teal">
                      {player.name} (Remover)
                    </Button>
                  </WrapItem>
                )
              );
            })}
          </Wrap>

        </ModalBody>
        <Button colorScheme="blue" onClick={handleSave} mt={4}>
          Salvar
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default EditLeagueModal;
