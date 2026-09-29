import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import api from "../../../services/api";

const AddLeague = () => {
  const [name, setName] = useState("");
  const [leagueType, setLeagueType] = useState("");
  const [teamCount, setTeamCount] = useState(0);
  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState(2023);
  const [champion, setChampion] = useState("");
  const [runnerUp, setRunnerUp] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const leagueData = {
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
      setIsSubmitting(true);

      const response = await api.post("/leagues", leagueData);

      console.log("Liga cadastrada:", response.data);

      toast({
        title: "Liga cadastrada!",
        description: "A liga foi cadastrada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setName("");
      setLeagueType("");
      setTeamCount(0);
      setPlatform("");
      setYear(2023);
      setChampion("");
      setRunnerUp("");
      setThirdPlace("");
      setPlayers([]);
    } catch (error) {
      console.error("Erro ao cadastrar liga:", error);

      toast({
        title: "Erro ao cadastrar liga",
        description: "Não foi possível cadastrar a liga.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
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

  const isSubmitDisabled =
    players.length !== teamCount || isSubmitting;

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Nome da Liga</FormLabel>

          <Input
            placeholder="Nome da Liga"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="leagueType" isRequired>
          <FormLabel>Tipo da Liga</FormLabel>

          <Input
            placeholder="Tipo da Liga"
            value={leagueType}
            onChange={(e) => setLeagueType(e.target.value)}
          />
        </FormControl>

        <FormControl id="teamCount" isRequired>
          <FormLabel>Quantidade de Times</FormLabel>

          <Input
            placeholder="Quantidade de Times"
            type="number"
            value={teamCount}
            onChange={(e) => setTeamCount(Number(e.target.value))}
          />
        </FormControl>

        <FormControl id="platform" isRequired>
          <FormLabel>Plataforma</FormLabel>

          <Input
            placeholder="Plataforma"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </FormControl>

        <FormControl id="year" isRequired>
          <FormLabel>Ano</FormLabel>

          <Input
            placeholder="Ano"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </FormControl>

        <FormControl id="champion" isRequired>
          <FormLabel>Campeão</FormLabel>

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
        </FormControl>

        <FormControl id="runnerUp" isRequired>
          <FormLabel>Vice-campeão</FormLabel>

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
        </FormControl>

        <FormControl id="thirdPlace" isRequired>
          <FormLabel>Terceiro Lugar</FormLabel>

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
        </FormControl>

        <FormControl id="players" isRequired>
          <FormLabel>Selecione os Jogadores</FormLabel>

          <Select
            value=""
            placeholder="Selecione um Jogador"
            onChange={handlePlayerSelect}
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
        </FormControl>

        <FormControl id="selectedPlayers">
          <FormLabel>Jogadores Selecionados</FormLabel>

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
        </FormControl>

        <Button
          mt={4}
          type="submit"
          colorScheme="blue"
          isDisabled={isSubmitDisabled}
          isLoading={isSubmitting}
          loadingText="Cadastrando"
        >
          Cadastrar Liga
        </Button>
      </Stack>
    </form>
  );
};

export default AddLeague;