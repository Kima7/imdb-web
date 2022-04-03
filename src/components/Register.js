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
import authService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [error, setError] = useState('');
  const notFill =
    name === '' || email === '' || password === '' || confirm_password === '';
  const navigate = useNavigate();

  const register = async () => {
    setError('');
    try {
      await authService.register({
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password,
      });
      alert('Successfuly registered!');
      navigate('/login');
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Flex justify={'center'} width="full">
      <Box p={10} borderWidth={2} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            {error !== '' && <ErrorMessage message={error} />}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
              />
            </FormControl>
            <FormControl mt={6} isRequired>
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
            <FormControl mt={6} isRequired>
              <FormLabel>Repeat password</FormLabel>
              <Input
                type="password"
                value={confirm_password}
                placeholder="*****"
                onChange={event =>
                  setConfirm_password(event.currentTarget.value)
                }
              />
            </FormControl>
          </form>
          <Button
            disabled={notFill}
            onClick={register}
            type="submit"
            background="seagreen"
            colorScheme="green"
            variant="outline"
            width="full"
            mt={4}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Register;
