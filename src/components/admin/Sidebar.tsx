import { Box, Text,} from '@chakra-ui/react';
import { FaChartBar, FaHome, FaSignOutAlt, FaTrophy, FaUser } from 'react-icons/fa';
import { MenuItem } from './MenuItem';

const Sidebar = () => {
  return (
    <Box
      w="250px"
      bg="navy"
      color="white"
      minH="100vh"
      p="4"
      borderRight="1px solid #ccc"
    >
      <Text fontSize="2xl" mb="8" fontWeight="bold">
        Fantasy Stats
      </Text>
      <MenuItem title="Home" icon={<FaHome />} />
      <MenuItem title="Players" icon={<FaUser />} subItems={['Adicionar', 'Gerenciar']} />
      <MenuItem title="Ligas" icon={<FaTrophy />} subItems={['Adicionar', 'Gerenciar']} />
      <MenuItem
        title="Estatísticas"
        icon={<FaChartBar />}
        subItems={['Cadastrar títulos', 'Gerenciar títulos', 'Cadastrar recordes', 'Gerenciar recordes']}
      />
      <MenuItem title="Sair" icon={<FaSignOutAlt />} />
    </Box>
  );
};

export default Sidebar;
