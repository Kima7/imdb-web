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
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  let filterTimeout;

  async function moviesList() {
    try {
      const { data } = await movieService.getMovies();
      setMovies(data);
    } catch (error) {
      console.log(error);
      // Ovde bi hendlala neki error u koliko je potrebno cak i ako je dosao od 500 response-a
    }
  }

  async function getGenres() {
    try {
      const { data } = await movieService.getGenreTypes();
      setAllGenres(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilterChange(event) {
    setGenreFilter(event);
    if (event === '') {
      moviesList();
    } else {
      try {
        const { data } = await movieService.filterMovies({ genre: event });
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSearchChange = event => {
    clearTimeout(filterTimeout);
    if (!event) return handleFilterChange(genreFilter);

    filterTimeout = setTimeout(() => {
      console.log('====>', event);
      setMovies(
        movies.filter(movie =>
          movie.title.toLowerCase().includes(event.toLowerCase())
        )
      );
    }, 1200);
  };

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

  useEffect(() => {
    moviesList();
    getGenres();
  }, []);

  return (
    <SimpleGrid>
      <FormControl
        marginLeft={'9px'}
        display="flex"
        flexDirection="row"
        marginTop={'-3.5'}
      >
        <Input
          type="text"
          placeholder="search by title.."
          onChange={event => handleSearchChange(event.target.value)}
          width={'200px'}
        />
        <Select
          width={'200px'}
          placeholder="select genre to filter"
          onChange={event => handleFilterChange(event.target.value)}
          marginLeft={'15px'}
        >
          {allGenres &&
            allGenres.map(g => (
              <option key={g.id} value={g.type}>
                {g.type}
              </option>
            ))}
        </Select>
      </FormControl>
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
              <Flex fontSize="xs" justifyContent={'right'}>
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
          ))}
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default Movies;
