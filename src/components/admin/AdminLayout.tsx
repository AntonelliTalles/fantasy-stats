import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar'; 

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" p="4">
        {children}
      </Box>
    </Flex>
  );
};

export default AdminLayout;
