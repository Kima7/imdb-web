import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Select,
    Textarea
  } from '@chakra-ui/react';
  import { useState , useEffect} from 'react';
  import ErrorMessage from '../components/ErrorMessage';
  import { addMovie , getGenreTypes} from '../services/HttpServices';

const AddMovie = () => {

    const [title, setTitle] = useState('')
    const [description, setDescrription] = useState('')
    const [cover_image, setCover_image] = useState('')
    const [genre, setGenre] = useState('')
    const [allGenres, setAllGenres] = useState([])
    const [error, setError] = useState('');
    const notFill = title === '' || description === '' || cover_image === '' || genre === ''

    const postMovie = async() =>{
      
        setError('')
        const message = await addMovie({title:title,description:description,cover_image:cover_image,genre:genre})
          
        if (message)
            setError(message)
        else
        {
           alert('Movie created successfully!')
           setTitle('')
           setDescrription('')
           setCover_image('')
           setGenre('')
        }
    }

    const getGenres = async() =>{
        const data = await getGenreTypes();
        setAllGenres(data);
        console.log(allGenres)
    }

    useEffect(() => {
        getGenres();
      },[]);
    
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={10} maxWidth="500px" borderWidth={2} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Create movie</Heading>
        </Box>
        <Box my={4} textAlign="left">
        <form>
        {error !=='' && <ErrorMessage message={error}/>}
        <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input 
                type='text' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder='title'
            />
        </FormControl>
        <FormControl mt={4} isRequired>
            <FormLabel>Genre</FormLabel>
              <Select
                placeholder="select genre"
                value={genre}
                onChange={e => setGenre(e.target.value)}>
                {allGenres && allGenres.map( g => (
                <option key={g.id} value={g.type}>{g.type}</option>
                ))}
            </Select>
        </FormControl>
        <FormControl mt={4} isRequired>
            <FormLabel>Image URL</FormLabel>
              <Textarea
                type="text"
                value={cover_image} 
                placeholder='url to movie image'
                size='sm'
                resize="vertical"
                onChange={event => setCover_image(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                value={description} 
                placeholder='movie description'
                size='sm'
                resize="vertical"
                onChange={event => setDescrription(event.currentTarget.value)}
              />
            </FormControl>
            </form>
            <Button 
                disabled={notFill}
                onClick={postMovie}
                type="submit" 
                background='seagreen' 
                colorScheme='green' 
                variant="outline" 
                width="full" 
                mt={4}>
                Submit
            </Button>
        </Box>
      </Box>
    </Flex>
    )
}

export default AddMovie
