import React from "react";
import { Box } from "@chakra-ui/react";
import FeaturedLeagueSection from "./FeaturedLeagueSection";
import HomeQuickAccessSection from "./HomeQuickAccessSection";
import LatestChampionsSection from "./LatestChampionSection";
import PowerRankingPreview from "./PowerRankingPreview";

export default function Homepage() {
  return (
    <Box bg="gray.50" minH="100vh">
      <FeaturedLeagueSection />
      <HomeQuickAccessSection />
      <PowerRankingPreview />
      <LatestChampionsSection />
    </Box>
  );
}