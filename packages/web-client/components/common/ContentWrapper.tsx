import { Box, Flex } from '@chakra-ui/react';

type ContentWrapperProps = {
  children: React.ReactNode;
};

function ContentWrapper({ children }: ContentWrapperProps): JSX.Element {
  return (
    <Flex justifyContent="center" height="100%">
      <Box
        boxSizing="border-box"
        maxWidth="1200px"
        width="100%"
        margin="0 auto"
        padding="25px 0"
      >
        {children}
      </Box>
    </Flex>
  );
}

export default ContentWrapper;
