import {
  Image,
  Box,
  Badge,
  SimpleGrid,
  FormControl,
  Select,
  Input,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movieService from '../services/MovieService';

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
      // Ovde bi hendlala neki error u koliko je potrebno cak i ako je dosao od 500 response-a
    }
  }

  async function handleFilterChange(event) {
    //event.preventDefault();
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
    //setTitleSearch(event);
    clearTimeout(filterTimeout);
    if (!event)
      return handleFilterChange(genreFilter);

    filterTimeout = setTimeout(() => {
      console.log('====>', event)
      setMovies(
        movies.filter(movie =>
          movie.title.toLowerCase().includes(event.toLowerCase())
        )
      );
    }, 1200);
  };

  useEffect(() => {
    moviesList();
    getGenres();
  }, []);

  return (
    <SimpleGrid>
      <FormControl marginLeft={'15px'} display="flex" flexDirection="row">
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
              m={3}
              maxW="xs"
              borderWidth="3px"
              borderRadius="lg"
              overflow="hidden"
              alignItems="center"
              display="table-column"
            >
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
            </Box>
          ))}
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default Movies;
