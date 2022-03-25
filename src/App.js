
import {
  ChakraProvider,
  extendTheme
} from '@chakra-ui/react';

import {
  Route,
  Routes
} from "react-router-dom";
import LogoHome from './components/LogoHome'
import Login from './components/Login'
import Register from './components/Register'
import Nav from './components/Nav';
import Movies from './components/Movies';
import Movie from './components/Movie';
import AddMovie from './components/AddMovie';

function App() {

  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }

  return (
    <ChakraProvider theme= {extendTheme({ config })} >
        <Nav/>
        <Routes>
          <Route path="/" element={<LogoHome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="addMovie" element={<AddMovie />}/>
        </Routes>
    </ChakraProvider>
  );
}

export default App;
