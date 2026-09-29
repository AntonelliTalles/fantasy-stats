import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Select,
  Wrap,
  WrapItem,
  Stack,
  useToast,
} from "@chakra-ui/react";

import api from "../../../services/api";

const EditLeagueModal = ({
  league,
  isOpen,
  onClose,
  onSave,
}: any) => {
  const [name, setName] = useState("");
  const [leagueType, setLeagueType] = useState("");
  const [teamCount, setTeamCount] = useState(0);
  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState(0);
  const [champion, setChampion] = useState("");
  const [runnerUp, setRunnerUp] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (!league) return;

    setName(league.name || "");
    setLeagueType(league.leagueType || "");
    setTeamCount(league.teamCount || 0);
    setPlatform(league.platform || "");
    setYear(league.year || 0);
    setChampion(league.champion || "");
    setRunnerUp(league.runnerUp || "");
    setThirdPlace(league.thirdPlace || "");
    setPlayers(league.players || []);
  }, [league]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.get("/players");

        setAvailablePlayers(response.data);
      } catch (error) {
        console.error("Erro ao carregar jogadores:", error);

        toast({
          title: "Erro ao carregar jogadores",
          description:
            "Não foi possível carregar os jogadores disponíveis.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchPlayers();
  }, [toast]);

  const handleSave = async () => {
    if (!league) return;

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
      players,
    };

    try {
      setIsSaving(true);

      const response = await api.put(
        `/leagues/${league._id}`,
        updatedLeague
      );

      onSave(response.data);

      toast({
        title: "Liga atualizada",
        description: `${name} foi atualizada com sucesso.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao salvar liga:", error);

      toast({
        title: "Erro ao atualizar liga",
        description: "Não foi possível salvar as alterações.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    const value = e.target.value;

    if (field === "champion") setChampion(value);
    if (field === "runnerUp") setRunnerUp(value);
    if (field === "thirdPlace") setThirdPlace(value);
  };

  const handlePlayerSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPlayer = e.target.value;

    if (
      selectedPlayer &&
      !players.includes(selectedPlayer) &&
      players.length < teamCount
    ) {
      setPlayers((currentPlayers) => [
        ...currentPlayers,
        selectedPlayer,
      ]);
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers((currentPlayers) =>
      currentPlayers.filter((player) => player !== playerId)
    );
  };

  const isSaveDisabled =
    players.length !== teamCount || isSaving;

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSaving ? () => {} : onClose}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Editar Liga</ModalHeader>

        <ModalCloseButton isDisabled={isSaving} />

        <ModalBody>
          <Stack spacing={3}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da Liga"
            />

            <Input
              value={leagueType}
              onChange={(e) => setLeagueType(e.target.value)}
              placeholder="Tipo da Liga"
            />

            <Input
              type="number"
              value={teamCount}
              onChange={(e) =>
                setTeamCount(Number(e.target.value))
              }
              placeholder="Quantidade de Times"
            />

            <Input
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="Plataforma"
            />

            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              placeholder="Ano"
            />

            <Select
              value={champion}
              onChange={(e) =>
                handleSelectChange(e, "champion")
              }
              placeholder="Selecione o Campeão"
            >
              {availablePlayers.map((player) => (
                <option
                  key={player._id}
                  value={player._id}
                  disabled={
                    player._id === runnerUp ||
                    player._id === thirdPlace
                  }
                >
                  {player.name}
                </option>
              ))}
            </Select>

            <Select
              value={runnerUp}
              onChange={(e) =>
                handleSelectChange(e, "runnerUp")
              }
              placeholder="Selecione o Vice-campeão"
            >
              {availablePlayers.map((player) => (
                <option
                  key={player._id}
                  value={player._id}
                  disabled={
                    player._id === champion ||
                    player._id === thirdPlace
                  }
                >
                  {player.name}
                </option>
              ))}
            </Select>

            <Select
              value={thirdPlace}
              onChange={(e) =>
                handleSelectChange(e, "thirdPlace")
              }
              placeholder="Selecione o Terceiro Lugar"
            >
              {availablePlayers.map((player) => (
                <option
                  key={player._id}
                  value={player._id}
                  disabled={
                    player._id === champion ||
                    player._id === runnerUp
                  }
                >
                  {player.name}
                </option>
              ))}
            </Select>

            <Select
              value=""
              onChange={handlePlayerSelect}
              placeholder="Selecione um Jogador"
              isDisabled={players.length >= teamCount}
            >
              {availablePlayers.map((player) => (
                <option
                  key={player._id}
                  value={player._id}
                  disabled={players.includes(player._id)}
                >
                  {player.name}
                </option>
              ))}
            </Select>

            <Wrap spacing={2}>
              {players.map((playerId) => {
                const player = availablePlayers.find(
                  (p) => p._id === playerId
                );

                return (
                  player && (
                    <WrapItem key={player._id}>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          handleRemovePlayer(player._id)
                        }
                        colorScheme="teal"
                      >
                        {player.name} (Remover)
                      </Button>
                    </WrapItem>
                  )
                );
              })}
            </Wrap>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
            isDisabled={isSaving}
          >
            Cancelar
          </Button>

          <Button
            colorScheme="blue"
            onClick={handleSave}
            isDisabled={isSaveDisabled}
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

export default EditLeagueModal;