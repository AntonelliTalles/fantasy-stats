import { Box, Flex, Text, Icon, Collapse, useDisclosure } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface SubItem {
  label: string;
  link: string;
}

interface MenuItemProps {
  title: string;
  icon: React.ReactElement;
  link?: string;
  subItems?: SubItem[];
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, icon, link, subItems }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box mb="4">
      <Flex
        align="center"
        cursor={subItems ? 'pointer' : 'default'}
        onClick={subItems ? onToggle : undefined}
        justify="space-between"
        _hover={{ bg: 'lightblue', color: 'navy', transition: 'background-color 0.3s ease, color 0.3s ease' }}
        p="2"
        borderRadius="md"
      >
        <Flex align="center" w="full">
          {link ? (
            <Link to={link} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Icon as={() => icon} boxSize="6" />
              <Text ml="4">{title}</Text>
            </Link>
          ) : (
            <>
              <Icon as={() => icon} boxSize="6" />
              <Text ml="4">{title}</Text>
            </>
          )}
        </Flex>
        {subItems && <Icon as={isOpen ? FaChevronUp : FaChevronDown} />}
      </Flex>

      {subItems && (
        <Collapse in={isOpen}>
          <Box pl="8" mt="2">
            {subItems.map((item, index) => (
              <Box
                key={index}
                as={Link}
                to={item.link}
                display="block"
                p="2"
                mb="2"
                borderRadius="md"
                _hover={{ bg: 'lightblue', color: 'navy', transition: 'background-color 0.3s ease, color 0.3s ease' }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};
