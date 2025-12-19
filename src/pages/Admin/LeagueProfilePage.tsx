import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Stack,
  useColorModeValue,
  HStack,
  SimpleGrid,
  Avatar,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { asyncGetLeagues } from '../../services/leagueService'
import { League } from '../../types/league'
import LeaguePodium from '../../components/league/LeaguePodium'
import { MotionBox } from '../../components/motion/MotionBox'

export default function LeagueProfilePage() {
  const { leagueId } = useParams<{ leagueId: string }>()

  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const playersItemBg = useColorModeValue('gray.50', 'gray.700')

  const navigate = useNavigate()

  const {
    data: leagues,
    isLoading,
    isError,
  } = useQuery<League[]>({
    queryKey: ['leagues'],
    queryFn: asyncGetLeagues,
  })

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  if (isError || !leagues) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.300">
          Ocorreu um erro ao carregar as ligas.
        </Text>
      </Center>
    )
  }

  const league = leagues.find((l) => l._id === leagueId)

  if (!league) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.300">
          Liga não encontrada.
        </Text>
      </Center>
    )
  }

  const teamsCount = (league as any).teamsQuantity ?? (league as any).teamCount

  return (
    <MotionBox
      p={8}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Stack spacing={6}>
        <MotionBox
          w="100%"
          p={6}
          borderRadius="xl"
          bgGradient={
            league.leagueType === 'NFL'
              ? 'linear(to-r, blue.600, orange.400)'
              : league.leagueType === 'NBA'
              ? 'linear(to-r, red.500, blue.600)'
              : 'linear(to-r, red.600, gray.800)'
          }
          boxShadow="lg"
          color="white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Heading fontSize="3xl" mb={2}>
            {league.name}
          </Heading>

          <HStack spacing={4} flexWrap="wrap">
            <Text fontSize="md" opacity={0.9}>
              📅 {league.year}
            </Text>
            <Text fontSize="md" opacity={0.9}>
              👥 {teamsCount} times
            </Text>
            <Text fontSize="md" opacity={0.9}>
              🏟 Plataforma: {league.platform}
            </Text>
            <Box
              bg="blackAlpha.700"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              boxShadow="inset 0 0 6px rgba(0,0,0,0.2)"
            >
              {league.leagueType}
            </Box>
          </HStack>
        </MotionBox>

        <MotionBox
          mt={4}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <LeaguePodium
            champion={league.champion}
            runnerUp={league.runnerUp}
            thirdPlace={league.thirdPlace}
          />
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={4}>
          {[
            { label: 'Modalidade', value: league.leagueType },
            { label: 'Plataforma', value: league.platform },
            { label: 'Total de jogadores', value: league.players?.length ?? 0 },
          ].map((card, idx) => (
            <MotionBox
              key={idx}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              bg={cardBg}
              borderColor={cardBorder}
              boxShadow="sm"
              whileHover={{ scale: 1.03, boxShadow: 'md' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Text fontSize="sm" color="gray.500">
                {card.label}
              </Text>
              <Text fontWeight="bold">{card.value}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>

        <MotionBox
          mt={8}
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          borderColor={cardBorder}
          bg={cardBg}
          boxShadow="sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Heading fontSize="xl" mb={4}>
            Jogadores da Liga
          </Heading>

          {league.players && league.players.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
              {league.players.map((player, index) => (
                <MotionBox
                  key={player._id}
                  p={3}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={cardBorder}
                  bg={playersItemBg}
                  cursor="pointer"
                  whileHover={{ scale: 1.03 }}
                  _hover={{
                    boxShadow: 'md',
                    bg: useColorModeValue('gray.100', 'gray.600'),
                  }}
                  onClick={() => navigate(`/profile/${player._id}`)}
                >
                  <HStack>
                    <Avatar name={player.name} bg="blue.500" />
                    <Text fontWeight="bold" flex={1}>
                      {index + 1}º — {player.name}
                    </Text>
                  </HStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          ) : (
            <Text color="gray.500">
              Nenhum jogador cadastrado para esta liga.
            </Text>
          )}
        </MotionBox>
      </Stack>
    </MotionBox>
  )
}
