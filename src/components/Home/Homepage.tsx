import React from "react";
import { Box } from "@chakra-ui/react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import LeagueTableSection from "./LeagueTableSection";

export default function Homepage() {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <LeagueTableSection />
    </Box>
  );
}
