import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

import api from "../../../services/api";
import EditLeagueModal from "./EditLeagueModal";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import Pagination from "../Pagination";
import { usePagination } from "../../../hooks/usePagination";

const ManageLeagues = () => {
  const [leagues, setLeagues] = useState<any[]>([]);

  const [selectedLeague, setSelectedLeague] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [leagueToDelete, setLeagueToDelete] = useState<any | null>(null);
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
    items: leagues,
    itemsPerPage: 10,
  });

  const fetchLeagues = async () => {
    try {
      const response = await api.get("/leagues");

      setLeagues(response.data);
    } catch (error) {
      console.error("Erro ao buscar ligas", error);

      toast({
        title: "Erro ao buscar ligas",
        description: "Não foi possível carregar as ligas.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const handleDeleteClick = (league: any) => {
    setLeagueToDelete(league);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) return;

    setLeagueToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!leagueToDelete) return;

    try {
      setIsDeleting(true);

      await api.delete(
        `/leagues/${leagueToDelete._id}`
      );

      setLeagues((currentLeagues) =>
        currentLeagues.filter(
          (league) => league._id !== leagueToDelete._id
        )
      );

      toast({
        title: "Liga deletada",
        description: `${leagueToDelete.name} foi deletada com sucesso.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setLeagueToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar liga", error);

      toast({
        title: "Erro ao deletar liga",
        description: "Houve um erro ao deletar a liga.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (league: any) => {
    setSelectedLeague(league);
    setModalOpen(true);
  };

  const handleSave = (updatedLeague: any) => {
    setLeagues((currentLeagues) =>
      currentLeagues.map((league) =>
        league._id === updatedLeague._id
          ? updatedLeague
          : league
      )
    );

    setSelectedLeague(updatedLeague);
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Tipo</Th>
            <Th>Times</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {paginatedItems.map((league) => (
            <Tr key={league._id}>
              <Td>{league.name}</Td>

              <Td>{league.leagueType}</Td>

              <Td>{league.teamCount}</Td>

              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => handleEdit(league)}
                >
                  Editar
                </Button>

                <Button
                  colorScheme="red"
                  ml={2}
                  onClick={() => handleDeleteClick(league)}
                >
                  Excluir
                </Button>
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

      {selectedLeague && (
        <EditLeagueModal
          league={selectedLeague}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmDeleteDialog
        isOpen={!!leagueToDelete}
        itemName={leagueToDelete?.name}
        isDeleting={isDeleting}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManageLeagues;