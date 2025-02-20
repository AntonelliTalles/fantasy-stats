import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import EditPlayerModal from "./EditPlayerModal";

const ManagePlayers = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const toast = useToast();

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Erro ao buscar jogadores", error);
    }
  };

  const handleEdit = (player: any) => {
    setSelectedPlayer(player);
    setModalOpen(true);  
  };

  const handleSave = (updatedPlayer: any) => {
    setPlayers(players.map((player) => (player._id === updatedPlayer._id ? updatedPlayer : player)));
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${id}`);
      setPlayers(players.filter(player => player._id !== id));
      toast({
        title: "Jogador Deletado",
        description: "O jogador foi deletado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao Deletar Jogador",
        description: "Houve um erro ao deletar o jogador.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Times</Th>
            <Th>Ligas</Th>
            <Th>Títulos</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {players.map((player) => (
            <Tr key={player._id}>
              <Td>{player.name}</Td>
              <Td>{player.favoriteTeams.join(", ")}</Td>
              <Td>{player.leagueTypes.join(", ")}</Td>
              <Td>{player.titlesWon.join(", ")}</Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleEdit(player)}>
                  Editar
                </Button>
                <Button colorScheme="red" ml={2} onClick={() => handleDelete(player._id)}>
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedPlayer && (
        <EditPlayerModal
          player={selectedPlayer}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
      
    </div>
  );
};

export default ManagePlayers;
