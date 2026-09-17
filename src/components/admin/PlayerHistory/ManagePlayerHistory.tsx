import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import EditPlayerHistoryModal from "./EditPlayerHistoryModal";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

const ManagePlayerHistory = () => {
  const [historyRecords, setHistoryRecords] = useState<any[]>([]);

  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [recordToDelete, setRecordToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchHistoryRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/player-history"
        );

        setHistoryRecords(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar históricos de jogadores:",
          error
        );
      }
    };

    fetchHistoryRecords();
  }, []);

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleSave = (updatedRecord: any) => {
    setHistoryRecords((prevRecords) =>
      prevRecords.map((record) =>
        record._id === updatedRecord._id
          ? updatedRecord
          : record
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

  const handleDeleteClick = (record: any) => {
    setRecordToDelete(record);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) return;

    setRecordToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;

    try {
      setIsDeleting(true);

      await axios.delete(
        `http://localhost:5000/api/player-history/${recordToDelete._id}`
      );

      setHistoryRecords((prevRecords) =>
        prevRecords.filter(
          (record) => record._id !== recordToDelete._id
        )
      );

      toast({
        title: "Histórico deletado",
        description: "O histórico foi deletado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setRecordToDelete(null);
    } catch (error) {
      console.error(
        "Erro ao deletar histórico:",
        error
      );

      toast({
        title: "Erro ao deletar histórico",
        description: "Houve um erro ao deletar o histórico.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getRecordDeleteName = () => {
    if (!recordToDelete) return undefined;

    const player =
      recordToDelete.player?.name ?? "Jogador";

    const league =
      recordToDelete.league?.name ?? "Liga";

    const year =
      recordToDelete.seasonYear ?? "Ano não informado";

    return `${player} — ${league} — ${year}`;
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Liga</Th>
            <Th>Jogador</Th>

            <Th>Vitórias Regular</Th>
            <Th>Derrotas Regular</Th>
            <Th>Empates Regular</Th>

            <Th>Playoffs</Th>

            <Th>Vitórias Playoffs</Th>
            <Th>Derrotas Playoffs</Th>

            <Th>Pontos Marcados</Th>
            <Th>Pontos Sofridos</Th>
            <Th>Saldo</Th>

            <Th>Posição Final</Th>
            <Th>Ano</Th>

            <Th>Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {historyRecords.map((record) => (
            <Tr key={record._id}>
              <Td>
                {record.league?.name ?? "Liga não encontrada"}
              </Td>

              <Td>
                {record.player?.name ?? "Jogador não encontrado"}
              </Td>

              <Td>{record.regularWins ?? 0}</Td>

              <Td>{record.regularLosses ?? 0}</Td>

              <Td>{record.regularTies ?? 0}</Td>

              <Td>
                <Badge
                  colorScheme={
                    record.madePlayoffs
                      ? "green"
                      : "gray"
                  }
                >
                  {record.madePlayoffs
                    ? "Classificado"
                    : "Não classificado"}
                </Badge>
              </Td>

              <Td>{record.playoffsWins ?? 0}</Td>

              <Td>{record.playoffsLosses ?? 0}</Td>

              <Td>{record.pointsScored ?? 0}</Td>

              <Td>{record.pointsConceded ?? 0}</Td>

              <Td>{record.pointDifference ?? 0}</Td>

              <Td>{record.finalPosition ?? "-"}</Td>

              <Td>{record.seasonYear ?? "-"}</Td>

              <Td>
                <HStack spacing={2}>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEdit(record)}
                  >
                    Editar
                  </Button>

                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteClick(record)}
                  >
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

      <ConfirmDeleteDialog
        isOpen={!!recordToDelete}
        itemName={getRecordDeleteName()}
        isDeleting={isDeleting}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManagePlayerHistory;