import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Route, Routes } from 'react-router-dom';
import LogoHome from './components/LogoHome';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';
import Movies from './components/Movies';
import Movie from './components/Movie';
import AddMovie from './components/AddMovie';
import { Outlet, Navigate } from 'react-router-dom';

function App() {
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };

  const AuthenticatedRoute = () => {
    // determine if authorized, from context or however you're doing it
    const auth = localStorage.getItem('token') !== null;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <ChakraProvider theme={extendTheme({ config })}>
      <Nav />
      <Routes>
        <Route exact path="/" element={<LogoHome />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="movies" element={<AuthenticatedRoute />}>
          <Route exact path="" element={<Movies />} />
        </Route>
        <Route exact path="movie/:id" element={<AuthenticatedRoute />}>
          <Route exact path="" element={<Movie />} />
        </Route>
        <Route exact path="addMovie" element={<AuthenticatedRoute />}>
          <Route exact path="" element={<AddMovie />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
