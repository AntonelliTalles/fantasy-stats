import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaExchangeAlt, FaTrophy, FaUsers } from "react-icons/fa";

import api from "../../services/api";

type HomeStats = {
  players: number;
  leagues: number;
  h2h: number;
  histories: number;
};

export default function HomeQuickAccessSection() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<HomeStats>({
    players: 0,
    leagues: 0,
    h2h: 0,
    histories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [playersRes, leaguesRes, h2hRes, historiesRes] =
          await Promise.all([
            api.get("/players"),
            api.get("/leagues"),
            api.get("/head-to-head"),
            api.get("/player-history"),
          ]);

        setStats({
          players: playersRes.data.length,
          leagues: leaguesRes.data.length,
          h2h: h2hRes.data.length,
          histories: historiesRes.data.length,
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas da Home:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Jogadores",
      value: stats.players,
      desc: "Explore participantes, títulos e modalidades.",
      icon: FaUsers,
      path: "/players-list",
    },
    {
      title: "Ligas",
      value: stats.leagues,
      desc: "Veja campeões, temporadas e plataformas.",
      icon: FaTrophy,
      path: "/leagues/view",
    },
    {
      title: "H2H",
      value: stats.h2h,
      desc: "Compare rivalidades e confrontos diretos.",
      icon: FaExchangeAlt,
      path: "/h2h",
    },
    {
      title: "Históricos",
      value: stats.histories,
      desc: "Analise temporadas, playoffs e pontuações.",
      icon: FaChartLine,
      path: "/histories",
    },
  ];

  return (
    <Box px={{ base: 5, md: 8 }} py={8}>
      <Heading size="lg" mb={5}>
        Acesse rapidamente
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6}>
        {cards.map((card) => (
          <VStack
            key={card.title}
            align="start"
            bg="white"
            p={6}
            borderRadius="2xl"
            shadow="md"
            spacing={4}
            transition="all 0.25s ease"
            _hover={{
              transform: "translateY(-5px)",
              shadow: "xl",
            }}
          >
            <Icon as={card.icon} boxSize={9} color="green.500" />

            <Box>
              <Text fontWeight="bold" fontSize="xl">
                {card.title}
              </Text>

              <Text fontSize="3xl" fontWeight="bold" color="green.600">
                {card.value}
              </Text>
            </Box>

            <Text color="gray.600" fontSize="sm">
              {card.desc}
            </Text>

            <Button
              size="sm"
              colorScheme="green"
              variant="outline"
              onClick={() => navigate(card.path)}
            >
              Ver mais
            </Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}