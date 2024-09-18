import { Box, Flex, Text, Icon, Collapse, useDisclosure } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface MenuItemProps {
  title: string;
  icon: React.ReactElement;
  subItems?: string[];
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, icon, subItems }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box mb="4">

      <Flex
        align="center"
        cursor="pointer"
        onClick={onToggle}
        justify="space-between"
        _hover={{ bg: 'lightblue', color: 'navy', transition: 'background-color 0.3s ease, color 0.3s ease' }} // Hover e transição suave
        p="2"
        borderRadius="md"
      >
        <Flex align="center">
          {icon}
          <Text ml="4">{title}</Text>
        </Flex>
        {subItems && (
          <Icon as={isOpen ? FaChevronUp : FaChevronDown} />
        )}
      </Flex>

      {subItems && (
        <Collapse in={isOpen}>
          <Box pl="8" mt="2">
            {subItems.map((item, index) => (
              <Text
                key={index}
                mb="2"
                cursor="pointer"
                _hover={{
                  bg: 'lightblue', 
                  color: 'navy', 
                  transition: 'background-color 0.3s ease, color 0.3s ease' 
                }}
                p="2"
                borderRadius="md" 
              >
                {item}
              </Text>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};
