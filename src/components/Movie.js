import { useParams , Link } from "react-router-dom"
import { Flex, Button , Image, Box, Badge} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getMovie } from '../services/HttpServices';

const Movie = () => {

    let params = useParams();
    const [movie, setMovie] = useState();

    const movieObject = async() =>{
        const id = params.id;
        const data = await getMovie({id});
        setMovie(data);
    }

    useEffect(() => {
        movieObject();
      },[]);

  return (
    <Flex p={4} width="full" align="center" justify="center" alignItems="center">
        {movie &&
            <Box key={movie.id} p='2' m={4} maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden' alignItems='center' display='table-column' >
                <Image src={movie.cover_image} width={'399px'} height={'400px'} borderRadius='2xl' />
                <Box p='2' >                   
                        <Box
                            mt='1'
                            fontWeight='bold'
                            fontSize='2xl'                   
                            lineHeight='tight'                            
                            display='flex' alignItems='center'
                            >
                                {movie.title}
                            
                        </Box>
                        <Box Box display='flex' alignItems='left'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            {movie.genre}
                        </Badge>
                        </Box>
                    </Box>
                    <Box
                        
                        fontSize='s'
                        as='h4'
                        lineHeight='tight'
                        
                    >
                        {movie.description}
                    </Box>
                </Box>
}
    </Flex>
  )
}

export default Movie
