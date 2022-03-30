import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import movieService from '../services/MovieService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const notFill = email === '' || password === '';
  const navigate = useNavigate();

  const postLogin = async () => {
    setError('');
    try {
      const data = await movieService.postLogin({
        email: email,
        password: password,
      });
      localStorage.setItem('token', data.token);
      alert('Successfuly logged in!');
      navigate('/movies');
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={10}
        maxWidth="500px"
        borderWidth={2}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            {error && <ErrorMessage message={error} />}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                placeholder="test@gmail.com"
                onChange={event => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                placeholder="*****"
                onChange={event => setPassword(event.currentTarget.value)}
              />
            </FormControl>
          </form>
          <Button
            disabled={notFill}
            onClick={postLogin}
            type="submit"
            background="seagreen"
            colorScheme="green"
            variant="outline"
            width="full"
            mt={4}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
