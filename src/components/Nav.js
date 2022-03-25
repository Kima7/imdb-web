import { Flex , Button , Image} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../IMDB.jpeg';

const Nav = () => {

  return (
    <Flex 
      color={'black'}
      backgroundColor={'DarkSlateGrey'}
      layerStyle="card"
      h="3rem"
      roundedBottom={['none', 'none', '2xl']}
      alignItems="center"
      p={1}
      justifyContent="space-between"
      marginBottom={10}>
      <Flex>
          <Link to="/" width={77} height={29} >
            <Image src={logo} width={83} height={43} borderRadius='2xl' />
          </Link>
      </Flex>
      <Flex>
        <Button 
            size='md' 
            background={'dimgray'} 
            colorScheme={'gray' }
            variant='solid' 
            rounded={["2xl"]} 
            fontFamily="mono" 
            margin={0.5}>
              <Link to="/login">Login</Link>
        </Button>
        <Button 
            size='md' 
            background={'dimgray'} 
            colorScheme={'gray' } 
            variant='solid' 
            rounded={["2xl"]} 
            fontFamily="mono" 
            margin={0.5}>
              <Link to="/register">Register</Link>
        </Button> 
      </Flex>
    </Flex>
  )
}

export default Nav
