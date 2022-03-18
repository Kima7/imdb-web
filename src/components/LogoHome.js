import { VStack, Grid } from '@chakra-ui/react';
import { Logo } from '../Logo';

const LogoHome = () => {
  return (
    <Grid minH="100vh" pt={'150px'}>
          <VStack spacing={15}>
            <Logo h="40vmin" pointerEvents="none" />
          </VStack>
        </Grid>
  )
}

export default LogoHome
