import React from 'react';
import { Box, Avatar, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack } from '@chakra-ui/react';

interface PlayerProfileProps {
  name: string;
  age: number;
  fantasyTeams: string[];
  details: string;
  achievements: string;
  recentPerformance: string;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ name, age, fantasyTeams, details, achievements, recentPerformance }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <VStack align="start" spacing={4}>
        <Box display="flex" alignItems="center">
          <Avatar size="xl" src="path/to/player-photo.jpg" name={name} />
          <Box ml={4}>
            <Heading as="h2" size="lg">{name}</Heading>
            <Text>Age: {age}</Text>
            <Text>Fantasies: {fantasyTeams.join(', ')}</Text>
          </Box>
        </Box>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Player Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {details}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Achievements
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {achievements}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Recent Performance
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {recentPerformance}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default PlayerProfile;
