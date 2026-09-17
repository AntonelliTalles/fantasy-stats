import React, { useEffect, useMemo, useState } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

interface Player {
  _id: string
  name: string
}

interface League {
  _id: string
  name: string
}

interface PlayerHistory {
  _id: string

  league: League
  player: Player

  regularWins: number
  regularLosses: number
  regularTies?: number

  playoffsWins: number
  playoffsLosses: number

  pointsScored: number
  pointsConceded: number
  pointDifference: number

  finalPosition: number
  seasonYear: number
}

type SortOption =
  | 'finalPosition'
  | 'pointsScored'
  | 'pointsConceded'
  | 'pointDifference'
  | 'regularWins'
  | 'playoffsWins'

interface Props {
  leagueId: string
}

export default function LeagueStandingsTable({ leagueId }: Props) {
  const navigate = useNavigate()

  const [histories, setHistories] = useState<PlayerHistory[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('finalPosition')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const headerBg = useColorModeValue('gray.50', 'gray.700')
  const rowHoverBg = useColorModeValue('gray.50', 'gray.700')

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setIsLoading(true)
        setIsError(false)

        const response = await api.get('/player-history')

        const leagueHistories = response.data.filter(
          (history: PlayerHistory) => history.league?._id === leagueId
        )

        setHistories(leagueHistories)
      } catch (error) {
        console.error('Erro ao buscar classificação da liga:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistories()
  }, [leagueId])

  const bestAttack = useMemo(() => {
    if (!histories.length) return null

    return Math.max(
      ...histories.map((history) => history.pointsScored ?? 0)
    )
  }, [histories])

  const bestDefense = useMemo(() => {
    if (!histories.length) return null

    return Math.min(
      ...histories.map((history) => history.pointsConceded ?? 0)
    )
  }, [histories])

  const bestPointDifference = useMemo(() => {
    if (!histories.length) return null

    return Math.max(
      ...histories.map((history) => history.pointDifference ?? 0)
    )
  }, [histories])

  const sortedHistories = useMemo(() => {
    return [...histories].sort((a, b) => {
      switch (sortBy) {
        case 'finalPosition':
          return (a.finalPosition ?? 999) - (b.finalPosition ?? 999)

        case 'pointsScored':
          return (b.pointsScored ?? 0) - (a.pointsScored ?? 0)

        case 'pointsConceded':
          return (a.pointsConceded ?? 0) - (b.pointsConceded ?? 0)

        case 'pointDifference':
          return (b.pointDifference ?? 0) - (a.pointDifference ?? 0)

        case 'regularWins':
          return (b.regularWins ?? 0) - (a.regularWins ?? 0)

        case 'playoffsWins':
          return (b.playoffsWins ?? 0) - (a.playoffsWins ?? 0)

        default:
          return 0
      }
    })
  }, [histories, sortBy])

  const getPositionBadge = (position: number) => {
    if (position === 1) {
      return (
        <Badge colorScheme="yellow" borderRadius="full" px={3}>
          🥇 1º
        </Badge>
      )
    }

    if (position === 2) {
      return (
        <Badge colorScheme="gray" borderRadius="full" px={3}>
          🥈 2º
        </Badge>
      )
    }

    if (position === 3) {
      return (
        <Badge colorScheme="orange" borderRadius="full" px={3}>
          🥉 3º
        </Badge>
      )
    }

    return (
      <Badge variant="subtle" borderRadius="full" px={3}>
        {position}º
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <Flex justify="center" py={12}>
        <Spinner size="lg" color="green.500" />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="xl"
        borderColor={cardBorder}
        bg={cardBg}
      >
        <Text color="red.400">
          Não foi possível carregar a classificação desta liga.
        </Text>
      </Box>
    )
  }

  if (!histories.length) {
    return (
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="xl"
        borderColor={cardBorder}
        bg={cardBg}
      >
        <Heading fontSize="xl" mb={2}>
          Classificação da Temporada
        </Heading>

        <Text color="gray.500">
          Ainda não existem históricos cadastrados para esta liga.
        </Text>
      </Box>
    )
  }

  return (
    <Box
      p={{ base: 4, md: 6 }}
      borderWidth="1px"
      borderRadius="xl"
      borderColor={cardBorder}
      bg={cardBg}
      boxShadow="sm"
    >
      <Flex
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        mb={6}
      >
        <Box>
          <Heading fontSize="xl">
            Classificação da Temporada
          </Heading>

          <Text color="gray.500" fontSize="sm" mt={1}>
            Compare campanhas, playoffs e pontuações dos participantes.
          </Text>
        </Box>

        <Box minW={{ base: '100%', md: '240px' }}>
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="gray.500"
            mb={1}
            textTransform="uppercase"
          >
            Ordenar por
          </Text>

          <Select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
          >
            <option value="finalPosition">Posição final</option>
            <option value="pointsScored">Pontos marcados</option>
            <option value="pointsConceded">Pontos sofridos</option>
            <option value="pointDifference">Saldo de pontos</option>
            <option value="regularWins">Vitórias na fase regular</option>
            <option value="playoffsWins">Vitórias nos playoffs</option>
          </Select>
        </Box>
      </Flex>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead bg={headerBg}>
            <Tr>
              <Th>Pos.</Th>
              <Th>Jogador</Th>
              <Th isNumeric>Regular</Th>
              <Th isNumeric>Playoffs</Th>
              <Th isNumeric>PF</Th>
              <Th isNumeric>PS</Th>
              <Th isNumeric>Saldo</Th>
            </Tr>
          </Thead>

          <Tbody>
            {sortedHistories.map((history) => {
              const isBestAttack =
                history.pointsScored === bestAttack

              const isBestDefense =
                history.pointsConceded === bestDefense

              const isBestDifference =
                history.pointDifference === bestPointDifference

              return (
                <Tr
                  key={history._id}
                  transition="background 0.2s ease"
                  _hover={{ bg: rowHoverBg }}
                >
                  <Td>
                    {getPositionBadge(history.finalPosition)}
                  </Td>

                  <Td>
                    <HStack
                      spacing={3}
                      cursor="pointer"
                      onClick={() =>
                        navigate(`/profile/${history.player._id}`)
                      }
                    >
                      <Avatar
                        size="sm"
                        name={history.player.name}
                        bg="blue.500"
                      />

                      <Box>
                        <Text
                          fontWeight="bold"
                          _hover={{ textDecoration: 'underline' }}
                        >
                          {history.player.name}
                        </Text>

                        <HStack
                          spacing={1}
                          mt={1}
                          flexWrap="wrap"
                        >
                          {isBestAttack && (
                            <Badge
                              colorScheme="green"
                              fontSize="9px"
                            >
                              Melhor ataque
                            </Badge>
                          )}

                          {isBestDefense && (
                            <Badge
                              colorScheme="blue"
                              fontSize="9px"
                            >
                              Melhor defesa
                            </Badge>
                          )}

                          {isBestDifference && (
                            <Badge
                              colorScheme="purple"
                              fontSize="9px"
                            >
                              Melhor saldo
                            </Badge>
                          )}
                        </HStack>
                      </Box>
                    </HStack>
                  </Td>

                  <Td isNumeric>
                    <Text fontWeight="semibold">
                      {history.regularWins ?? 0}
                      {'-'}
                      {history.regularLosses ?? 0}
                      {history.regularTies
                        ? `-${history.regularTies}`
                        : ''}
                    </Text>
                  </Td>

                  <Td isNumeric>
                    <Text fontWeight="semibold">
                      {history.playoffsWins ?? 0}
                      {'-'}
                      {history.playoffsLosses ?? 0}
                    </Text>
                  </Td>

                  <Td isNumeric>
                    <HStack justify="flex-end" spacing={2}>
                      <Text>{history.pointsScored ?? 0}</Text>

                      {isBestAttack && (
                        <Text title="Melhor ataque">
                          🔥
                        </Text>
                      )}
                    </HStack>
                  </Td>

                  <Td isNumeric>
                    <HStack justify="flex-end" spacing={2}>
                      <Text>{history.pointsConceded ?? 0}</Text>

                      {isBestDefense && (
                        <Text title="Melhor defesa">
                          🛡️
                        </Text>
                      )}
                    </HStack>
                  </Td>

                  <Td isNumeric>
                    <Text
                      fontWeight="bold"
                      color={
                        history.pointDifference > 0
                          ? 'green.500'
                          : history.pointDifference < 0
                          ? 'red.500'
                          : 'gray.500'
                      }
                    >
                      {history.pointDifference > 0 ? '+' : ''}
                      {history.pointDifference ?? 0}
                    </Text>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>

      <Text
        mt={4}
        fontSize="xs"
        color="gray.500"
      >
        PF = pontos marcados • PS = pontos sofridos
      </Text>
    </Box>
  )
}