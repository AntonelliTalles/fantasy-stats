import React, { useEffect, useState } from "react";
import { Box, HStack, Select } from "@chakra-ui/react";
import api from "../../services/api";

interface FiltersPanelProps {
  selectedSeason: number;
  setSelectedSeason: (year: number) => void;
  selectedLeague: string | null;
  setSelectedLeague: (id: string | null) => void;
  selectedPlayer: string | null;
  setSelectedPlayer: (id: string | null) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  selectedSeason,
  setSelectedSeason,
  selectedLeague,
  setSelectedLeague,
  selectedPlayer,
  setSelectedPlayer
}) => {
  const [leagues, setLeagues] = useState<{ _id: string; name: string }[]>([]);
  const [players, setPlayers] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    api.get("/leagues").then(res => setLeagues(res.data));
    api.get("/players").then(res => setPlayers(res.data));
  }, []);

  return (
    <Box bg="white" p={4} borderRadius="md" shadow="sm">
      <HStack spacing={4}>
        {/* Select Temporada */}
        <Select
          placeholder="Selecionar temporada"
          value={selectedSeason || ""}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {[2025, 2024, 2023, 2022].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        {/* Select Liga */}
        <Select
          placeholder="Selecionar liga"
          value={selectedLeague || ""}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          {leagues.map((league) => (
            <option key={league._id} value={league._id}>
              {league.name}
            </option>
          ))}
        </Select>

        {/* Select Jogador */}
        <Select
          placeholder="Selecionar jogador"
          value={selectedPlayer || ""}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};

export default FiltersPanel;
