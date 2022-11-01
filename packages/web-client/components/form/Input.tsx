import {
  Input as ChakraInput,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React, { ForwardedRef } from 'react';

function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { maxLength, value } = props;
  return (
    <InputGroup>
      <ChakraInput {...props} ref={ref} paddingRight="80px" />
      {maxLength && (
        <InputRightElement width="auto" paddingRight="2.5px">
          <Text fontSize="14px" color="gray.500">{`${
            value?.toString().length || 0
          }/${maxLength}`}</Text>
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
