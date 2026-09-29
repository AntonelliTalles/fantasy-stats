import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../components/Auth/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError('');

      await login({
        email,
        password,
      });

      navigate('/admin', {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError(
        'E-mail ou senha inválidos.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg="white"
        w="100%"
        maxW="420px"
        p={8}
        borderRadius="2xl"
        boxShadow="lg"
      >
        <VStack
          spacing={6}
          align="stretch"
        >
          <Box>
            <Heading size="lg">
              Fantasy Stats
            </Heading>

            <Text
              color="gray.500"
              mt={2}
            >
              Administração
            </Text>
          </Box>

          {error && (
            <Alert
              status="error"
              borderRadius="lg"
            >
              <AlertIcon />

              {error}
            </Alert>
          )}

          <FormControl isRequired>
            <FormLabel>
              E-mail
            </FormLabel>

            <Input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>
              Senha
            </FormLabel>

            <Input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            size="lg"
            isLoading={isLoading}
            loadingText="Entrando"
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;