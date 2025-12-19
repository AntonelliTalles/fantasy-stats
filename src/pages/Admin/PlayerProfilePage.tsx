import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { asyncGetPlayers } from '../../services/playerService'
import { asyncGetLeagues } from '../../services/leagueService'
import { League } from '../../types/league'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)


type Player = {
  _id: string
  name: string
  favoriteTeams?: string[]
  leagueTypes?: string[]
  titlesWon?: string[]
}

export default function PlayerProfilePage() {
  const { playerId } = useParams<{ playerId: string }>()

  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const navigate = useNavigate()

  const { data: players, isLoading, isError } = useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: asyncGetPlayers,
  })
  const {
    data: leagues,
    isLoading: isLoadingLeagues,
  } = useQuery<League[]>({
    queryKey: ['leagues'],
    queryFn: asyncGetLeagues,
  })

  const player = useMemo(
    () => players?.find((p) => p._id === playerId),
    [players, playerId],
  )

  const playerLeagues = leagues?.filter((league) =>
    league.players?.some((p) => p._id === playerId)
  )

  const totalLeagues = playerLeagues?.length ?? 0

  const totalTitles =
    playerLeagues?.filter(
      (league) => league.champion?._id === playerId
    ).length ?? 0

  const totalPodiums =
    playerLeagues?.filter(
      (league) =>
        league.champion?._id === playerId ||
        league.runnerUp?._id === playerId ||
        league.thirdPlace?._id === playerId
    ).length ?? 0

  const winRate =
    totalLeagues > 0
      ? Math.round((totalTitles / totalLeagues) * 100)
      : 0

  const championsCount =
    playerLeagues?.filter((l) => l.champion?._id === playerId).length ?? 0

  const runnerUpCount =
    playerLeagues?.filter((l) => l.runnerUp?._id === playerId).length ?? 0

  const thirdPlaceCount =
    playerLeagues?.filter((l) => l.thirdPlace?._id === playerId).length ?? 0

  const modalityCounts = playerLeagues?.reduce(
  (acc, league) => {
    const type = league.leagueType
      if (type === 'NFL') acc.NFL += 1
      if (type === 'NBA') acc.NBA += 1
      if (type === 'MLB') acc.MLB += 1
      return acc
    },
    { NFL: 0, NBA: 0, MLB: 0 }
  ) ?? { NFL: 0, NBA: 0, MLB: 0 }

  const modalityChartData = {
    labels: ['NFL', 'NBA', 'MLB'],
    datasets: [
      {
        data: [modalityCounts.NFL, modalityCounts.NBA, modalityCounts.MLB],
        backgroundColor: ['#3182CE', '#E53E3E', '#2F855A'],
        borderWidth: 0,
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '65%',
  }

  const chartData = {
    labels: ['Campeão 🥇', 'Vice 🥈', 'Terceiro 🥉'],
    datasets: [
      {
        label: 'Posições',
        data: [championsCount, runnerUpCount, thirdPlaceCount],
        backgroundColor: ['#ECC94B', '#A0AEC0', '#ED8936'],
        borderRadius: 6,
      },
    ],
  }
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Desempenho em Ligas',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  function getPlayerPosition(league: League, playerId: string) {
    if (league.champion?._id === playerId) return '🥇 Campeão'
    if (league.runnerUp?._id === playerId) return '🥈 Vice'
    if (league.thirdPlace?._id === playerId) return '🥉 Terceiro'
    return 'Participante'
  }


  if (isLoading || isLoadingLeagues) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  if (isError || !players) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.300">
          Ocorreu um erro ao carregar os jogadores.
        </Text>
      </Center>
    )
  }

  if (!player) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.300">
          Jogador não encontrado.
        </Text>
      </Center>
    )
  }

  return (
    <>
    <Box p={8}>
      <Stack spacing={6}>
        {/* Header do Jogador */}
        <Box
          w="100%"
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={cardBorder}
          bg={cardBg}
          boxShadow="lg"
        >
          <HStack spacing={5} align="center" flexWrap="wrap">
            <Avatar size="xl" name={player.name} bg="blue.500" />

            <Box>
              <Heading fontSize="3xl" lineHeight="1.1">
                {player.name}
              </Heading>

              <HStack spacing={2} mt={2} flexWrap="wrap">
                <Badge colorScheme="blue" variant="subtle">
                  Player Profile
                </Badge>

                {(player.leagueTypes ?? []).map((t) => (
                  <Tag key={t} colorScheme="purple" variant="subtle">
                    {t}
                  </Tag>
                ))}
              </HStack>
            </Box>
          </HStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Ligas jogadas
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {totalLeagues}
            </Text>
          </Box>

          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Títulos
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
              🏆 {totalTitles}
            </Text>
          </Box>

          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Pódios
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              🥇🥈🥉 {totalPodiums}
            </Text>
          </Box>

          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Aproveitamento
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={winRate >= 50 ? 'green.400' : 'orange.400'}
            >
              {winRate}%
            </Text>
          </Box>
        </SimpleGrid>

        {/* Cards rápidos */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Times favoritos
            </Text>
            <Text fontWeight="bold">{player.favoriteTeams?.length ?? 0}</Text>
          </Box>

          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Modalidades
            </Text>
            <Text fontWeight="bold">{player.leagueTypes?.length ?? 0}</Text>
          </Box>

          <Box
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            borderColor={cardBorder}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Títulos registrados
            </Text>
            <Text fontWeight="bold">{player.titlesWon?.length ?? 0}</Text>
          </Box>
        </SimpleGrid>

        {/* Seções (por enquanto simples) */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            p={6}
            borderWidth="1px"
            borderRadius="xl"
            borderColor={cardBorder}
            bg={cardBg}
            boxShadow="sm"
          >
            <Heading fontSize="lg" mb={4}>
              Times que torce
            </Heading>

            {(player.favoriteTeams ?? []).length > 0 ? (
              <HStack spacing={2} flexWrap="wrap">
                {player.favoriteTeams!.map((team) => (
                  <Tag key={team} colorScheme="blue" variant="subtle">
                    {team}
                  </Tag>
                ))}
              </HStack>
            ) : (
              <Text color="gray.500">Nenhum time cadastrado.</Text>
            )}
          </Box>

          <Box
            p={6}
            borderWidth="1px"
            borderRadius="xl"
            borderColor={cardBorder}
            bg={cardBg}
            boxShadow="sm"
          >
            <Heading fontSize="lg" mb={4}>
              Títulos conquistados
            </Heading>

            {(player.titlesWon ?? []).length > 0 ? (
              <HStack spacing={2} flexWrap="wrap">
                {player.titlesWon!.map((title) => (
                  <Tag key={title} colorScheme="yellow" variant="subtle">
                    🏆 {title}
                  </Tag>
                ))}
              </HStack>
            ) : (
              <Text color="gray.500">Nenhum título cadastrado.</Text>
            )}
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
      {/* Gráfico 1: Pódios */}
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="xl"
        borderColor={cardBorder}
        bg={cardBg}
        boxShadow="sm"
      >
        <Heading fontSize="lg" mb={4}>
          Desempenho em Ligas
        </Heading>

        {totalLeagues > 0 ? (
          <Box h="260px">
            <Bar data={chartData} options={chartOptions} />
          </Box>
        ) : (
          <Text color="gray.500">Não há dados suficientes para gerar o gráfico.</Text>
        )}
      </Box>

      {/* Gráfico 2: Modalidade */}
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="xl"
        borderColor={cardBorder}
        bg={cardBg}
        boxShadow="sm"
      >
        <Heading fontSize="lg" mb={4}>
          Por modalidade
        </Heading>

        {totalLeagues > 0 ? (
          <Box h="260px">
            <Doughnut data={modalityChartData} options={doughnutOptions} />
          </Box>
        ) : (
          <Text color="gray.500">Não há dados suficientes para gerar o gráfico.</Text>
        )}
      </Box>
    </SimpleGrid>

    <Box
      p={6}
      borderWidth="1px"
      borderRadius="xl"
      borderColor={cardBorder}
      bg={cardBg}
      boxShadow="sm"
    >
      <Heading fontSize="lg" mb={4}>
        Ligas que participou
      </Heading>

      {playerLeagues && playerLeagues.length > 0 ? (
        <Stack spacing={4}>
          {playerLeagues.map((league) => (
            <Box
              key={league._id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              borderColor={cardBorder}
              cursor="pointer"
              _hover={{
                boxShadow: 'md',
                bg: useColorModeValue('gray.100', 'gray.700'),
              }}
              onClick={() => navigate(`/view-league/${league._id}`)}
            >

              <HStack justify="space-between" flexWrap="wrap">
                <Box>
                  <Text fontWeight="bold">{league.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {league.leagueType} • {league.year}
                  </Text>
                </Box>

                <Text fontWeight="bold">
                  {getPlayerPosition(league, player._id)}
                </Text>
              </HStack>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text color="gray.500">
          Este jogador ainda não participou de nenhuma liga.
        </Text>
      )}
    </Box>

    </>
  )
}
