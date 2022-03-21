import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const notFill = email === '' || password === ''

    const postLogin = async() =>{
        setError('')
        const user={
            password : password,
            email : email
        }
        const res = await fetch('http://127.0.0.1:8000/api/login',
        {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json' ,
                'credentials' : 'inlude'
            },
            body : JSON.stringify(user)
        })

        const data = await res.json()
        localStorage.setItem('token', data.token)
        if (data.message !== '')
            setError(data.message)
        else
          localStorage.setItem('token', data.token);
          //localStorageManager.setItem('token', data.token)
        console.log(data.message)
        console.log(data.token)
    }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={10} maxWidth="500px" borderWidth={2} borderRadius={8} boxShadow="lg">
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
                background='seagreen' 
                colorScheme='green' 
                variant="outline" 
                width="full" 
                mt={4}>
                Sign In
            </Button>
        </Box>
      </Box>
    </Flex>
    )   
}

export default Login
