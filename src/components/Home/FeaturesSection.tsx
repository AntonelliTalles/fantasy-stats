import { Box, SimpleGrid, Text, VStack, Icon, Button } from "@chakra-ui/react";
import { FaTrophy, FaUsers, FaChartLine, FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HomeStats } from "./Homepage";

type FeaturesSectionProps = {
  stats: HomeStats;
};

export default function FeaturesSection({ stats }: FeaturesSectionProps) {
  const navigate = useNavigate();

  const features = [
    {
      icon: FaUsers,
      title: "Jogadores",
      desc: "Veja todos os participantes cadastrados, seus times favoritos e títulos.",
      value: stats.totalPlayers,
      button: "Ver jogadores",
      path: "/players-list",
    },
    {
      icon: FaTrophy,
      title: "Ligas",
      desc: "Consulte ligas cadastradas, campeões, vice-campeões e temporadas.",
      value: stats.totalLeagues,
      button: "Ver ligas",
      path: "/leagues/view",
    },
    {
      icon: FaExchangeAlt,
      title: "H2H Battles",
      desc: "Compare confrontos diretos entre jogadores e rivalidades históricas.",
      value: stats.totalHeadToHead,
      button: "Ver H2H",
      path: "/h2h",
    },
    {
      icon: FaChartLine,
      title: "Históricos",
      desc: "Acompanhe desempenho por temporada, playoffs e saldo de pontos.",
      value: stats.totalHistories,
      button: "Ver históricos",
      path: "/histories",
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6} py={10} px={{ base: 6, md: 10 }}>
      {features.map((feature) => (
        <VStack
          key={feature.title}
          bg="white"
          p={6}
          shadow="md"
          borderRadius="2xl"
          spacing={4}
          align="start"
          transition="all 0.25s ease"
          _hover={{
            transform: "translateY(-6px)",
            shadow: "xl",
          }}
        >
          <Icon as={feature.icon} w={10} h={10} color="green.500" />

          <Box>
            <Text fontWeight="bold" fontSize="xl">
              {feature.title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="green.600">
              {feature.value}
            </Text>
          </Box>

          <Text fontSize="sm" color="gray.600" minH="48px">
            {feature.desc}
          </Text>

          <Button size="sm" colorScheme="green" variant="outline" onClick={() => navigate(feature.path)}>
            {feature.button}
          </Button>
        </VStack>
      ))}
    </SimpleGrid>
  );
}