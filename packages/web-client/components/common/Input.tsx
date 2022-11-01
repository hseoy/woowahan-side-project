import { Input as ChakraInput, InputProps } from '@chakra-ui/react';
import React from 'react';

function Input(props: InputProps) {
  return <ChakraInput {...props} />;
}

export default React.forwardRef(Input);
