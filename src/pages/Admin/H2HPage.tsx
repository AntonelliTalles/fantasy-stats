import {
  Box,
  Heading,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Center,
  Spinner,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { asyncGetPlayers } from '../../services/playerService'
import { asyncGetLeagues } from '../../services/leagueService'
import { useState, useMemo } from 'react'

type Player = {
  _id: string
  name: string
}

type LeaguePlayerRef = {
  _id: string
  name: string
}

type League = {
  _id: string
  name: string
  year: number
  leagueType: string
  champion?: LeaguePlayerRef | null
  runnerUp?: LeaguePlayerRef | null
  thirdPlace?: LeaguePlayerRef | null
  players?: LeaguePlayerRef[]
}

type PlayerStats = {
  totalLeagues: number
  totalTitles: number
  totalPodiums: number
  winRate: number
}

export default function H2HPage() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const [playerAId, setPlayerAId] = useState<string>('')
  const [playerBId, setPlayerBId] = useState<string>('')

  const {
    data: players,
    isLoading: isLoadingPlayers,
    isError: isErrorPlayers,
  } = useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: asyncGetPlayers,
  })

  const {
    data: leagues,
    isLoading: isLoadingLeagues,
    isError: isErrorLeagues,
  } = useQuery<League[]>({
    queryKey: ['leagues'],
    queryFn: asyncGetLeagues,
  })

  const playerA = useMemo(
    () => players?.find((p) => p._id === playerAId),
    [players, playerAId],
  )
  const playerB = useMemo(
    () => players?.find((p) => p._id === playerBId),
    [players, playerBId],
  )

  function getPlayerLeagues(playerId: string): League[] {
    if (!leagues) return []
    return (
      leagues.filter((league) =>
        league.players?.some((p) => p._id === playerId),
      ) ?? []
    )
  }

  function getPlayerStats(playerId: string): PlayerStats {
    const playerLeagues = getPlayerLeagues(playerId)

    const totalLeagues = playerLeagues.length

    const totalTitles = playerLeagues.filter(
      (league) => league.champion?._id === playerId,
    ).length

    const totalPodiums = playerLeagues.filter(
      (league) =>
        league.champion?._id === playerId ||
        league.runnerUp?._id === playerId ||
        league.thirdPlace?._id === playerId,
    ).length

    const winRate =
      totalLeagues > 0
        ? Math.round((totalTitles / totalLeagues) * 100)
        : 0

    return {
      totalLeagues,
      totalTitles,
      totalPodiums,
      winRate,
    }
  }

  const statsA = playerAId ? getPlayerStats(playerAId) : null
  const statsB = playerBId ? getPlayerStats(playerBId) : null

  const isLoading = isLoadingPlayers || isLoadingLeagues
  const isError = isErrorPlayers || isErrorLeagues

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  if (isError || !players || !leagues) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.300">
          Ocorreu um erro ao carregar os dados para o H2H.
        </Text>
      </Center>
    )
  }

  const hasBoth = !!playerA && !!playerB && !!statsA && !!statsB

  return (
    <Box p={8}>
      <Stack spacing={8}>
        <Heading>Head-to-Head</Heading>

        <Text color="gray.500">
          Compare dois jogadores e descubra quem leva vantagem nas ligas, títulos
          e pódios.
        </Text>

        {/* Seleção dos jogadores */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            p={6}
            borderWidth="1px"
            borderRadius="xl"
            borderColor={cardBorder}
            bg={cardBg}
          >
            <Heading fontSize="lg" mb={3}>
              Jogador A
            </Heading>

            <Select
              placeholder="Selecione o jogador"
              value={playerAId}
              onChange={(e) => setPlayerAId(e.target.value)}
            >
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box
            p={6}
            borderWidth="1px"
            borderRadius="xl"
            borderColor={cardBorder}
            bg={cardBg}
          >
            <Heading fontSize="lg" mb={3}>
              Jogador B
            </Heading>

            <Select
              placeholder="Selecione o jogador"
              value={playerBId}
              onChange={(e) => setPlayerBId(e.target.value)}
            >
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </Select>
          </Box>
        </SimpleGrid>

        {!hasBoth && (
          <Text color="gray.400" fontSize="sm">
            Selecione dois jogadores para ver o comparativo.
          </Text>
        )}

        {/* Comparativo estatístico */}
        {hasBoth && statsA && statsB && playerA && playerB && (
          <Box
            p={6}
            borderWidth="1px"
            borderRadius="xl"
            borderColor={cardBorder}
            bg={cardBg}
            boxShadow="sm"
          >
            <Heading fontSize="lg" mb={4}>
              Comparativo de estatísticas
            </Heading>

            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th textAlign="center">{playerA.name}</Th>
                  <Th textAlign="center">{playerB.name}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[
                  { key: 'totalLeagues', label: 'Ligas jogadas' },
                  { key: 'totalTitles', label: 'Títulos (campeão)' },
                  { key: 'totalPodiums', label: 'Pódios (🥇🥈🥉)' },
                  { key: 'winRate', label: 'Aproveitamento (%)' },
                ].map((metric) => {
                  const aVal = statsA[metric.key as keyof PlayerStats] as number
                  const bVal = statsB[metric.key as keyof PlayerStats] as number

                  const aIsBetter = aVal > bVal
                  const bIsBetter = bVal > aVal
                  const isEqual = aVal === bVal

                  const aColor = aIsBetter
                    ? 'green.400'
                    : bIsBetter
                    ? 'red.400'
                    : 'gray.300'

                  const bColor = bIsBetter
                    ? 'green.400'
                    : aIsBetter
                    ? 'red.400'
                    : 'gray.300'

                  const aBg = aIsBetter ? 'green.900Alpha' : 'transparent'
                  const bBg = bIsBetter ? 'green.900Alpha' : 'transparent'

                  return (
                    <Tr key={metric.key}>
                      <Td>
                        <Text fontSize="sm" color="gray.500">
                          {metric.label}
                        </Text>
                      </Td>
                      <Td textAlign="center">
                        <Text fontWeight="bold" color={aColor}>
                          {aVal}
                        </Text>
                      </Td>
                      <Td textAlign="center">
                        <Text fontWeight="bold" color={bColor}>
                          {bVal}
                        </Text>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
