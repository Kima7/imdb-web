import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import  {Button}  from '@chakra-ui/react';

const Nav = () => {

  return (
    <Box 
        textAlign="right" 
        color={'black'} 
        backgroundColor={'gold'} 
        layerStyle="card" 
        h="3rem" 
        roundedBottom={["none", "none", "2xl"]} 
        alignItems="center" 
        p={1} marginBottom={10} >
          <Button 
            size='md' 
            background='seagreen' 
            colorScheme='green' 
            variant='solid' 
            rounded={["2xl"]} 
            fontFamily="mono" 
            margin={0.5}>
              <Link to="/login">Login</Link>
          </Button>
          <Button 
            size='md' 
            background='seagreen' 
            colorScheme='green' 
            variant='solid' 
            rounded={["2xl"]} 
            fontFamily="mono" 
            margin={0.5}>
              <Link to="/register">Register</Link>
          </Button> 
      </Box>
  )
}

export default Nav
