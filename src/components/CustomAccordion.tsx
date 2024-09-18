import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

type AccordionSection = {
  title: string;
  content: React.ReactNode;
};

interface CustomAccordionProps {
  sections: AccordionSection[];
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ sections }) => {
  return (
    <Accordion allowToggle>
      {sections.map((section, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {section.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {section.content}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
