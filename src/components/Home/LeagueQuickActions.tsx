import { Box, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  leagueId: string;
}

export default function LeagueQuickActions({ leagueId }: Props) {
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      shadow="md"
      h="100%"
    >
      <Heading size="md" mb={6}>
        Atalhos da Liga
      </Heading>

      <VStack spacing={4} align="stretch">
        <Button
          colorScheme="green"
          variant="solid"
          onClick={() => navigate(`/view-league/${leagueId}`)}
        >
          Ver Liga
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/players-list")}
        >
          Jogadores
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/histories")}
        >
          Históricos
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/h2h")}
        >
          H2H Battles
        </Button>
      </VStack>

      <Box mt={8}>
        <Text fontSize="sm" color="gray.500">
          Acesse rapidamente todas as informações relacionadas à liga selecionada.
        </Text>
      </Box>
    </Box>
  );
}