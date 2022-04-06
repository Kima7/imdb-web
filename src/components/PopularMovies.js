import { Flex, Box, Heading, OrderedList, ListItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/MovieService';

const PopularMovies = () => {
  const [movies, setMovies] = useState();

  const getMovies = async () => {
    try {
      const { data } = await movieService.popularMovies();
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        marginTop={'20px'}
        p={6}
        maxWidth="500px"
        borderWidth={2}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Top rated movies</Heading>
        </Box>
        <OrderedList>
          {movies &&
            movies.length > 0 &&
            movies.map(movie => (
              <ListItem>
                <Box
                  my={3}
                  textAlign="left"
                  key={movie.id}
                  p={1}
                  maxW="sm"
                  borderWidth="3px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </Box>
              </ListItem>
            ))}
        </OrderedList>
      </Box>
    </Flex>
  );
};

export default PopularMovies;
