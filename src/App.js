import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Route, Routes } from 'react-router-dom';
import LogoHome from './components/LogoHome';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';
import Movies from './components/Movies';
import Movie from './components/Movie';
import AddMovie from './components/AddMovie';
import WatchList from './components/WatchList';
import { Outlet, Navigate } from 'react-router-dom';
import PopularMovies from './components/PopularMovies';

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
        <Route path="/" element={<LogoHome />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="movies" element={<AuthenticatedRoute />}>
          <Route path="" element={<Movies />} />
        </Route>
        <Route path="movie/:id" element={<AuthenticatedRoute />}>
          <Route path="" element={<Movie />} />
        </Route>
        <Route path="addMovie" element={<AuthenticatedRoute />}>
          <Route path="" element={<AddMovie />} />
        </Route>
        <Route path="watchlist" element={<AuthenticatedRoute />}>
          <Route path="" element={<WatchList />} />
        </Route>
        <Route path="topRated" element={<AuthenticatedRoute />}>
          <Route path="" element={<PopularMovies />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
