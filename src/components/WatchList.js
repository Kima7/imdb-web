
import {
    Image,
    Box,
    Badge,
    SimpleGrid,
    FormControl,
    Select,
    Input,
    Button,
    Flex,
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import movieService from '../services/MovieService';
  import { ThumbUp, ThumbDown, BookmarkAdd } from '@mui/icons-material';
  
  const WatchList = () => {
    const [movies, setMovies] = useState([]);
  
    async function moviesWatchList() {
      try {
        const { data } = await movieService.getWatchList();
        setMovies(data);
      } catch (error) {
        console.log(error);
        // Ovde bi hendlala neki error u koliko je potrebno cak i ako je dosao od 500 response-a
      }
    }
  
    async function handleDislike(movieId) {
      try {
        const { data } = await movieService.storeLike({
          movie_id: movieId,
          like: false,
        });
        setMovies(data);
      } catch (error) {
        console.log(error);
        //alert(error);
      }
    }
  
    async function handleLike(movieId) {
      try {
        const { data } = await movieService.storeLike({
          movie_id: movieId,
          like: true,
        });
        setMovies(data);
      } catch (error) {
        console.log(error);
        //alert(error);
      }
    }
  
    async function addToWatchList(movieId) {
      try {
        await movieService.addToWatchList({
          movie_id: movieId,
        });
        moviesWatchList();
        alert('Added to watchlist!');
      } catch (error) {
        alert(error);
      }
    }
  
    async function removeFromWatchList(movieId) {
      try {
        await movieService.removeFromWatchList({
          movie_id: movieId,
        });
        moviesWatchList();
        alert('Removed from watchlist!');
      } catch (error) {
        alert(error);
      }
    }
  
    useEffect(() => {
      moviesWatchList();
    }, []);
  
    return (
        <SimpleGrid columns={{ sm: 2, md: 5 }} textAlign="center">
          {movies &&
            movies.length > 0 &&
            movies.map(movie => (
              <Box
                key={movie.id}
                p="1"
                m={2}
                maxW="xs"
                borderWidth="3px"
                borderRadius="lg"
                overflow="hidden"
                alignItems="center"
                display="table-column"
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
                  width={'250px'}
                  height={'220px'}
                  borderRadius="2xl"
                />
                <Box p="1">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    fontSize="md"
                    lineHeight="tight"
                    isTruncated
                    display="flex"
                    alignItems="center"
                  >
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                      {movie.title}
                    </Link>
                  </Box>
                  <Box display="flex" alignItems="left">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      {movie.genre}
                    </Badge>
                  </Box>
                </Box>
                <Box fontSize="xs" as="h4" lineHeight="tight" isTruncated>
                  {movie.description}
                </Box>
                <Flex
                  p={1}
                  fontSize="xs"
                  justifyContent={'space-between'}
                  marginTop={4}
                >
                  <Flex marginLeft={-3}>
                    <Button
                      color={movie.watched !== null ? 'yellow' : 'silver'}
                      size="xs"
                      background={'transparent'}
                      colorScheme={'transparent'}
                      variant="solid"
                      rounded={['2xl']}
                      margin={0.5}
                      onClick={() =>
                        movie.watched === null
                          ? addToWatchList(movie.id)
                          : removeFromWatchList(movie.id)
                      }
                    >
                      <BookmarkAdd />
                    </Button>
                    {movie.watched == true && (
                      <Badge  borderRadius="full" p={1} marginLeft={-2} colorScheme="yellow" fontSize="xs">
                        watched
                      </Badge>
                    )}
                  </Flex>
                  <Flex marginRight={-3}>
                    <Button
                      color={movie.action === 1 ? 'firebrick' : 'silver'}
                      disabled={movie.action === 1 ? true : false}
                      size="xs"
                      background={'transparent'}
                      colorScheme={'transparent'}
                      variant="solid"
                      rounded={['2xl']}
                      marginRight={-3}
                      onClick={() => handleLike(movie.id)}
                    >
                      <ThumbUp />
                    </Button>
                    <Button marginRight={-2}
                      color={movie.action === 0 ? 'firebrick' : 'silver'}
                      disabled={movie.action === 0 ? true : false}
                      size="xs"
                      background={'transparent'}
                      colorScheme={'transparent'}
                      variant="solid"
                      rounded={['2xl']}
                      margin={0.5}
                      onClick={() => handleDislike(movie.id)}
                    >
                      <ThumbDown />
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
        </SimpleGrid>
    );
  };
  
  export default WatchList;
  
