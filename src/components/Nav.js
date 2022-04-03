import {
  Flex,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import logo from '../IMDB.jpeg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';

const Nav = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  async function getUser() {
    try {
      const data = await authService.me();
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      alert('Successfuly logged out!');
      navigate('/');
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getUser();
  }, [localStorage.getItem('token')]);

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
      marginBottom={5}
    >
      {!user ? (
        <Flex display={user}>
          <Link to="/" width={77} height={29}>
            <Image src={logo} width={83} height={43} borderRadius="2xl" />
          </Link>
        </Flex>
      ) : (
        <Flex display={user}>
          <Link to="/movies" width={77} height={29}>
            <Image src={logo} width={83} height={43} borderRadius="2xl" />
          </Link>
        </Flex>
      )}
      {!user ? (
        <Flex>
          <Button
            size="md"
            background={'dimgray'}
            colorScheme={'gray'}
            variant="solid"
            rounded={['2xl']}
            fontFamily="mono"
            margin={0.5}
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            size="md"
            background={'dimgray'}
            colorScheme={'gray'}
            variant="solid"
            rounded={['2xl']}
            fontFamily="mono"
            margin={0.5}
          >
            <Link to="/register">Register</Link>
          </Button>
        </Flex>
      ) : (
        <Flex background={'dimgray'} fontFamily="mono" margin={1.5}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem icon={<AddIcon />} as={Link} to="/addMovie">
                Create movie
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
};

export default Nav;
