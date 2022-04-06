import { useParams } from 'react-router-dom';
import {
  Flex,
  Image,
  Box,
  Badge,
  Button,
  Input,
  Text,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/MovieService';
import {
  ThumbUp,
  ThumbDown,
  Comment,
  CommentsDisabled,
  MovieCreation,
  BookmarkAdd,
} from '@mui/icons-material';

const Movie = () => {
  let params = useParams();
  const [movie, setMovie] = useState();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [showRelatedMovies, setShowRelatedMovies] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [showMore, setShowMore] = useState(false);

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

  async function postComment(movieId) {
    try {
      await movieService.storeComment({
        movie_id: movieId,
        message: comment,
      });
      getMovie();
      setComment('');
    } catch (error) {
      alert(error);
    }
  }

  async function getRelatedMovies() {
    try {
      const movie_id = params.id;
      const { data } = await movieService.relatedMovies({ movie_id });
      setRelatedMovies(data);
    } catch (error) {
      alert(error);
    }
  }

  async function addToWatchList(movieId, watched) {
    try {
      if (watched !== true)
        await movieService.addToWatchList({
          movie_id: movieId,
        });
      else
        await movieService.addToWatchList({
          movie_id: movieId,
          watched: true,
        });
      getMovie();
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
      getMovie();
      alert('Removed from watchlist!');
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getMovie();
    getRelatedMovies();
  }, [params.id]);

  return (
    <Flex
      p={4}
      width="full"
      align={'center'}
      justify={'center'}
      alignItems={'center'}
    >
      {showRelatedMovies && (
        <Box
          m={4}
          p={2}
          maxW="sm"
          borderWidth="3px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Flex
            paddingBottom={2}
            width="full"
            align={'row'}
            justify={'row'}
            alignItems={'row'}
          >
            <Heading fontSize={'lg'} paddingLeft={2}>
              Related movies
            </Heading>
          </Flex>
          {relatedMovies &&
            relatedMovies.length > 0 &&
            relatedMovies.map(relatedMovie => (
              <Box
                key={relatedMovie.id}
                p={2}
                maxW="sm"
                borderWidth="3px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Link to={`/movie/${relatedMovie.id}`} key={relatedMovie.id}>
                  {relatedMovie.title}
                </Link>
              </Box>
            ))}
          {relatedMovies.length === 0 && <Text>No related movies yet!</Text>}
        </Box>
      )}
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
          <Box display="flex" p={1} justifyContent="left">
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
            {movie.watched == true ? (
              <Badge
                borderRadius="full"
                p={1}
                marginLeft={-2}
                colorScheme="yellow"
                fontSize="xs"
              >
                watched
              </Badge>
            ) : (
              <Button
                p={4}
                color={'silver'}
                size="sm"
                variant="solid"
                rounded={['2xl']}
                margin={0.5}
                onClick={() => addToWatchList(movie.id, true)}
              >
                did you watched it?
              </Button>
            )}
          </Box>
          <Box display="flex" p={1} justifyContent="space-around">
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
            width={'550px'}
            height={'340px'}
            borderRadius="2xl"
          />
          <Box p="1">
            <Box
              mt="1"
              fontWeight="bold"
              fontSize="2xl"
              lineHeight="tight"
              display="flex"
              alignItems="center"
            >
              {movie.title}
            </Box>
            <Box display="flex" alignItems="left" paddingTop={'2'}>
              <Badge borderRadius="full" px="4" colorScheme="teal">
                {movie.genre}
              </Badge>
            </Box>
          </Box>
          <Box fontSize="s" lineHeight="tight">
            {movie.description}
          </Box>
          <Flex p={1} justifyContent="space-between" marginTop={5}>
            <Flex>
              <Button
                color={'silver'}
                size="xs"
                background={'transparent'}
                variant="solid"
                rounded={['2xl']}
                margin={0.5}
                onClick={() => setShowRelatedMovies(!showRelatedMovies)}
              >
                <MovieCreation /> related movies
              </Button>
            </Flex>
            <Flex>
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
              <Button
                color={'silver'}
                size="xs"
                background={'transparent'}
                variant="solid"
                rounded={['2xl']}
                margin={0.5}
                onClick={() => setShowComments(!showComments)}
              >
                {!showComments ? <Comment /> : <CommentsDisabled />}
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
      {showComments && (
        <Box
          m={4}
          p={2}
          maxW="sm"
          borderWidth="3px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Flex
            paddingBottom={2}
            width="full"
            align={'row'}
            justify={'row'}
            alignItems={'row'}
          >
            <Input
              mb={3}
              mr={4}
              id="comment"
              type="text"
              value={comment}
              variant="flushed"
              placeholder="Write your comment here.."
              resize={'vertical'}
              onChange={event => setComment(event.currentTarget.value)}
            />
            <Button
              p={4}
              color={'silver'}
              size="sm"
              variant="solid"
              rounded={['2xl']}
              margin={0.5}
              disabled={comment !== '' ? false : true}
              onClick={() => postComment(movie.id)}
            >
              {' '}
              Post{' '}
            </Button>
          </Flex>
          {showMore &&
            movie &&
            movie.comments.length > 0 &&
            movie.comments.map(comment => (
              <div key={comment.id}>
                <Text pt={2}>{comment.message}</Text>
                <Divider />
              </div>
            ))}
          {!showMore &&
            movie &&
            movie.comments.length > 0 &&
            movie.comments.slice(0, 4).map(comment => (
              <div key={comment.id}>
                <Text pt={2}>{comment.message}</Text>
                <Divider />
              </div>
            ))}
          <Flex justify={'center'}>
            <Button
              p={4}
              color={'silver'}
              size="xs"
              variant="solid"
              //rounded={['2xl']}
              margin={0.5}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? <ChevronUpIcon/> :  <ChevronDownIcon/>}
            </Button>
          </Flex>
          {movie.comments.length === 0 && (
            <Text>No comments on this movie!</Text>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default Movie;
