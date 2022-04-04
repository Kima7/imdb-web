import { useParams } from 'react-router-dom';
import {
  Flex,
  Image,
  Box,
  Badge,
  Button,
  Textarea,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import movieService from '../services/MovieService';
import {
  ThumbUp,
  ThumbDown,
  Comment,
  CommentsDisabled,
} from '@mui/icons-material';

const Movie = () => {
  let params = useParams();
  const [movie, setMovie] = useState();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

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

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <Flex
      p={4}
      width="full"
      align={'center'}
      justify={'center'}
      alignItems={'center'}
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
        </Box>
      )}
      {showComments && (
        <Box
          p={2}
          maxW="sm"
          borderWidth="3px"
          borderRadius="lg"
          overflow="hidden"
          alignItems="center"
        >
          <Flex
            paddingBottom={2}
            width="full"
            align={'row'}
            justify={'row'}
            alignItems={'row'}
          >
            <Input
              id="comment"
              type="text"
              value={comment}
              variant="flushed"
              placeholder="Write your comment here.."
              resize={'vertical'}
              onChange={event => setComment(event.currentTarget.value)}
            />
            <Button
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
          {movie &&
            movie.comments.length > 0 &&
            movie.comments.map(comment => (
              <Textarea
                id={comment.id}
                maxWidth={'250px'}
                size="sm"
                resize={'vertical'}
                placeholder="Write your comment here.."
                value={comment.message}
                readOnly
              />
            ))}
          {movie.comments.length === 0 && (
            <Text>No comments on this movie!</Text>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default Movie;
