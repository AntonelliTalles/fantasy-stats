import { Box, Text, Flex, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.100" py={6} mt={16}>
      <Flex justify="space-between" px={8} align="center">
        <Text>© 2025 Fantasy Stats</Text>
        <Flex gap={4}>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Contact</Link>
        </Flex>
      </Flex>
    </Box>
  );
}
