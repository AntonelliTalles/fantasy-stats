import React from 'react';
import { Flex } from '@chakra-ui/react';
import Sidebar from '../../components/admin/Sidebar';

const AdminDashboard = () => {
  return (
    <Flex>
      <Sidebar />
      <Flex flex="1" p="4" bg="gray.100">
        <h1>Bem-vindo ao Dashboard Admin</h1>
      </Flex>
    </Flex>
  );
};

export default AdminDashboard;
