import { useMemo, useState } from 'react'
import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Stack,
  Badge,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Tfoot,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { League, LeagueModality } from '../../types/league'
import { asyncGetLeagues } from '../../services/leagueService'
import { useNavigate } from 'react-router-dom'

const modalities: LeagueModality[] = ['NFL', 'NBA', 'MLB']

export default function LeaguesViewPage() {
  const [selectedModality, setSelectedModality] = useState<LeagueModality>('NFL')
  const navigate = useNavigate()

  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const rowHoverBg = useColorModeValue('gray.50', 'gray.700')

  // Busca todas as ligas do backend
  const {
    data: leagues,
    isLoading,
    isError,
  } = useQuery<League[]>({
    queryKey: ['leagues'],
    queryFn: asyncGetLeagues,
  })

  // Filtra por modalidade selecionada
  const leaguesByModality: League[] = useMemo(() => {
    if (!leagues) return []
    return leagues.filter((league) => league.leagueType === selectedModality)
  }, [leagues, selectedModality])

  return (
    <Box w="100%" h="100%" p={8}>
      <Stack spacing={6}>
        <Box>
          <Heading fontSize="2xl">Ligas cadastradas</Heading>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Selecione uma modalidade para visualizar as ligas disponíveis e depois
            escolher uma para ver os detalhes.
          </Text>
        </Box>

        {/* Selector de modalidade */}
        <Box
          borderWidth="1px"
          borderRadius="xl"
          borderColor={cardBorder}
          bg={cardBg}
          p={4}
          boxShadow="sm"
        >
          <HStack justify="space-between" mb={3}>
            <Text fontWeight="medium">Modalidade</Text>
            <Badge colorScheme="blue" variant="subtle">
              {selectedModality}
            </Badge>
          </HStack>

          <HStack spacing={3}>
            {modalities.map((modality) => {
              const isActive = selectedModality === modality
              return (
                <Button
                  key={modality}
                  size="sm"
                  variant={isActive ? 'solid' : 'outline'}
                  colorScheme="blue"
                  borderRadius="full"
                  onClick={() => setSelectedModality(modality)}
                  _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
                  transition="all 0.15s ease-out"
                >
                  {modality}
                </Button>
              )
            })}
          </HStack>
        </Box>

        {/* Tabela de ligas */}
        <Box
          borderWidth="1px"
          borderRadius="xl"
          borderColor={cardBorder}
          bg={cardBg}
          p={6}
          boxShadow="sm"
          minH="200px"
        >
          {isLoading && (
            <Center py={10}>
              <Spinner />
            </Center>
          )}

          {isError && !isLoading && (
            <Text fontSize="sm" color="red.400">
              Ocorreu um erro ao carregar as ligas. Tente novamente mais tarde.
            </Text>
          )}

          {!isLoading && !isError && leaguesByModality.length === 0 && (
            <Text fontSize="sm" color="gray.500">
              Ainda não há ligas cadastradas para <b>{selectedModality}</b>.
            </Text>
          )}

          {!isLoading && !isError && leaguesByModality.length > 0 && (
            <>
              <HStack justify="space-between" mb={4}>
                <Text fontWeight="medium">Ligas de {selectedModality}</Text>
                <Tag colorScheme="blue" variant="subtle">
                  {leaguesByModality.length} liga(s)
                </Tag>
              </HStack>

              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th isNumeric>Times</Th>
                    <Th>Plataforma</Th>
                    <Th isNumeric>Ano</Th>
                    <Th>Campeão</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {leaguesByModality.map((league) => (
                    <Tr
                      key={league._id}
                      _hover={{
                        bg: rowHoverBg,
                        cursor: 'pointer',
                        transform: 'translateY(-1px)',
                      }}
                      transition="all 0.15s ease-out"
                      onClick={() => navigate(`/view-league/${league._id}`)}
                    >
                      <Td>{league.name}</Td>
                      <Td isNumeric>{league.teamCount}</Td>
                      <Td>{league.platform}</Td>
                      <Td isNumeric>{league.year}</Td>
                      <Td>{league.champion?.name ?? '-'}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  )
}