import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Select,
  SimpleGrid,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

import api from "../../services/api";
import AllTimeTable from "../../components/allTime/AllTimeTable";

import {
  AllTimeResponse,
  AllTimeSortKey,
  LeagueType,
} from "../../types/allTime";

const sortOptions: {
  value: AllTimeSortKey;
  label: string;
}[] = [
  {
    value: "totalWins",
    label: "Vitórias totais",
  },
  {
    value: "winPercentage",
    label: "Aproveitamento",
  },
  {
    value: "championships",
    label: "Títulos",
  },
  {
    value: "playoffsWins",
    label: "Vitórias em playoffs",
  },
  {
    value: "playoffAppearances",
    label: "Participações em playoffs",
  },
  {
    value: "pointsScored",
    label: "Pontos marcados",
  },
  {
    value: "pointsConceded",
    label: "Pontos sofridos",
  },
  {
    value: "pointDifference",
    label: "Saldo de pontos",
  },
  {
    value: "seasons",
    label: "Temporadas",
  },
];

const AllTimePage = () => {
  const [leagueType, setLeagueType] =
    useState<LeagueType>("NFL");

  const [sortBy, setSortBy] =
    useState<AllTimeSortKey>("totalWins");

  const [data, setData] =
    useState<AllTimeResponse | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchAllTime = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response =
          await api.get<AllTimeResponse>(
            `/all-time?leagueType=${leagueType}`
          );

        setData(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar histórico geral:",
          error
        );

        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTime();
  }, [leagueType]);

  const sortedRanking = useMemo(() => {
    if (!data) return [];

    return [...data.ranking].sort(
      (a, b) => {
        /**
         * Pontos sofridos é a única métrica
         * onde um número menor é melhor.
         */
        if (sortBy === "pointsConceded") {
          if (
            a.pointsConceded !==
            b.pointsConceded
          ) {
            return (
              a.pointsConceded -
              b.pointsConceded
            );
          }
        } else {
          if (b[sortBy] !== a[sortBy]) {
            return (
              Number(b[sortBy]) -
              Number(a[sortBy])
            );
          }
        }

        /**
         * Critérios de desempate.
         */

        if (
          b.totalWins !== a.totalWins
        ) {
          return (
            b.totalWins -
            a.totalWins
          );
        }

        if (
          b.winPercentage !==
          a.winPercentage
        ) {
          return (
            b.winPercentage -
            a.winPercentage
          );
        }

        if (
          b.playoffsWins !==
          a.playoffsWins
        ) {
          return (
            b.playoffsWins -
            a.playoffsWins
          );
        }

        if (
          b.championships !==
          a.championships
        ) {
          return (
            b.championships -
            a.championships
          );
        }

        return (
          b.pointDifference -
          a.pointDifference
        );
      }
    );
  }, [data, sortBy]);

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      px={{ base: 5, md: 10 }}
      py={10}
    >
      <VStack
        align="stretch"
        spacing={8}
        maxW="1600px"
        mx="auto"
      >
        {/* HEADER */}

        <Box>
          <Badge
            colorScheme="green"
            mb={3}
            px={3}
            py={1}
            borderRadius="full"
          >
            All-Time
          </Badge>

          <Heading size="xl">
            Histórico Geral
          </Heading>

          <Text
            color="gray.600"
            mt={2}
            maxW="700px"
          >
            Compare o desempenho acumulado
            dos jogadores ao longo de todas
            as temporadas e ligas de cada
            modalidade.
          </Text>
        </Box>

        {/* CONTROLES */}

        <Flex
          bg="white"
          p={5}
          borderRadius="2xl"
          shadow="md"
          justify="space-between"
          align={{
            base: "stretch",
            md: "center",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
          gap={5}
        >
          <Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="gray.500"
              mb={2}
            >
              Modalidade
            </Text>

            <ButtonGroup
              size="sm"
              isAttached
            >
              {(
                [
                  "NFL",
                  "NBA",
                  "MLB",
                ] as LeagueType[]
              ).map((type) => (
                <Button
                  key={type}
                  colorScheme="green"
                  variant={
                    leagueType === type
                      ? "solid"
                      : "outline"
                  }
                  onClick={() =>
                    setLeagueType(type)
                  }
                >
                  {type}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <Box
            minW={{
              base: "100%",
              md: "260px",
            }}
          >
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="gray.500"
              mb={2}
            >
              Ordenar ranking por
            </Text>

            <Select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target
                    .value as AllTimeSortKey
                )
              }
            >
              {sortOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </Select>
          </Box>
        </Flex>

        {/* CONTEÚDO */}

        {isLoading ? (
          <Flex
            minH="400px"
            align="center"
            justify="center"
          >
            <Spinner
              size="xl"
              color="green.500"
            />
          </Flex>
        ) : isError ? (
          <Box
            bg="white"
            p={10}
            borderRadius="2xl"
            shadow="md"
            textAlign="center"
          >
            <Heading size="md">
              Não foi possível carregar o
              histórico geral.
            </Heading>

            <Text
              color="gray.500"
              mt={2}
            >
              Verifique a conexão com a API
              e tente novamente.
            </Text>
          </Box>
        ) : data ? (
          <>
            {/* RESUMO */}

            <SimpleGrid
              columns={{
                base: 1,
                md: 3,
              }}
              spacing={5}
            >
              <Box
                bg="white"
                p={5}
                borderRadius="2xl"
                shadow="md"
              >
                <Stat>
                  <StatLabel>
                    Jogadores
                  </StatLabel>

                  <StatNumber>
                    {data.totalPlayers}
                  </StatNumber>
                </Stat>
              </Box>

              <Box
                bg="white"
                p={5}
                borderRadius="2xl"
                shadow="md"
              >
                <Stat>
                  <StatLabel>
                    Ligas / Temporadas
                  </StatLabel>

                  <StatNumber>
                    {data.totalLeagues}
                  </StatNumber>
                </Stat>
              </Box>

              <Box
                bg="white"
                p={5}
                borderRadius="2xl"
                shadow="md"
              >
                <Stat>
                  <StatLabel>
                    Participações
                  </StatLabel>

                  <StatNumber>
                    {
                      data.totalHistoryRecords
                    }
                  </StatNumber>
                </Stat>
              </Box>
            </SimpleGrid>

            {/* DESCRIÇÃO DA ORDENAÇÃO */}

            <Flex
              align="center"
              justify="space-between"
              gap={4}
              flexWrap="wrap"
            >
              <Box>
                <Heading size="md">
                  Ranking histórico{" "}
                  {leagueType}
                </Heading>

                <Text
                  color="gray.500"
                  fontSize="sm"
                  mt={1}
                >
                  Ordenado por{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                    color="gray.700"
                  >
                    {
                      sortOptions.find(
                        (option) =>
                          option.value ===
                          sortBy
                      )?.label
                    }
                  </Text>
                  .
                </Text>
              </Box>

              <Badge
                colorScheme="green"
                px={3}
                py={1}
                borderRadius="full"
              >
                {sortedRanking.length}{" "}
                jogadores
              </Badge>
            </Flex>

            {/* TABELA */}

            <AllTimeTable
              ranking={sortedRanking}
            />
          </>
        ) : null}
      </VStack>
    </Box>
  );
};

export default AllTimePage;