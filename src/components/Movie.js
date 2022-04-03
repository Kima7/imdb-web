import { useParams } from 'react-router-dom';
import { Flex, Image, Box, Badge, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import movieService from '../services/MovieService';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

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

  async function handleDislike(movieId) {
    try {
      await movieService.storeLike({
        movie_id: movieId,
        like: false,
      });
      getMovie();
    } catch (error) {
      console.log(error);
      //alert(error);
    }
  }

  async function handleLike(movieId) {
    try {
      await movieService.storeLike({
        movie_id: movieId,
        like: true,
      });
      getMovie();
    } catch (error) {
      console.log(error);
    }
  }

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
          <Box
            display="flex"
            alignItems="center"
            p={1}
            justifyContent="space-around"
          >
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {movie.like_count} likes
            </Badge>
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {movie.dislike_count} dislikes
            </Badge>
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {movie.visited_count} visited
            </Badge>
          </Box>
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
              <Badge borderRadius="full" px="4" colorScheme="teal">
                {movie.genre}
              </Badge>
            </Box>
          </Box>
          <Box fontSize="s" lineHeight="tight">
            {movie.description}
          </Box>
          <Flex p={1} justifyContent="right">
            <Button
              color={movie.action === 1 ? 'firebrick' : 'silver'}
              disabled={movie.action === 1 ? true : false}
              size="xs"
              background={'transparent'}
              variant="solid"
              rounded={['2xl']}
              margin={0.5}
              onClick={() => handleLike(movie.id)}
            >
              <ThumbUp />
            </Button>
            <Button
              color={movie.action === 0 ? 'firebrick' : 'silver'}
              disabled={movie.action === 0 ? true : false}
              size="xs"
              background={'transparent'}
              variant="solid"
              rounded={['2xl']}
              margin={0.5}
              onClick={() => handleDislike(movie.id)}
            >
              <ThumbDown />
            </Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Movie;
