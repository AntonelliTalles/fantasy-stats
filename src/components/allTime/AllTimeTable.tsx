import {
  Badge,
  Box,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { AllTimePlayer } from "../../types/allTime";

interface AllTimeTableProps {
  ranking: AllTimePlayer[];
}

const AllTimeTable = ({
  ranking,
}: AllTimeTableProps) => {
  const navigate = useNavigate();

  const hoverBg = useColorModeValue(
    "gray.50",
    "gray.700"
  );

  const getPosition = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return `${index + 1}º`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2).replace(".", ",")}%`;
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      shadow="md"
      overflowX="auto"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>

            <Th>Jogador</Th>

            <Th isNumeric>Temp.</Th>

            <Th>Recorde</Th>

            <Th isNumeric>Vitórias</Th>

            <Th isNumeric>Aprov.</Th>

            <Th isNumeric>PO</Th>

            <Th isNumeric>V-PO</Th>

            <Th isNumeric>Títulos</Th>

            <Th isNumeric>PF</Th>

            <Th isNumeric>PS</Th>

            <Th isNumeric>Saldo</Th>
          </Tr>
        </Thead>

        <Tbody>
          {ranking.length > 0 ? (
            ranking.map((item, index) => (
              <Tr
                key={item.player._id}
                _hover={{
                  bg: hoverBg,
                }}
                transition="background 0.15s"
              >
                <Td>
                  <Text
                    fontSize={
                      index <= 2 ? "xl" : "sm"
                    }
                    fontWeight="bold"
                  >
                    {getPosition(index)}
                  </Text>
                </Td>

                <Td>
                  <Text
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={{
                      color: "green.500",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      navigate(
                        `/profile/${item.player._id}`
                      )
                    }
                  >
                    {item.player.name}
                  </Text>
                </Td>

                <Td isNumeric>
                  {item.seasons}
                </Td>

                <Td>
                  <HStack spacing={1}>
                    <Text fontWeight="semibold">
                      {item.regularWins}
                    </Text>

                    <Text color="gray.400">-</Text>

                    <Text>
                      {item.regularLosses}
                    </Text>

                    {item.regularTies > 0 && (
                      <>
                        <Text color="gray.400">
                          -
                        </Text>

                        <Text>
                          {item.regularTies}
                        </Text>
                      </>
                    )}
                  </HStack>
                </Td>

                <Td isNumeric>
                  <Text fontWeight="bold">
                    {item.totalWins}
                  </Text>
                </Td>

                <Td isNumeric>
                  <Badge
                    colorScheme={
                      item.winPercentage >= 60
                        ? "green"
                        : item.winPercentage >= 50
                        ? "blue"
                        : "gray"
                    }
                  >
                    {formatPercentage(
                      item.winPercentage
                    )}
                  </Badge>
                </Td>

                <Td isNumeric>
                  {item.playoffAppearances}
                </Td>

                <Td isNumeric>
                  {item.playoffsWins}
                </Td>

                <Td isNumeric>
                  {item.championships > 0 ? (
                    <Badge colorScheme="yellow">
                      🏆 {item.championships}
                    </Badge>
                  ) : (
                    0
                  )}
                </Td>

                <Td isNumeric>
                  {formatNumber(
                    item.pointsScored
                  )}
                </Td>

                <Td isNumeric>
                  {formatNumber(
                    item.pointsConceded
                  )}
                </Td>

                <Td isNumeric>
                  <Badge
                    colorScheme={
                      item.pointDifference > 0
                        ? "green"
                        : item.pointDifference < 0
                        ? "red"
                        : "gray"
                    }
                  >
                    {item.pointDifference > 0
                      ? "+"
                      : ""}
                    {formatNumber(
                      item.pointDifference
                    )}
                  </Badge>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td
                colSpan={12}
                textAlign="center"
                py={10}
                color="gray.500"
              >
                Nenhum histórico encontrado para
                esta modalidade.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AllTimeTable;