import { Box, Flex } from '@chakra-ui/react';

type ContentWrapperProps = {
  children: React.ReactNode;
};

function ContentWrapper({ children }: ContentWrapperProps): JSX.Element {
  return (
    <Flex justifyContent="center">
      <Box
        boxSizing="border-box"
        maxWidth="1200px"
        width="100%"
        margin="0 auto"
      >
        {children}
      </Box>
    </Flex>
  );
}

export default ContentWrapper;
