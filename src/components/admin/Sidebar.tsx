import { Box } from '@chakra-ui/react';

import {
  FaChartBar,
  FaHome,
  FaSignOutAlt,
  FaTrophy,
  FaUser,
} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import { MenuItem } from './MenuItem';
import { useAuth } from '../Auth/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <Box
      w="250px"
      bg="navy"
      color="white"
      minH="100vh"
      p="4"
      borderRight="1px solid #ccc"
    >
      <Box
        mb="8"
        display="flex"
        justifyContent="center"
        alignItems="center"
      />

      <MenuItem
        title="Home"
        icon={<FaHome />}
        link="/admin"
      />

      <MenuItem
        title="Players"
        icon={<FaUser />}
        subItems={[
          {
            label: 'Adicionar',
            link: '/admin/players/add',
          },
          {
            label: 'Gerenciar',
            link: '/admin/players/manage',
          },
        ]}
      />

      <MenuItem
        title="Ligas"
        icon={<FaTrophy />}
        subItems={[
          {
            label: 'Adicionar',
            link: '/admin/leagues/add',
          },
          {
            label: 'Gerenciar',
            link: '/admin/leagues/manage',
          },
        ]}
      />

      <MenuItem
        title="Estatísticas"
        icon={<FaChartBar />}
        subItems={[
          {
            label:
              'Cadastrar Confrontos Diretos',
            link:
              '/admin/HeadToHead/add-h2h',
          },
          {
            label:
              'Gerenciar Confrontos Diretos',
            link:
              '/admin/HeadToHead/manage-h2h',
          },
          {
            label:
              'Adicionar Histórico de temporada',
            link:
              '/admin/PlayerHistory/player-history',
          },
          {
            label:
              'Gerenciar Histórico de temporada',
            link:
              '/admin/PlayerHistory/manage-player-history',
          },
        ]}
      />

      <MenuItem
        title="Sair"
        icon={<FaSignOutAlt />}
        onClick={handleLogout}
      />
    </Box>
  );
};

export default Sidebar;