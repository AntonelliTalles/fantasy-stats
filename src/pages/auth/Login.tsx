import { useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../../services/authService'; // Importando o service

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    {
      onSuccess: (data) => {
        console.log('Login successful:', data);
        // Adicione qualquer lógica adicional aqui, como redirecionamento
      },
      onError: (error: any) => {
        console.error('Login error:', error.message);
        // Mostre uma mensagem de erro, se necessário
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {mutation.isLoading && <p>Loading...</p>}
      {mutation.isError && <p>Error: {(mutation.error as any).message}</p>}
      {mutation.isSuccess && <p>Login successful!</p>}
    </form>
  );
};

export default Login;
