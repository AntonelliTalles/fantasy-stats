import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

import EditLeagueModal from "./EditLeagueModal";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

const ManageLeagues = () => {
  const [leagues, setLeagues] = useState<any[]>([]);

  const [selectedLeague, setSelectedLeague] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [leagueToDelete, setLeagueToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/leagues"
        );

        setLeagues(response.data);
      } catch (error) {
        console.error("Erro ao buscar ligas", error);
      }
    };

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

      await axios.delete(
        `http://localhost:5000/api/leagues/${leagueToDelete._id}`
      );

      setLeagues((currentLeagues) =>
        currentLeagues.filter(
          (league) => league._id !== leagueToDelete._id
        )
      );

      setLeagueToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar liga", error);
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
          {leagues.map((league) => (
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