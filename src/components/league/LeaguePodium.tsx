import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import { LeaguePlayerRef } from '../../types/league'
import { MotionBox } from '../motion/MotionBox'

interface Props {
  champion?: LeaguePlayerRef | null
  runnerUp?: LeaguePlayerRef | null
  thirdPlace?: LeaguePlayerRef | null
}

export default function LeaguePodium({ champion, runnerUp, thirdPlace }: Props) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')

  return (
    <MotionBox
      as={HStack}
      w="100%"
      spacing={6}
      justify="center"
      align="flex-end"
      p={6}
      borderWidth="1px"
      borderRadius="xl"
      borderColor={cardBorder}
      bg={cardBg}
      boxShadow="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Segundo lugar */}
      <MotionBox
        as={VStack}
        spacing={3}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.04 }}
      >
        <Avatar size="lg" bg="gray.400" />
        <Text fontWeight="bold" color="gray.300">
          🥈 {runnerUp?.name ?? '-'}
        </Text>
        <Box
          w="60px"
          h="30px"
          bg="gray.400"
          borderRadius="md"
          boxShadow="md"
        />
      </MotionBox>

      {/* Primeiro lugar – destaque maior */}
      <MotionBox
        as={VStack}
        spacing={3}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -10 }}
        whileHover={{ scale: 1.08 }}
      >
        <Avatar size="xl" bg="yellow.400" />
        <Text fontWeight="bold" color="yellow.500">
          🥇 {champion?.name ?? '-'}
        </Text>
        <Box
          w="70px"
          h="40px"
          bg="yellow.400"
          borderRadius="md"
          boxShadow="lg"
        />
      </MotionBox>

      {/* Terceiro lugar */}
      <MotionBox
        as={VStack}
        spacing={3}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.04 }}
      >
        <Avatar size="lg" bg="orange.500" />
        <Text fontWeight="bold" color="orange.400">
          🥉 {thirdPlace?.name ?? '-'}
        </Text>
        <Box
          w="60px"
          h="30px"
          bg="orange.500"
          borderRadius="md"
          boxShadow="md"
        />
      </MotionBox>
    </MotionBox>
  )
}
