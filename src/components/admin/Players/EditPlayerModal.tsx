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
  VStack,
  useToast,
} from "@chakra-ui/react";

import api from "../../../services/api";

const EditPlayerModal = ({
  player,
  isOpen,
  onClose,
  onSave,
}: any) => {
  const [name, setName] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState("");
  const [leagueTypes, setLeagueTypes] = useState("");
  const [titlesWon, setTitlesWon] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (!player) return;

    setName(player.name || "");
    setFavoriteTeams(player.favoriteTeams?.join(", ") || "");
    setLeagueTypes(player.leagueTypes?.join(", ") || "");
    setTitlesWon(player.titlesWon?.join(", ") || "");
  }, [player]);

  const convertToArray = (value: string) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleSave = async () => {
    if (!player) return;

    const updatedPlayer = {
      ...player,
      name: name.trim(),
      favoriteTeams: convertToArray(favoriteTeams),
      leagueTypes: convertToArray(leagueTypes),
      titlesWon: convertToArray(titlesWon),
    };

    try {
      setIsSaving(true);

      const response = await api.put(
        `/api/players/${player._id}`,
        updatedPlayer
      );

      onSave(response.data);

      toast({
        title: "Jogador atualizado",
        description: `${name} foi atualizado com sucesso.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao salvar jogador", error);

      toast({
        title: "Erro ao atualizar jogador",
        description: "Houve um erro ao salvar as alterações.",
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
        <ModalHeader>Editar Jogador</ModalHeader>

        <ModalCloseButton isDisabled={isSaving} />

        <ModalBody>
          <VStack spacing={4}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do Jogador"
            />

            <Input
              value={favoriteTeams}
              onChange={(e) => setFavoriteTeams(e.target.value)}
              placeholder="Times que Torce"
            />

            <Input
              value={leagueTypes}
              onChange={(e) => setLeagueTypes(e.target.value)}
              placeholder="Ligas de Fantasy"
            />

            <Input
              value={titlesWon}
              onChange={(e) => setTitlesWon(e.target.value)}
              placeholder="Títulos Conquistados"
            />
          </VStack>
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

export default EditPlayerModal;