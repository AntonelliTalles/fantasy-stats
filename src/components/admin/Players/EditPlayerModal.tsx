import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button, useDisclosure } from "@chakra-ui/react";
import axios from "axios";

const EditPlayerModal = ({ player, isOpen, onClose, onSave }: any) => {
  const [name, setName] = useState(player.name);
  const [favoriteTeams, setFavoriteTeams] = useState(player.favoriteTeams.join(", "));
  const [leagueTypes, setLeagueTypes] = useState(player.leagueTypes.join(", "));
  const [titlesWon, setTitlesWon] = useState(player.titlesWon.join(", "));

  useEffect(() => {
    setName(player.name);
    setFavoriteTeams(player.favoriteTeams.join(", "));
    setLeagueTypes(player.leagueTypes.join(", "));
    setTitlesWon(player.titlesWon.join(", "));
  }, [player]);

  const handleSave = async () => {
    const updatedPlayer = {
      ...player,
      name,
      favoriteTeams: favoriteTeams.split(",").map((item: any) => item.trim()),
      leagueTypes: leagueTypes.split(",").map((item: any) => item.trim()),
      titlesWon: titlesWon.split(",").map((item: any) => item.trim()),
    };

    try {
      await axios.put(`http://localhost:5000/api/players/${player._id}`, updatedPlayer);
      onSave(updatedPlayer); 
      onClose();
    } catch (error) {
      console.error("Erro ao salvar jogador", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Jogador</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do Jogador" />
          <Input value={favoriteTeams} onChange={(e) => setFavoriteTeams(e.target.value)} mt={2} placeholder="Times que Torce" />
          <Input value={leagueTypes} onChange={(e) => setLeagueTypes(e.target.value)} mt={2} placeholder="Ligas de Fantasy" />
          <Input value={titlesWon} onChange={(e) => setTitlesWon(e.target.value)} mt={2} placeholder="Títulos Conquistados" />
        </ModalBody>
        <Button colorScheme="blue" onClick={handleSave} mt={4}>
          Salvar
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default EditPlayerModal;
