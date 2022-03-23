
import { Flex, Button , Image, Box, Badge,SimpleGrid} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovies } from '../services/HttpServices';

const Movies = () => {

    const [movies, setMovies] = useState([]);

    const moviesList = async() =>{
        const data = await getMovies();
        setMovies(data.data);     
    }

    useEffect(() => {
        moviesList();
      },[]);

  return (
      <SimpleGrid columns={{ sm: 2, md: 5 }}  textAlign='center' >
        {movies && movies.length > 0 && movies.map((movie) => (
            <Box key={movie.id} p='1' m={3} maxW='xs' borderWidth='3px' borderRadius='lg' overflow='hidden' alignItems='center' display='table-column' >
                <Image src={movie.cover_image} width={'299px'} height={'220px'} borderRadius='2xl' />
                <Box p='1' >                   
                        <Box
                            mt='1'
                            fontWeight='semibold'
                            fontSize='md'                          
                            lineHeight='tight'
                            isTruncated
                            display='flex' alignItems='center'
                            >
                            <Link  to={`/movie/${movie.id}`} key={movie.id}>
                                {movie.title}
                            </Link>
                            
                        </Box>
                        <Box Box display='flex' alignItems='left'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            {movie.genre}
                        </Badge>
                        </Box>
                    </Box>
                    <Box
                        
                        fontSize='xs'
                        as='h4'
                        lineHeight='tight'
                        isTruncated
                    >
                        {movie.description}
                    </Box>
                </Box>
        ))}
    </SimpleGrid>
  )
}

export default Movies