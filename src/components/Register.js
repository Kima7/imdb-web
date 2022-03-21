
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

const Register = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirm_password] = useState('')
    const [error, setError] = useState('');
    const notFill = name === '' || email === '' || password === '' || confirm_password === ''

    const postRegister = async(e) =>{
        e.preventDefault();
        const user={
            name : name,
            password : password,
            email : email,
            confirm_password : confirm_password
        }
        try{
            setError('')
            const res = await fetch('http://127.0.0.1:8000/api/register',
            {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
            const data = await res.json()

            if(data.error !== '')
                setError('Password not repeated right.')
            }
        catch{
            setError('Email already in use,try again.')
        }
        
    }
    
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={10} maxWidth="500px" borderWidth={2} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
        <form>
        {error && <ErrorMessage message={error} />}
        <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                type='text' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder='name'
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
                onChange={event => setConfirm_password(event.currentTarget.value)}
                />
            </FormControl>
            </form>
            <Button 
                disabled={notFill}
                onClick={postRegister}
                type="submit" 
                background='seagreen' 
                colorScheme='green' 
                variant="outline" 
                width="full" 
                mt={4}>
                Submit
            </Button>
        </Box>
      </Box>
    </Flex>
    )   
}

export default Register
