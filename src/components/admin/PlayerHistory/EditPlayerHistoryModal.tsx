import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditPlayerHistoryModal = ({
  record,
  isOpen,
  onClose,
  onSave,
}: any) => {
  const toast = useToast();

  const [league, setLeague] = useState(record.league?._id ?? record.league ?? "");
  const [player, setPlayer] = useState(record.player?._id ?? record.player ?? "");

  // Temporada regular
  const [regularWins, setRegularWins] = useState(record.regularWins ?? 0);
  const [regularLosses, setRegularLosses] = useState(record.regularLosses ?? 0);
  const [regularTies, setRegularTies] = useState(record.regularTies ?? 0);

  // Playoffs
  const [madePlayoffs, setMadePlayoffs] = useState(
    record.madePlayoffs ?? false
  );
  const [playoffsWins, setPlayoffsWins] = useState(record.playoffsWins ?? 0);
  const [playoffsLosses, setPlayoffsLosses] = useState(
    record.playoffsLosses ?? 0
  );

  // Pontuação
  const [pointsScored, setPointsScored] = useState(record.pointsScored ?? 0);
  const [pointsConceded, setPointsConceded] = useState(
    record.pointsConceded ?? 0
  );
  const [pointDifference, setPointDifference] = useState(
    record.pointDifference ?? 0
  );

  // Resultado da temporada
  const [finalPosition, setFinalPosition] = useState(
    record.finalPosition ?? 1
  );
  const [seasonYear, setSeasonYear] = useState(
    record.seasonYear ?? new Date().getFullYear()
  );

  const [leagues, setLeagues] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaguesAndPlayers = async () => {
      try {
        const [leagueResponse, playerResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/leagues"),
          axios.get("http://localhost:5000/api/players"),
        ]);

        setLeagues(leagueResponse.data);
        setPlayers(playerResponse.data);
      } catch (error) {
        console.error("Erro ao buscar ligas ou jogadores:", error);
      }
    };

    fetchLeaguesAndPlayers();
  }, []);

  // Atualiza os valores quando outro registro for aberto
  useEffect(() => {
    setLeague(record.league?._id ?? record.league ?? "");
    setPlayer(record.player?._id ?? record.player ?? "");

    setRegularWins(record.regularWins ?? 0);
    setRegularLosses(record.regularLosses ?? 0);
    setRegularTies(record.regularTies ?? 0);

    setMadePlayoffs(record.madePlayoffs ?? false);
    setPlayoffsWins(record.playoffsWins ?? 0);
    setPlayoffsLosses(record.playoffsLosses ?? 0);

    setPointsScored(record.pointsScored ?? 0);
    setPointsConceded(record.pointsConceded ?? 0);
    setPointDifference(record.pointDifference ?? 0);

    setFinalPosition(record.finalPosition ?? 1);
    setSeasonYear(record.seasonYear ?? new Date().getFullYear());
  }, [record]);

  // Calcula o saldo automaticamente
  useEffect(() => {
    setPointDifference(pointsScored - pointsConceded);
  }, [pointsScored, pointsConceded]);

  // Se sair dos playoffs, zera os campos
  useEffect(() => {
    if (!madePlayoffs) {
      setPlayoffsWins(0);
      setPlayoffsLosses(0);
    }
  }, [madePlayoffs]);

  const handleSave = async () => {
    const updatedRecord = {
      league,
      player,

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
      const response = await axios.put(
        `http://localhost:5000/api/player-history/${record._id}`,
        updatedRecord
      );

      toast({
        title: "Histórico atualizado",
        description: "O histórico foi atualizado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSave(response.data);
      onClose();
    } catch (error: any) {
      console.error("Erro ao salvar o histórico:", error);

      toast({
        title: "Erro ao atualizar histórico",
        description:
          error?.response?.data?.message ||
          error.message ||
          "Houve um erro ao atualizar o histórico.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Editar Histórico</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl id="league">
            <FormLabel>Liga</FormLabel>

            <Select
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              placeholder="Selecione a Liga"
            >
              {leagues.map((leagueItem) => (
                <option key={leagueItem._id} value={leagueItem._id}>
                  {leagueItem.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="player" mt={4}>
            <FormLabel>Jogador</FormLabel>

            <Select
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              placeholder="Selecione o Jogador"
            >
              {players.map((playerItem) => (
                <option key={playerItem._id} value={playerItem._id}>
                  {playerItem.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="regularWins" mt={4}>
            <FormLabel>Vitórias - Fase Regular</FormLabel>

            <Input
              type="number"
              min={0}
              value={regularWins}
              onChange={(e) => setRegularWins(Number(e.target.value))}
            />
          </FormControl>

          <FormControl id="regularLosses" mt={4}>
            <FormLabel>Derrotas - Fase Regular</FormLabel>

            <Input
              type="number"
              min={0}
              value={regularLosses}
              onChange={(e) => setRegularLosses(Number(e.target.value))}
            />
          </FormControl>

          <FormControl id="regularTies" mt={4}>
            <FormLabel>Empates - Fase Regular</FormLabel>

            <Input
              type="number"
              min={0}
              value={regularTies}
              onChange={(e) => setRegularTies(Number(e.target.value))}
            />
          </FormControl>

          <FormControl id="madePlayoffs" mt={5}>
            <Checkbox
              isChecked={madePlayoffs}
              onChange={(e) => setMadePlayoffs(e.target.checked)}
            >
              Classificou para os playoffs
            </Checkbox>

            <Text mt={1} fontSize="sm" color="gray.500">
              Essa informação será utilizada no cálculo do Power Ranking.
            </Text>
          </FormControl>

          <FormControl id="playoffsWins" mt={4}>
            <FormLabel>Vitórias - Playoffs</FormLabel>

            <Input
              type="number"
              min={0}
              value={playoffsWins}
              isDisabled={!madePlayoffs}
              onChange={(e) => setPlayoffsWins(Number(e.target.value))}
            />
          </FormControl>

          <FormControl id="playoffsLosses" mt={4}>
            <FormLabel>Derrotas - Playoffs</FormLabel>

            <Input
              type="number"
              min={0}
              value={playoffsLosses}
              isDisabled={!madePlayoffs}
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
            <FormLabel>Pontos Sofridos</FormLabel>

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
              value={pointDifference}
              isReadOnly
              bg="gray.100"
            />
          </FormControl>

          <FormControl id="finalPosition" mt={4}>
            <FormLabel>Posição Final</FormLabel>

            <Input
              type="number"
              min={1}
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
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>

          <Button colorScheme="blue" onClick={handleSave}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPlayerHistoryModal;