import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import axios from "axios";
import EditLeagueModal from "./EditLeagueModal";

const ManageLeagues = () => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leagues");
        setLeagues(response.data);
      } catch (error) {
        console.error("Erro ao buscar ligas", error);
      }
    };
    fetchLeagues();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/leagues/${id}`);
      setLeagues(leagues.filter((league) => league._id !== id));
    } catch (error) {
      console.error("Erro ao deletar liga", error);
    }
  };

  const handleEdit = (league: any) => {
    setSelectedLeague(league);
    setModalOpen(true);  // Abre o modal de edição
  };

  const handleSave = (updatedLeague: any) => {
    setLeagues(leagues.map((league) => (league._id === updatedLeague._id ? updatedLeague : league)));
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
                <Button colorScheme="blue" onClick={() => handleEdit(league)}>
                  Editar
                </Button>
                <Button colorScheme="red" ml={2} onClick={() => handleDelete(league._id)}>
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal de edição */}
      {selectedLeague && (
        <EditLeagueModal
          league={selectedLeague}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageLeagues;