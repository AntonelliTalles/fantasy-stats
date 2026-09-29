import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';

const AdminLayout: React.FC = () => {
  return (
    <Flex minH="100vh">
      <Sidebar />

      <Box
        flex="1"
        p="4"
        minW="0"
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminLayout;