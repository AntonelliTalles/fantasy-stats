import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import EditHeadToHeadModal from "./EditHeadToHeadModal"; // Modal de edição

const ManageHeadToHead = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/head-to-head");
        setMatches(response.data);
      } catch (error) {
        console.error("Erro ao buscar confrontos diretos", error);
      }
    };
    fetchMatches();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/head-to-head/${id}`);
      setMatches(matches.filter((match) => match._id !== id));
      toast({
        title: "Confronto Deletado",
        description: "O confronto foi deletado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao Deletar Confronto",
        description: "Houve um erro ao deletar o confronto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (match: any) => {
    setSelectedMatch(match);
    setModalOpen(true);  
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
              <Td>{match.league.name}</Td>
              <Td>{match.player1.name}</Td>
              <Td>{match.player2.name}</Td>
              <Td>{match.player1Wins}</Td>
              <Td>{match.player2Wins}</Td>
              <Td>{match.player1PlayoffsWins}</Td>
              <Td>{match.player2PlayoffsWins}</Td>
              <Td>{match.totalMatches}</Td>
             <Td>
              <HStack spacing={2}>
                <Button colorScheme="blue" onClick={() => handleEdit(match)}>
                  Editar
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(match._id)}>
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
          onSave={(updatedMatch: any) => {
            setMatches(matches.map((match) => (match._id === updatedMatch._id ? updatedMatch : match)));
          }}
        />
      )}
    </div>
  );
};

export default ManageHeadToHead;
