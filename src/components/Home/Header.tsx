import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box bg="white" shadow="sm" px={8} py={4}>
      <Flex align="center" justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Logo
        </Text>
        <HStack spacing={8}>
          <Link href="#stats" fontWeight="medium">Stats</Link>
          <Link href="#h2h" fontWeight="medium">H2H</Link>
          <Link href="#standings" fontWeight="medium">Standings</Link>
        </HStack>
      </Flex>
    </Box>
  );
}
