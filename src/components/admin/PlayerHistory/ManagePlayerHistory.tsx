import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import EditPlayerHistoryModal from "./EditPlayerHistoryModal"; // Modal de edição

const ManagePlayerHistory = () => {
  const [historyRecords, setHistoryRecords] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchHistoryRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/player-history");
        setHistoryRecords(response.data);
      } catch (error) {
        console.error("Erro ao buscar históricos de jogadores", error);
      }
    };
    fetchHistoryRecords();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/player-history/${id}`);
      setHistoryRecords(historyRecords.filter((record) => record._id !== id));
      toast({
        title: "Histórico Deletado",
        description: "O histórico foi deletado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao Deletar Histórico",
        description: "Houve um erro ao deletar o histórico.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleSave = (updatedRecord: any) => {
    // Atualiza o estado local de historyRecords com os dados mais recentes
    setHistoryRecords((prevRecords) =>
      prevRecords.map((record) =>
        record._id === updatedRecord._id ? updatedRecord : record
      )
    );
    toast({
      title: "Histórico Atualizado",
      description: "O histórico foi atualizado com sucesso.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Liga</Th>
            <Th>Jogador</Th>
            <Th>Vitórias Fase Regular</Th>
            <Th>Derrotas Fase Regular</Th>
            <Th>Vitórias Playoffs</Th>
            <Th>Derrotas Playoffs</Th>
            <Th>Pontos Marcados</Th>
            <Th>Pontos Sofridos</Th>
            <Th>Saldo de Pontos</Th>
            <Th>Posição Final</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {historyRecords.map((record) => (
            <Tr key={record._id}>
              <Td>{record.league.name}</Td>  {/* Exibe o nome da liga */}
              <Td>{record.player.name}</Td>  {/* Exibe o nome do jogador */}
              <Td>{record.regularWins}</Td>
              <Td>{record.regularLosses}</Td>
              <Td>{record.playoffsWins}</Td>
              <Td>{record.playoffsLosses}</Td>
              <Td>{record.pointsScored}</Td>
              <Td>{record.pointsConceded}</Td>
              <Td>{record.pointDifference}</Td>
              <Td>{record.finalPosition}</Td>
              <Td>
                 <HStack spacing={2}>
                    <Button colorScheme="blue" onClick={() => handleEdit(record)}>
                    Editar
                    </Button>
                    <Button colorScheme="red" ml={2} onClick={() => handleDelete(record._id)}>
                    Excluir
                    </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedRecord && (
        <EditPlayerHistoryModal
          record={selectedRecord}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManagePlayerHistory;
