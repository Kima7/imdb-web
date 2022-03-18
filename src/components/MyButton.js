import  {Button}  from '@chakra-ui/react';

const MyButton = ({ text , background ,  colorScheme , onClick, onSubmit}) => {

  return (
    <Button 
      size='md' 
      background={background} 
      colorScheme={colorScheme} 
      variant='solid' 
      rounded={["2xl"]} 
      fontFamily="mono" 
      margin={0.5} 
      onClick={onClick} 
      onSubmit={onSubmit} >
     {text}
    </Button>  
  )
}

export default MyButton

