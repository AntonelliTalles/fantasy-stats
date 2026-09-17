import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import EditHeadToHeadModal from "./EditHeadToHeadModal";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

const ManageHeadToHead = () => {
  const [matches, setMatches] = useState<any[]>([]);

  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [matchToDelete, setMatchToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/head-to-head"
        );

        setMatches(response.data);
      } catch (error) {
        console.error("Erro ao buscar confrontos diretos", error);
      }
    };

    fetchMatches();
  }, []);

  const handleEdit = (match: any) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  const handleSave = (updatedMatch: any) => {
    setMatches((currentMatches) =>
      currentMatches.map((match) =>
        match._id === updatedMatch._id
          ? updatedMatch
          : match
      )
    );
  };

  const handleDeleteClick = (match: any) => {
    setMatchToDelete(match);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) return;

    setMatchToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!matchToDelete) return;

    try {
      setIsDeleting(true);

      await axios.delete(
        `http://localhost:5000/api/head-to-head/${matchToDelete._id}`
      );

      setMatches((currentMatches) =>
        currentMatches.filter(
          (match) => match._id !== matchToDelete._id
        )
      );

      toast({
        title: "Confronto deletado",
        description: "O confronto foi deletado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setMatchToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar confronto", error);

      toast({
        title: "Erro ao deletar confronto",
        description: "Houve um erro ao deletar o confronto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getMatchDeleteName = () => {
    if (!matchToDelete) return undefined;

    const player1 =
      matchToDelete.player1?.name ?? "Jogador 1";

    const player2 =
      matchToDelete.player2?.name ?? "Jogador 2";

    const league =
      matchToDelete.league?.name;

    return league
      ? `${player1} x ${player2} — ${league}`
      : `${player1} x ${player2}`;
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Liga</Th>
            <Th>Jogador 1</Th>
            <Th>Jogador 2</Th>
            <Th>Vitórias Jogador 1</Th>
            <Th>Vitórias Jogador 2</Th>
            <Th>Vitórias Jogador 1 em Playoffs</Th>
            <Th>Vitórias Jogador 2 em Playoffs</Th>
            <Th>Total de Partidas</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {matches.map((match) => (
            <Tr key={match._id}>
              <Td>{match.league?.name ?? "-"}</Td>

              <Td>{match.player1?.name ?? "-"}</Td>

              <Td>{match.player2?.name ?? "-"}</Td>

              <Td>{match.player1Wins}</Td>

              <Td>{match.player2Wins}</Td>

              <Td>{match.player1PlayoffsWins}</Td>

              <Td>{match.player2PlayoffsWins}</Td>

              <Td>{match.totalMatches}</Td>

              <Td>
                <HStack spacing={2}>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEdit(match)}
                  >
                    Editar
                  </Button>

                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteClick(match)}
                  >
                    Excluir
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedMatch && (
        <EditHeadToHeadModal
          match={selectedMatch}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmDeleteDialog
        isOpen={!!matchToDelete}
        itemName={getMatchDeleteName()}
        isDeleting={isDeleting}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManageHeadToHead;