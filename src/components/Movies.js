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
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movieService from '../services/MovieService';
import { ThumbUp, ThumbDown, BookmarkAdd } from '@mui/icons-material';
import debounce from 'lodash.debounce';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');

  async function moviesList(url) {
    try {
      const data = await movieService.getMovies({ url: url });
      setMovies(data.data);
      if (data.links.next) {
        let path = data.links.next.split('?');
        setNextPage('?' + path[1]);
      } else {
        setNextPage('');
      }

      if (data.links.prev) {
        let path = data.links.prev.split('?');
        setPrevPage('?' + path[1]);
      } else {
        setPrevPage('');
      }
    } catch (error) {
      console.log(error);
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
      moviesList('?page=1');
    } else {
      try {
        const { data } = await movieService.filterMovies({ genre: event });
        setMovies(data);
        if (data.links?.next) {
          let path = data.links.next.split('?');
          setNextPage('?' + path[1]);
        } else {
          setNextPage('');
        }

        if (data.links?.prev) {
          let path = data.links.prev.split('?');
          setPrevPage('?' + path[1]);
        } else {
          setPrevPage('');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const debouncedHandleSearchChange = debounce(async value => {
    const { data } = await movieService.movieSearch({
      searchValue: value,
      genre: genreFilter,
    });
    setMovies(data);
    if (data.links?.next) {
      let path = data.links.next.split('?');
      setNextPage('?' + path[1]);
    } else {
      setNextPage('');
    }

    if (data.links?.prev) {
      let path = data.links.prev.split('?');
      setPrevPage('?' + path[1]);
    } else {
      setPrevPage('');
    }
  }, 750);

  const handleSearchChange = value => {
    debouncedHandleSearchChange(value);
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
    }
  }

  async function addToWatchList(movieId) {
    try {
      await movieService.addToWatchList({
        movie_id: movieId,
      });
      moviesList();
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
      moviesList();
      alert('Removed from watchlist!');
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    moviesList('?page=1');
    getGenres();
  }, []);

  return (
    <SimpleGrid>
      <FormControl
        marginLeft={4}
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
      <SimpleGrid columns={{ sm: 2, md: 5 }} textAlign="center" ml={3}>
        {movies &&
          movies.length > 0 &&
          movies.map(movie => (
            <Box
              key={movie.id}
              p={1}
              m={1}
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
                paddingLeft={8}
                src={movie.cover_image}
                width={'230px'}
                height={'170px'}
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
                marginTop={2.5}
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
                    <Badge
                      borderRadius="full"
                      p={1}
                      marginLeft={-2}
                      colorScheme="yellow"
                      fontSize="xs"
                    >
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
                  <Button
                    marginRight={-2}
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
      <SimpleGrid>
        <Flex justifyContent={'center'} marginTop={1.5} marginLeft={1}>
          <Button
            onClick={() => moviesList(prevPage)}
            disabled={prevPage == '' ? true : false}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            onClick={() => moviesList(nextPage)}
            disabled={nextPage == '' ? true : false}
          >
            <ArrowForwardIcon />
          </Button>
        </Flex>
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default Movies;
