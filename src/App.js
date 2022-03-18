
import {
  ChakraProvider,
  Box,
  theme,
  Center
} from '@chakra-ui/react';

import  MyButton  from './components/MyButton'
import LogoHome from './components/LogoHome'
import Login from './components/Login'
import Register from './components/Register'
import {useState} from 'react'

function App() {

  const [showLogo, setShowLogo] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleShowLogin = () => {
    setShowLogin(true)
    setShowLogo(false)
    setShowRegister(false)
  }

  const handleShowRegister = () => {
    setShowLogin(false)
    setShowLogo(false)
    setShowRegister(true)
  }

  return (
    <ChakraProvider theme={theme}>
       <Box textAlign="right" color={'black'} backgroundColor={'gold'} layerStyle="card" h="3rem" roundedBottom={["none", "none", "2xl"]} alignItems="center" p={1} >
        <MyButton text='Create a free account' background='seagreen' colorScheme='green' onClick={handleShowRegister}/>
        <MyButton text='Login' background='seagreen' colorScheme='green' onClick={handleShowLogin}/>
      </Box>
      <Box paddingTop={6}>
      {showLogo && <LogoHome/>}
      </Box>
        {showLogin && <Login/>}
        {showRegister && <Register/>}
    </ChakraProvider>
  );
}

export default App;
