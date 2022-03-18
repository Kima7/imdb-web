
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import {
  Route,
  Routes
} from "react-router-dom";
import LogoHome from './components/LogoHome'
import Login from './components/Login'
import Register from './components/Register'
import Nav from './components/Nav';

function App() {

  return (
    <ChakraProvider theme={theme}>
        <Nav/>
        <Routes>
          <Route path="/" element={<LogoHome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
    </ChakraProvider>
  );
}

export default App;
