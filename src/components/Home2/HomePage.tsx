import React, { useState } from "react";
import { Box, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import DashboardCards from "./DashboardCards";
import PlayerPerformanceChart from "./PlayerPerformanceChart";
import RecentMatchesTable from "./RecentMatchesTable";
import FiltersPanel from "./FiltersPanel";

const HomePage = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Fantasy Stats Dashboard</Heading>

        <DashboardCards />

        <FiltersPanel
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
          selectedLeague={selectedLeague}
          setSelectedLeague={setSelectedLeague}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
        />

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          <GridItem colSpan={{ base: 1, lg: 1 }}>
            <PlayerPerformanceChart
              season={selectedSeason}
              leagueId={selectedLeague}
              playerId={selectedPlayer}
            />
          </GridItem>

          <GridItem colSpan={{ base: 1, lg: 1 }}>
            <RecentMatchesTable
              season={selectedSeason}
              leagueId={selectedLeague}
              playerId={selectedPlayer}
            />
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default HomePage;
