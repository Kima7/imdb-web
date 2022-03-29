import {
    Image,
    Box,
    Badge,
    SimpleGrid,
    FormControl,
    Select,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovies, getGenreTypes, filterMovies } from '../services/HttpServices';

const Movies = () => {

    const [movies, setMovies] = useState([]);
    //const [titleSearch, setTitleSearch] = useState();
    const [genreFilter, setGenreFilter] = useState('')
    const [allGenres, setAllGenres] = useState([])

    async function moviesList(){
        const data = await getMovies();
        setMovies(data.data);    
    }

    async function getGenres() {
        const data = await getGenreTypes();
        setAllGenres(data);
    }

    async function handleChange(event) {
        event.preventDefault();
        setGenreFilter(event.target.value);
        if (event.target.value === '')
        {
            moviesList();     
        }
        else
        {
            const data = await filterMovies({genre: event.target.value});
            setMovies(data.data);
        }
      }

    useEffect(() => {
        moviesList();
        getGenres();
      },[]);

  return (
      <SimpleGrid>
          <FormControl marginLeft={'15px'} width={'200px'} >
              <Select
                placeholder="select genre to filter"
                value={genreFilter}
                name="genreFilter" 
                onChange={handleChange}>
                {allGenres && allGenres.map( g => (
                <option key={g.id} value={g.type}>{g.type}</option>
                ))}
            </Select>
        </FormControl>
      <SimpleGrid columns={{sm: 2, md: 5}} textAlign='center' >
        {movies && movies.length > 0 && movies.map((movie) => (
            <Box key={movie.id} p='1' m={3} maxW='xs' borderWidth='3px' borderRadius='lg' overflow='hidden' alignItems='center' display='table-column' >
                <Image src={movie.cover_image} width={'250px'} height={'220px'} borderRadius='2xl' />
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
                        <Box display='flex' alignItems='left'>
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
    </SimpleGrid>
  )
}

export default Movies