import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";

import api from "../../../services/api";

const EditHeadToHeadModal = ({
  match,
  isOpen,
  onClose,
  onSave,
}: any) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);

  const [player1PlayoffsWins, setPlayer1PlayoffsWins] =
    useState(0);

  const [player2PlayoffsWins, setPlayer2PlayoffsWins] =
    useState(0);

  const [totalMatches, setTotalMatches] = useState(0);
  const [league, setLeague] = useState("");

  const [players, setPlayers] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);

  const [isSaving, setIsSaving] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (!match) return;

    setPlayer1(
      typeof match.player1 === "string"
        ? match.player1
        : match.player1?._id || ""
    );

    setPlayer2(
      typeof match.player2 === "string"
        ? match.player2
        : match.player2?._id || ""
    );

    setPlayer1Wins(match.player1Wins || 0);
    setPlayer2Wins(match.player2Wins || 0);

    setPlayer1PlayoffsWins(
      match.player1PlayoffsWins || 0
    );

    setPlayer2PlayoffsWins(
      match.player2PlayoffsWins || 0
    );

    setLeague(
      typeof match.league === "string"
        ? match.league
        : match.league?._id || ""
    );
  }, [match]);

  useEffect(() => {
    const fetchPlayersAndLeagues = async () => {
      try {
        const [playersResponse, leaguesResponse] =
          await Promise.all([
            api.get("/players"),
            api.get("/leagues"),
          ]);

        setPlayers(playersResponse.data);
        setLeagues(leaguesResponse.data);
      } catch (error) {
        console.error(
          "Erro ao buscar jogadores e ligas",
          error
        );

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

    fetchPlayersAndLeagues();
  }, [toast]);

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

  const handleSave = async () => {
    if (!match) return;

    const player1Data = players.find(
      (player) => player._id === player1
    );

    const player2Data = players.find(
      (player) => player._id === player2
    );

    const matchName =
      player1Data && player2Data
        ? `${player1Data.name} X ${player2Data.name}`
        : match.matchName;

    const updatedMatch = {
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
      setIsSaving(true);

      const response = await api.put(
        `/head-to-head/${match._id}`,
        updatedMatch
      );

      toast({
        title: "Confronto atualizado!",
        description:
          "O confronto foi atualizado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar confronto", error);

      toast({
        title: "Erro ao atualizar confronto",
        description:
          "Não foi possível salvar as alterações.",
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
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Editar Confronto Direto</ModalHeader>

        <ModalCloseButton isDisabled={isSaving} />

        <ModalBody>
          <Stack spacing={4}>
            <FormControl id="league" isRequired>
              <FormLabel>Liga</FormLabel>

              <Select
                value={league}
                onChange={(e) => setLeague(e.target.value)}
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

            <FormControl id="player1" isRequired>
              <FormLabel>Jogador 1</FormLabel>

              <Select
                value={player1}
                onChange={(e) =>
                  setPlayer1(e.target.value)
                }
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
                onChange={(e) =>
                  setPlayer2(e.target.value)
                }
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

            <FormControl id="player1Wins">
              <FormLabel>Vitórias Jogador 1</FormLabel>

              <Input
                type="number"
                min={0}
                value={player1Wins}
                onChange={(e) =>
                  setPlayer1Wins(Number(e.target.value))
                }
              />
            </FormControl>

            <FormControl id="player2Wins">
              <FormLabel>Vitórias Jogador 2</FormLabel>

              <Input
                type="number"
                min={0}
                value={player2Wins}
                onChange={(e) =>
                  setPlayer2Wins(Number(e.target.value))
                }
              />
            </FormControl>

            <FormControl id="player1PlayoffsWins">
              <FormLabel>
                Vitórias Jogador 1 em Playoffs
              </FormLabel>

              <Input
                type="number"
                min={0}
                value={player1PlayoffsWins}
                onChange={(e) =>
                  setPlayer1PlayoffsWins(
                    Number(e.target.value)
                  )
                }
              />
            </FormControl>

            <FormControl id="player2PlayoffsWins">
              <FormLabel>
                Vitórias Jogador 2 em Playoffs
              </FormLabel>

              <Input
                type="number"
                min={0}
                value={player2PlayoffsWins}
                onChange={(e) =>
                  setPlayer2PlayoffsWins(
                    Number(e.target.value)
                  )
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

export default EditHeadToHeadModal;