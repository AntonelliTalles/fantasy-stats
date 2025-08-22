import { Box, SimpleGrid, Text, VStack, Icon } from "@chakra-ui/react";
import { FaTrophy, FaUsers, FaChartLine } from "react-icons/fa";

const features = [
  { icon: FaTrophy, title: "Achievements", desc: "Track your league wins and milestones." },
  { icon: FaUsers, title: "H2H Battles", desc: "Compare players and compete head-to-head." },
  { icon: FaChartLine, title: "Statistics", desc: "View performance trends over time." }
];

export default function FeaturesSection() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} py={16} px={8}>
      {features.map((feature, idx) => (
        <VStack key={idx} bg="white" p={6} shadow="md" borderRadius="md" spacing={4}>
          <Icon as={feature.icon} w={12} h={12} color="green.500" />
          <Text fontWeight="bold" fontSize="lg">{feature.title}</Text>
          <Text fontSize="sm" color="gray.600">{feature.desc}</Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
}
