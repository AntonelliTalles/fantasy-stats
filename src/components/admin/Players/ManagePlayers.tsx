import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import EditPlayerModal from "./EditPlayerModal";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import Pagination from "../Pagination";
import { usePagination } from "../../../hooks/usePagination";

const ManagePlayers = () => {
  const [players, setPlayers] = useState<any[]>([]);

  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [playerToDelete, setPlayerToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    paginatedItems,
    startItem,
    endItem,
  } = usePagination({
    items: players,
    itemsPerPage: 10,
  });

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/players"
      );

      setPlayers(response.data);
    } catch (error) {
      console.error("Erro ao buscar jogadores", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleEdit = (player: any) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const handleSave = (updatedPlayer: any) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player._id === updatedPlayer._id
          ? updatedPlayer
          : player
      )
    );
  };

  const handleDeleteClick = (player: any) => {
    setPlayerToDelete(player);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) return;

    setPlayerToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!playerToDelete) return;

    try {
      setIsDeleting(true);

      await axios.delete(
        `http://localhost:5000/api/players/${playerToDelete._id}`
      );

      setPlayers((currentPlayers) =>
        currentPlayers.filter(
          (player) => player._id !== playerToDelete._id
        )
      );

      toast({
        title: "Jogador deletado",
        description: `${playerToDelete.name} foi deletado com sucesso.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setPlayerToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar jogador", error);

      toast({
        title: "Erro ao deletar jogador",
        description: "Houve um erro ao deletar o jogador.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
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
          {paginatedItems.map((player) => (
            <Tr key={player._id}>
              <Td>{player.name}</Td>

              <Td>
                {player.favoriteTeams?.join(", ") || "-"}
              </Td>

              <Td>
                {player.leagueTypes?.join(", ") || "-"}
              </Td>

              <Td>
                {player.titlesWon?.join(", ") || "-"}
              </Td>

              <Td>
                <ButtonGroup spacing={4}>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEdit(player)}
                  >
                    Editar
                  </Button>

                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteClick(player)}
                  >
                    Excluir
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startItem={startItem}
        endItem={endItem}
        onPageChange={setCurrentPage}
      />

      {selectedPlayer && (
        <EditPlayerModal
          player={selectedPlayer}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmDeleteDialog
        isOpen={!!playerToDelete}
        itemName={playerToDelete?.name}
        isDeleting={isDeleting}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManagePlayers;