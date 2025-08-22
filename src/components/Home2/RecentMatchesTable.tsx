import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import api from "../../services/api";

interface Props {
  season: number;
  leagueId?: string | null;
  playerId?: string | null;
}

const RecentMatchesTable: React.FC<Props> = ({ season, leagueId, playerId }) => {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    if (!leagueId || !playerId) return;

    api.get(`/player-history?seasonYear=${season}&league=${leagueId}&player=${playerId}`)
      .then(res => setMatches([res.data])); // pode ajustar se tiver mais histórico
  }, [season, leagueId, playerId]);

  return (
    <Box p={4} bg="white" borderRadius="md" shadow="sm" overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Jogador</Th>
            <Th>Liga</Th>
            <Th>Vitórias</Th>
            <Th>Derrotas</Th>
            <Th>Playoffs Wins</Th>
            <Th>Playoffs Losses</Th>
            <Th>Pontos</Th>
          </Tr>
        </Thead>
        <Tbody>
          {matches.map((match, i) => (
            <Tr key={i}>
              <Td>{match.playerName}</Td>
              <Td>{match.leagueName}</Td>
              <Td>{match.regularWins}</Td>
              <Td>{match.regularLosses}</Td>
              <Td>{match.playoffsWins}</Td>
              <Td>{match.playoffsLosses}</Td>
              <Td>{match.pointsScored}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RecentMatchesTable;
