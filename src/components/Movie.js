import { useParams, Link } from 'react-router-dom';
import { Flex, Button, Image, Box, Badge } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getMovie } from '../services/HttpServices';

const Movie = () => {
  let params = useParams();
  const [movie, setMovie] = useState();

  const movieObject = async () => {
    const id = params.id;
    const data = await getMovie({ id });
    setMovie(data);
  };

  useEffect(() => {
    movieObject();
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
