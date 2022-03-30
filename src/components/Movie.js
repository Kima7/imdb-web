import { useParams } from 'react-router-dom';
import { Flex, Image, Box, Badge } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import movieService from '../services/MovieService';

const Movie = () => {
  let params = useParams();
  const [movie, setMovie] = useState();

  const getMovie = async () => {
    try {
      const id = params.id;
      const { data } = await movieService.getMovie({ id });
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <Flex
      p={4}
      width="full"
      align="center"
      justify="center"
      alignItems="center"
    >
      {movie && (
        <Box
          key={movie.id}
          p="2"
          maxW="sm"
          borderWidth="3px"
          borderRadius="lg"
          overflow="hidden"
          alignItems="center"
        >
          <Image
            src={movie.cover_image}
            width={'390px'}
            height={'350px'}
            borderRadius="2xl"
          />
          <Box p="1">
            <Box
              mt="1"
              fontWeight="bold"
              fontSize="3xl"
              lineHeight="tight"
              display="flex"
              alignItems="center"
            >
              {movie.title}
            </Box>
            <Box display="flex" alignItems="left">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {movie.genre}
              </Badge>
            </Box>
          </Box>
          <Box fontSize="s" lineHeight="tight">
            {movie.description}
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Movie;
