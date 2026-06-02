import React, { useEffect, useState } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import api from "../../services/api";

import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import LeagueTableSection from "./LeagueTableSection";

export type HomeStats = {
  totalPlayers: number;
  totalLeagues: number;
  totalHeadToHead: number;
  totalHistories: number;
};

export type PlayerHistoryRecord = {
  _id: string;
  league?: {
    _id: string;
    name: string;
  };
  player?: {
    _id: string;
    name: string;
  };
  regularWins: number;
  regularLosses: number;
  playoffsWins: number;
  playoffsLosses: number;
  pointsScored: number;
  pointsConceded: number;
  pointDifference: number;
  finalPosition: number;
  seasonYear: number;
};

export default function Homepage() {
  const [stats, setStats] = useState<HomeStats>({
    totalPlayers: 0,
    totalLeagues: 0,
    totalHeadToHead: 0,
    totalHistories: 0,
  });

  const [histories, setHistories] = useState<PlayerHistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [playersRes, leaguesRes, h2hRes, historyRes] = await Promise.all([
          api.get("/players"),
          api.get("/leagues"),
          api.get("/head-to-head"),
          api.get("/player-history"),
        ]);

        setStats({
          totalPlayers: playersRes.data.length,
          totalLeagues: leaguesRes.data.length,
          totalHeadToHead: h2hRes.data.length,
          totalHistories: historyRes.data.length,
        });

        setHistories(historyRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (isLoading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <HeroSection stats={stats} histories={histories} />
      <FeaturesSection stats={stats} />
      <LeagueTableSection histories={histories} />
    </Box>
  );
}