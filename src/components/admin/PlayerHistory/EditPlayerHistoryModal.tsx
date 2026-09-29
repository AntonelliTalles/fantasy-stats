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

import api from "../../../services/api";

const EditPlayerHistoryModal = ({
  record,
  isOpen,
  onClose,
  onSave,
}: any) => {
  const toast = useToast();

  const [league, setLeague] = useState(
    record.league?._id ?? record.league ?? ""
  );

  const [player, setPlayer] = useState(
    record.player?._id ?? record.player ?? ""
  );

  const [regularWins, setRegularWins] = useState(
    record.regularWins ?? 0
  );

  const [regularLosses, setRegularLosses] = useState(
    record.regularLosses ?? 0
  );

  const [regularTies, setRegularTies] = useState(
    record.regularTies ?? 0
  );

  const [madePlayoffs, setMadePlayoffs] = useState(
    record.madePlayoffs ?? false
  );

  const [playoffsWins, setPlayoffsWins] = useState(
    record.playoffsWins ?? 0
  );

  const [playoffsLosses, setPlayoffsLosses] = useState(
    record.playoffsLosses ?? 0
  );

  const [pointsScored, setPointsScored] = useState(
    record.pointsScored ?? 0
  );

  const [pointsConceded, setPointsConceded] = useState(
    record.pointsConceded ?? 0
  );

  const [pointDifference, setPointDifference] = useState(
    record.pointDifference ?? 0
  );

  const [finalPosition, setFinalPosition] = useState(
    record.finalPosition ?? 1
  );

  const [seasonYear, setSeasonYear] = useState(
    record.seasonYear ?? new Date().getFullYear()
  );

  const [leagues, setLeagues] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchLeaguesAndPlayers = async () => {
      try {
        const [leagueResponse, playerResponse] =
          await Promise.all([
            api.get("/leagues"),
            api.get("/players"),
          ]);

        setLeagues(leagueResponse.data);
        setPlayers(playerResponse.data);
      } catch (error) {
        console.error(
          "Erro ao buscar ligas ou jogadores:",
          error
        );

        toast({
          title: "Erro ao carregar dados",
          description:
            "Não foi possível carregar as ligas e os jogadores.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchLeaguesAndPlayers();
  }, [toast]);

  useEffect(() => {
    setLeague(
      record.league?._id ?? record.league ?? ""
    );

    setPlayer(
      record.player?._id ?? record.player ?? ""
    );

    setRegularWins(record.regularWins ?? 0);
    setRegularLosses(record.regularLosses ?? 0);
    setRegularTies(record.regularTies ?? 0);

    setMadePlayoffs(record.madePlayoffs ?? false);

    setPlayoffsWins(record.playoffsWins ?? 0);
    setPlayoffsLosses(record.playoffsLosses ?? 0);

    setPointsScored(record.pointsScored ?? 0);
    setPointsConceded(record.pointsConceded ?? 0);

    setFinalPosition(record.finalPosition ?? 1);

    setSeasonYear(
      record.seasonYear ?? new Date().getFullYear()
    );
  }, [record]);

  useEffect(() => {
    setPointDifference(
      pointsScored - pointsConceded
    );
  }, [pointsScored, pointsConceded]);

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
      setIsSaving(true);

      const response = await api.put(
        `/player-history/${record._id}`,
        updatedRecord
      );

      toast({
        title: "Histórico atualizado",
        description:
          "O histórico foi atualizado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSave(response.data);
      onClose();
    } catch (error: any) {
      console.error(
        "Erro ao salvar o histórico:",
        error
      );

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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSaving ? () => {} : onClose}
      size="lg"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Editar Histórico</ModalHeader>

        <ModalCloseButton isDisabled={isSaving} />

        <ModalBody>
          <FormControl id="league" isRequired>
            <FormLabel>Liga</FormLabel>

            <Select
              value={league}
              onChange={(e) =>
                setLeague(e.target.value)
              }
              placeholder="Selecione a Liga"
            >
              {leagues.map((leagueItem) => (
                <option
                  key={leagueItem._id}
                  value={leagueItem._id}
                >
                  {leagueItem.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="player" mt={4} isRequired>
            <FormLabel>Jogador</FormLabel>

            <Select
              value={player}
              onChange={(e) =>
                setPlayer(e.target.value)
              }
              placeholder="Selecione o Jogador"
            >
              {players.map((playerItem) => (
                <option
                  key={playerItem._id}
                  value={playerItem._id}
                >
                  {playerItem.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="regularWins" mt={4}>
            <FormLabel>
              Vitórias - Fase Regular
            </FormLabel>

            <Input
              type="number"
              min={0}
              value={regularWins}
              onChange={(e) =>
                setRegularWins(Number(e.target.value))
              }
            />
          </FormControl>

          <FormControl id="regularLosses" mt={4}>
            <FormLabel>
              Derrotas - Fase Regular
            </FormLabel>

            <Input
              type="number"
              min={0}
              value={regularLosses}
              onChange={(e) =>
                setRegularLosses(Number(e.target.value))
              }
            />
          </FormControl>

          <FormControl id="regularTies" mt={4}>
            <FormLabel>
              Empates - Fase Regular
            </FormLabel>

            <Input
              type="number"
              min={0}
              value={regularTies}
              onChange={(e) =>
                setRegularTies(Number(e.target.value))
              }
            />
          </FormControl>

          <FormControl id="madePlayoffs" mt={5}>
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

          <FormControl id="playoffsWins" mt={4}>
            <FormLabel>
              Vitórias - Playoffs
            </FormLabel>

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

          <FormControl id="playoffsLosses" mt={4}>
            <FormLabel>
              Derrotas - Playoffs
            </FormLabel>

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

          <FormControl id="pointsScored" mt={4}>
            <FormLabel>Pontos Marcados</FormLabel>

            <Input
              type="number"
              value={pointsScored}
              onChange={(e) =>
                setPointsScored(Number(e.target.value))
              }
            />
          </FormControl>

          <FormControl id="pointsConceded" mt={4}>
            <FormLabel>Pontos Sofridos</FormLabel>

            <Input
              type="number"
              value={pointsConceded}
              onChange={(e) =>
                setPointsConceded(Number(e.target.value))
              }
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

          <FormControl id="finalPosition" mt={4} isRequired>
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

          <FormControl id="seasonYear" mt={4} isRequired>
            <FormLabel>Ano da Temporada</FormLabel>

            <Input
              type="number"
              value={seasonYear}
              onChange={(e) =>
                setSeasonYear(Number(e.target.value))
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={onClose}
            isDisabled={isSaving}
          >
            Cancelar
          </Button>

          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={isSaving}
            loadingText="Salvando"
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPlayerHistoryModal;